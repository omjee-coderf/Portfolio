import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Node & Synapse Configuration
    const NODE_COUNT = 110;
    const CONNECT_DISTANCE = 14;
    const BOUNDS = 36;

    // Node Positions & Velocities
    const nodePositions: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];
    const posArray = new Float32Array(NODE_COUNT * 3);
    const colorArray = new Float32Array(NODE_COUNT * 3);

    const primaryColor = new THREE.Color(0x38bdf8); // Sky blue
    const secondaryColor = new THREE.Color(0x818cf8); // Indigo
    const accentColor = new THREE.Color(0x34d399); // Emerald

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 2.2,
        (Math.random() - 0.5) * BOUNDS * 1.6,
        (Math.random() - 0.5) * BOUNDS * 1.4
      );
      nodePositions.push(pos);
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.045,
          (Math.random() - 0.5) * 0.045,
          (Math.random() - 0.5) * 0.03
        )
      );

      posArray[i * 3] = pos.x;
      posArray[i * 3 + 1] = pos.y;
      posArray[i * 3 + 2] = pos.z;

      // Color variation across nodes
      const rand = Math.random();
      const nodeColor = rand > 0.6 ? secondaryColor : rand > 0.3 ? primaryColor : accentColor;
      colorArray[i * 3] = nodeColor.r;
      colorArray[i * 3 + 1] = nodeColor.g;
      colorArray[i * 3 + 2] = nodeColor.b;
    }

    // Node Point Cloud Geometry
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Custom Canvas Texture for soft glowing neural nodes
    const createNodeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(125, 211, 252, 0.9)');
        gradient.addColorStop(0.6, 'rgba(56, 189, 248, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const pointsMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: createNodeTexture(),
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // Synaptic Lines Geometry
    const maxLineSegments = NODE_COUNT * 8;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Neural Synaptic Signal Pulses (particles traveling on synapses)
    const PULSE_COUNT = 16;
    const pulseArray = new Float32Array(PULSE_COUNT * 3);
    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulseArray, 3));
    const pulseMaterial = new THREE.PointsMaterial({
      size: 2.4,
      color: 0x67e8f9,
      map: createNodeTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    scene.add(pulsePoints);

    interface Pulse {
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
    }
    const pulses: Pulse[] = [];
    for (let p = 0; p < PULSE_COUNT; p++) {
      pulses.push({
        startNode: Math.floor(Math.random() * NODE_COUNT),
        endNode: Math.floor(Math.random() * NODE_COUNT),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    // Mouse Tracking & Smooth Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.y += (scroll.targetY - scroll.y) * 0.08;

      camera.position.x = mouse.x * 6;
      camera.position.y = mouse.y * 5 - scroll.y * 0.015;
      camera.lookAt(0, -scroll.y * 0.015, 0);

      // Rotate root constellation gently
      pointCloud.rotation.y = time * 0.03;
      lineSegments.rotation.y = time * 0.03;
      pulsePoints.rotation.y = time * 0.03;

      // Update Node Positions
      const positions = pointsGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const pos = nodePositions[i];
        const vel = nodeVelocities[i];

        pos.add(vel);

        // Boundary bounce
        if (Math.abs(pos.x) > BOUNDS * 1.1) vel.x *= -1;
        if (Math.abs(pos.y) > BOUNDS * 0.8) vel.y *= -1;
        if (Math.abs(pos.z) > BOUNDS * 0.7) vel.z *= -1;

        // Subtle organic float
        pos.y += Math.sin(time * 0.8 + i) * 0.01;

        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      // Dynamic Synaptic Interconnectivity
      let lineIndex = 0;
      let colorIndex = 0;
      const validConnections: { from: number; to: number }[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < CONNECT_DISTANCE && lineIndex < maxLineSegments * 6 - 6) {
            validConnections.push({ from: i, to: j });

            const alpha = 1.0 - dist / CONNECT_DISTANCE;
            const p1 = nodePositions[i];
            const p2 = nodePositions[j];

            linePositions[lineIndex++] = p1.x;
            linePositions[lineIndex++] = p1.y;
            linePositions[lineIndex++] = p1.z;

            linePositions[lineIndex++] = p2.x;
            linePositions[lineIndex++] = p2.y;
            linePositions[lineIndex++] = p2.z;

            // Gradient line colors
            const cVal = 0.22 * alpha;
            lineColors[colorIndex++] = 0.2 * cVal;
            lineColors[colorIndex++] = 0.7 * cVal;
            lineColors[colorIndex++] = 1.0 * cVal;

            lineColors[colorIndex++] = 0.5 * cVal;
            lineColors[colorIndex++] = 0.4 * cVal;
            lineColors[colorIndex++] = 0.9 * cVal;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Update Synaptic Pulses
      const pulsePos = pulseGeometry.attributes.position.array as Float32Array;
      for (let p = 0; p < PULSE_COUNT; p++) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1.0) {
          pulse.progress = 0;
          if (validConnections.length > 0) {
            const randomConn =
              validConnections[Math.floor(Math.random() * validConnections.length)];
            pulse.startNode = randomConn.from;
            pulse.endNode = randomConn.to;
          } else {
            pulse.startNode = Math.floor(Math.random() * NODE_COUNT);
            pulse.endNode = Math.floor(Math.random() * NODE_COUNT);
          }
        }

        const p1 = nodePositions[pulse.startNode];
        const p2 = nodePositions[pulse.endNode];
        if (p1 && p2) {
          pulsePos[p * 3] = p1.x + (p2.x - p1.x) * pulse.progress;
          pulsePos[p * 3 + 1] = p1.y + (p2.y - p1.y) * pulse.progress;
          pulsePos[p * 3 + 2] = p1.z + (p2.z - p1.z) * pulse.progress;
        }
      }
      pulseGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="neural-3d-backdrop"
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
