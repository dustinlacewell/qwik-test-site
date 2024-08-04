/** @jsxImportSource react */
import { Canvas } from "qwik-react-lib";
import { useCallback, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
}

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const createParticle = useCallback(
    (centerX: number, centerY: number, radius: number): Particle => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
      const y = centerY + radius * Math.sin(phi) * Math.sin(theta);
      const speed = 1.5;
      return {
        x,
        y,
        vx: Math.random() * speed - speed / 2,
        vy: Math.random() * speed - speed / 2,
        radius: Math.random() * 5 + 0.1,
        life: 1,
      };
    },
    [],
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      frameCount: number,
    ) => {
      const width = Math.ceil(canvas.width / window.devicePixelRatio);
      const height = Math.ceil(canvas.height / window.devicePixelRatio);
      const centerX = width / 2;
      const centerY = height / 2;

      // Set back to orange for particles
      ctx.fillStyle = "rgba(255, 165, 0, 1)";

      // Update and draw existing particles
      particlesRef.current = particlesRef.current
        .map((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.008;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0, p.radius * p.life), 0, Math.PI * 2);
          ctx.fill();
          return p;
        })
        .filter((p) => p.life > 0);

      // Create new particles
      const spawnRadius = width / 8;
      const newParticlesCount = 5;
      for (let i = 0; i < newParticlesCount; i++) {
        particlesRef.current.push(
          createParticle(centerX, centerY, spawnRadius),
        );
      }
    },
    [createParticle],
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas containerRef={containerRef} draw={draw} />
    </div>
  );
};
