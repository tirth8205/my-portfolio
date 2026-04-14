import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
  targetBrightness: number;
  pulseOffset: number;
}

const NODE_COUNT = 45;
const EDGE_DISTANCE = 140;
const MOUSE_RADIUS = 180;
const BASE_BRIGHTNESS = 0.15;
const ACTIVE_BRIGHTNESS = 0.7;
const RIPPLE_SPEED = 4;
const RIPPLE_DURATION = 60;

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const rippleRef = useRef<{ x: number; y: number; radius: number; life: number } | null>(null);
  const dprRef = useRef(1);

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1.5 + Math.random() * 3,
        brightness: BASE_BRIGHTNESS,
        targetBrightness: BASE_BRIGHTNESS,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const dpr = dprRef.current;
    ctx.clearRect(0, 0, width * dpr, height * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;
    const ripple = rippleRef.current;

    // Update ripple
    if (ripple) {
      ripple.radius += RIPPLE_SPEED;
      ripple.life--;
      if (ripple.life <= 0) rippleRef.current = null;
    }

    // Update nodes
    for (const node of nodes) {
      // Drift
      node.x += node.vx;
      node.y += node.vy;

      // Gentle boundary bounce
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));

      // Mouse proximity
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS) {
        const force = 1 - dist / MOUSE_RADIUS;
        node.targetBrightness = BASE_BRIGHTNESS + (ACTIVE_BRIGHTNESS - BASE_BRIGHTNESS) * force;
        // Gentle attraction toward cursor
        node.vx += (dx / dist) * force * 0.02;
        node.vy += (dy / dist) * force * 0.02;
      } else {
        node.targetBrightness = BASE_BRIGHTNESS;
      }

      // Ripple effect
      if (ripple) {
        const rdx = ripple.x - node.x;
        const rdy = ripple.y - node.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const rippleHit = Math.abs(rdist - ripple.radius);
        if (rippleHit < 30) {
          const rippleForce = (1 - rippleHit / 30) * (ripple.life / RIPPLE_DURATION);
          node.targetBrightness = Math.max(node.targetBrightness, ACTIVE_BRIGHTNESS * rippleForce);
        }
      }

      // Smooth brightness lerp
      node.brightness += (node.targetBrightness - node.brightness) * 0.08;

      // Dampen velocity
      node.vx *= 0.995;
      node.vy *= 0.995;

      // Add tiny random drift
      node.vx += (Math.random() - 0.5) * 0.01;
      node.vy += (Math.random() - 0.5) * 0.01;
    }

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < EDGE_DISTANCE) {
          const edgeAlpha = (1 - dist / EDGE_DISTANCE) * Math.max(a.brightness, b.brightness) * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${edgeAlpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of nodes) {
      const pulse = Math.sin(time * 0.001 + node.pulseOffset) * 0.15 + 1;
      const r = node.radius * pulse;

      // Glow
      if (node.brightness > BASE_BRIGHTNESS + 0.05) {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${node.brightness * 0.2})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${node.brightness * 0.8})`;
      ctx.fill();
    }

    // Draw ripple ring
    if (ripple) {
      const rippleAlpha = (ripple.life / RIPPLE_DURATION) * 0.2;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(59, 130, 246, ${rippleAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (nodesRef.current.length === 0) {
        initNodes(width, height);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const onClick = (e: MouseEvent) => {
      rippleRef.current = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        life: RIPPLE_DURATION,
      };
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        rippleRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          radius: 0,
          life: RIPPLE_DURATION,
        };
      }
    };

    resize();

    const animate = (time: number) => {
      draw(ctx, window.innerWidth, window.innerHeight, time);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [initNodes, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-auto"
      aria-hidden="true"
    />
  );
}
