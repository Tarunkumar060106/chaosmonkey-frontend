"use client";
import React, { useEffect, useRef } from "react";

const ChaosBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const gridRows = 20;
    const points: { x: number; y: number; offset: number; speed: number }[] =
      [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      points.length = 0;
      for (let i = 0; i < gridRows; i++) {
        points.push({
          x: 0,
          y: (canvas.height / gridRows) * i,
          offset: Math.random() * 1000,
          speed: 0.001 + Math.random() * 0.002,
        });
      }
    };

    const draw = (time: number) => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;

      points.forEach((p, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, p.y);

        const segmentWidth = canvas.width / 50;
        for (let i = 0; i <= 50; i++) {
          const x = i * segmentWidth;
          // Noise-like wave
          const noise = Math.sin(i * 0.2 + p.offset + time * p.speed) * 20;
          const jitter = Math.random() < 0.01 ? (Math.random() - 0.5) * 50 : 0;
          ctx.lineTo(x, p.y + noise + jitter);
        }

        const isHot = idx % 4 === 0;
        ctx.strokeStyle = isHot
          ? "rgba(251, 191, 36, 0.1)"
          : "rgba(8, 145, 178, 0.05)";
        ctx.stroke();

        // Add occasional "Fault Line" data points
        if (isHot && Math.random() < 0.05) {
          ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
          ctx.fillRect(Math.random() * canvas.width, p.y - 10, 2, 20);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", init);
    init();
    draw(0);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
};

export default ChaosBackground;
