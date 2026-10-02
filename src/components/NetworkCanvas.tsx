"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; flash: number };
type Packet = { from: Node; to: Node; t: number; speed: number };

// A quiet network of drifting nodes that lights up around the cursor, with the
// occasional data packet travelling along a live link. Fades in on load.
// Pauses when off-screen or in a background tab; static when reduced motion is on.
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const born = performance.now();

    const LINK = 130;
    const REACH = 170;
    const MAX_PACKETS = 6;
    const FADE_IN = 1600;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        flash: 0,
      }));
      packets = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Ease the whole network in on first load.
      const p = reduced ? 1 : Math.min(1, (performance.now() - born) / FADE_IN);
      ctx.globalAlpha = 1 - (1 - p) ** 3;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (running && packets.length < MAX_PACKETS && Math.random() < 0.0005) {
              const forward = Math.random() < 0.5;
              packets.push({ from: forward ? a : b, to: forward ? b : a, t: 0, speed: 0.006 + Math.random() * 0.008 });
            }
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < REACH) {
          ctx.strokeStyle = `rgba(124,92,255,${0.45 * (1 - dm / REACH)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        if (dm < REACH || a.flash > 0) {
          const alpha = dm < REACH ? 0.9 : 0.3 + 0.7 * a.flash;
          ctx.fillStyle = `rgba(169,155,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(a.x, a.y, 1.8 + a.flash * 1.4, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.28)";
          ctx.beginPath();
          ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Packets: a bright head with a short fading trail.
      for (const pk of packets) {
        const { from, to, t } = pk;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;
        const tt = Math.max(0, t - 0.18);
        const trail = ctx.createLinearGradient(from.x + (to.x - from.x) * tt, from.y + (to.y - from.y) * tt, x, y);
        trail.addColorStop(0, "rgba(124,92,255,0)");
        trail.addColorStop(1, "rgba(169,155,255,0.75)");
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(from.x + (to.x - from.x) * tt, from.y + (to.y - from.y) * tt);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "rgba(124,92,255,0.18)";
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(214,207,255,0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (n.flash > 0) n.flash = Math.max(0, n.flash - 0.02);
      }
      packets = packets.filter((pk) => {
        pk.t += pk.speed;
        if (pk.t >= 1) {
          pk.to.flash = 1; // Delivered: the receiving node pulses.
          return false;
        }
        // Drop packets whose link has stretched past breaking point.
        return Math.hypot(pk.from.x - pk.to.x, pk.from.y - pk.to.y) < LINK * 1.15;
      });
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || running) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduced) draw();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
      if (reduced) draw();
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="hero-fade pointer-events-none absolute inset-0 size-full" />;
}
