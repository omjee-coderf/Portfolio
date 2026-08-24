import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Multi-Turn Chat API with Gemini
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [], model = 'gemini-3.5-flash', roleMode = 'default' } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'A message string is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Return a helpful simulated response if API key is not yet set in environment
        return res.json({
          reply: `**Om Jee's Portfolio Assistant (Offline Preview):**\n\nThank you for reaching out! Om Jee is a 2nd-year B.Tech CSE student at GLA University, Mathura, specializing in **FastAPI, Python, C, Pandas, and NumPy**, with key projects including **SIMPulse** and **Background Remover** (Vision AI), plus an official **Microsoft Azure AZ-900** certification.\n\n*(Note: To enable live Gemini AI reasoning, please configure your GEMINI_API_KEY in the Secrets panel.)*`,
          model: 'offline-preview',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Tailored system prompt based on role persona
      let personaInstruction = `You are the intelligent AI Copilot and representative for Om Jee's interactive 3D portfolio.
Om Jee is a Sophomore (2nd Year) B.Tech Computer Science student at GLA University, Mathura, India.
Key Profile Highlights:
- Core Skills: FastAPI, Python, C, Pandas, NumPy, Machine Learning, Computer Vision, High-Throughput Backend Systems, REST APIs.
- Selected Projects:
  1. SIMPulse: An IoT & ML stream processing application with real-time monitoring and analytics.
  2. Background Remover: A Computer Vision AI tool for precision foreground extraction and automated background elimination.
- Credentials: Microsoft Certified: Azure Fundamentals (AZ-900).
- Problem Solving: LeetCode (6+ problems solved) and active GitHub (3 public repositories).
- Location: Mathura, Uttar Pradesh, India (IST / UTC+5:30).
- Contact: om598648@gmail.com
- Seeking: Software engineering internships, ML research projects, and backend developer opportunities.`;

      if (roleMode === 'recruiter') {
        personaInstruction += `\nMode: Recruiter Evaluation. Focus on candidate value proposition, engineering discipline, readiness for internships, problem-solving mindset, and ability to deliver production Python/ML pipelines.`;
      } else if (roleMode === 'code_interviewer') {
        personaInstruction += `\nMode: Technical Interviewer / Deep-Dive. Explain technical architectural decisions, algorithmic complexity, Python optimization, and how Om Jee structures FastAPI and machine learning workflows.`;
      }

      // Valid model fallback
      const validModel =
        model === 'gemini-3.1-pro-preview'
          ? 'gemini-3.1-pro-preview'
          : model === 'gemini-3.1-flash-lite'
          ? 'gemini-3.1-flash-lite'
          : 'gemini-3.5-flash';

      // Format conversation contents
      const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Add previous chat history
      if (Array.isArray(history)) {
        for (const item of history) {
          if (item && item.content) {
            formattedContents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.content }],
            });
          }
        }
      }

      // Add the current user prompt
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: validModel,
        contents: formattedContents as any,
        config: {
          systemInstruction: personaInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'I apologize, but I could not generate a response at this moment.';

      res.json({
        reply: replyText,
        model: validModel,
      });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({
        error: 'Failed to generate response from Gemini API',
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
