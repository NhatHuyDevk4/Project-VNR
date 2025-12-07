'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}
const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();
    let phi = 0;

    onResize();
    // Lightweight fallback to avoid external dependency 'cobe'
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    canvas.width = width * 2;
    canvas.height = width * 2;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw simple rotating gradient circle as placeholder
      const r = Math.min(canvas.width, canvas.height) / 2 - 4;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const grad = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r);
      const [br, bg, bb] = baseColor;
      grad.addColorStop(0, `rgba(${Math.round(br*255)}, ${Math.round(bg*255)}, ${Math.round(bb*255)}, 1)`);
      grad.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      // simple glow ring
      ctx.strokeStyle = `rgba(${Math.round(glowColor[0]*255)}, ${Math.round(glowColor[1]*255)}, ${Math.round(glowColor[2]*255)}, 0.4)`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 2 * Math.sin(phi), 0, Math.PI * 2);
      ctx.stroke();
      phi += 0.03;
      raf = requestAnimationFrame(render);
    };

    let raf = requestAnimationFrame(render);

    const globe = {
      destroy: () => cancelAnimationFrame(raf),
    } as { destroy: () => void };

    // Original cobe options for reference
    /*
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: theta,
      dark: dark,
      scale: scale,
      diffuse: diffuse,
      mapSamples: mapSamples,
      mapBrightness: mapBrightness,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      opacity: 1,
      offset: [0, 0],
      markers: [
        // longitude latitude
      ],
      onRender: (state: Record<string, unknown>) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.\
        state.phi = phi;
        phi += 0.003;
      },
    });
    */

    return () => {
      globe.destroy();
    };
  }, [dark, theta, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor]);

  return (
    <div
      className={cn(
        'z-[10] mx-auto flex w-full max-w-[350px] items-center justify-center',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
        }}
      />
    </div>
  );
};

export default Earth;
