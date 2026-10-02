"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; flash: number };
type Packet = { from: Node; to: Node; t: number; speed: number };

const LINK = 130;
const REACH = 170;
const MAX_PACKETS = 6;
const FADE_IN = 1600;
// Link opacity is quantised into a few buckets so each frame strokes a handful
// of batched paths instead of one path per link.
const BUCKETS = 4;
const linkStyles = Array.from({ length: BUCKETS }, (_, b) => `rgba(255,255,255,${(0.07 * (b + 0.5)) / BUCKETS})`);
const reachStyles = Array.from({ length: BUCKETS }, (_, b) => `rgba(124,92,255,${(0.45 * (b + 0.5)) / BUCKETS})`);

// A quiet network of drifting nodes that lights up around the cursor, with the
// occasional data packet travelling along a live link. Fades in on load.
// Pauses while scrolling, off-screen or in a background tab; runs at a lower
// frame rate and resolution on touch devices; static when reduced motion is on.
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const frameBudget = touch ? 1000 / 30 : 1000 / 60;
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = false;
    let scrolling = false;
    let scrollTimer = 0;
    let lastFrame = 0;
    const born = performance.now();
    const links: number[][] = Array.from({ length: BUCKETS }, () => []);
    const reach: number[][] = Array.from({ length: BUCKETS }, () => []);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
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

    const strokeBatch = (batch: number[][], styles: string[]) => {
      ctx.lineWidth = 1;
      for (let b = 0; b < BUCKETS; b++) {
        const seg = batch[b];
        if (!seg.length) continue;
        ctx.strokeStyle = styles[b];
        ctx.beginPath();
        for (let i = 0; i < seg.length; i += 4) {
          ctx.moveTo(seg[i], seg[i + 1]);
          ctx.lineTo(seg[i + 2], seg[i + 3]);
        }
        ctx.stroke();
        seg.length = 0;
      }
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
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK * LINK) continue;
          const k = 1 - Math.sqrt(d2) / LINK;
          links[Math.min(BUCKETS - 1, (k * BUCKETS) | 0)].push(a.x, a.y, b.x, b.y);
          if (running && packets.length < MAX_PACKETS && Math.random() < 0.0005) {
            const forward = Math.random() < 0.5;
            packets.push({ from: forward ? a : b, to: forward ? b : a, t: 0, speed: 0.006 + Math.random() * 0.008 });
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < REACH) {
          const k = 1 - dm / REACH;
          reach[Math.min(BUCKETS - 1, (k * BUCKETS) | 0)].push(a.x, a.y, mouse.x, mouse.y);
        }
      }
      strokeBatch(links, linkStyles);
      strokeBatch(reach, reachStyles);

      // Resting nodes share one path; lit ones (near the cursor or just
      // pulsed by a packet) are drawn individually.
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.beginPath();
      for (const n of nodes) {
        if (n.flash > 0 || Math.hypot(n.x - mouse.x, n.y - mouse.y) < REACH) continue;
        ctx.moveTo(n.x + 1.2, n.y);
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
      }
      ctx.fill();
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < REACH;
        if (!near && n.flash <= 0) continue;
        ctx.fillStyle = `rgba(169,155,255,${near ? 0.9 : 0.3 + 0.7 * n.flash})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8 + n.flash * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Packets: a short trail and a bright head.
      for (const pk of packets) {
        const { from, to, t } = pk;
        const tt = Math.max(0, t - 0.18);
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;
        ctx.strokeStyle = "rgba(169,155,255,0.45)";
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

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const elapsed = now - lastFrame;
      if (elapsed < frameBudget - 1) return;
      // Advance by real time so drift speed is the same at 30, 60 or 120 Hz.
      const dt = Math.min(elapsed, 100) / (1000 / 60);
      lastFrame = now;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (n.flash > 0) n.flash = Math.max(0, n.flash - 0.02 * dt);
      }
      packets = packets.filter((pk) => {
        pk.t += pk.speed * dt;
        if (pk.t >= 1) {
          pk.to.flash = 1; // Delivered: the receiving node pulses.
          return false;
        }
        // Drop packets whose link has stretched past breaking point.
        return Math.hypot(pk.from.x - pk.to.x, pk.from.y - pk.to.y) < LINK * 1.15;
      });
      draw();
    };

    const start = () => {
      if (reduced || running || !visible || scrolling || document.hidden) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Scrolling is when smoothness matters most, and the hero is fading out
    // anyway: hold the network still until scrolling settles.
    const onScroll = () => {
      scrolling = true;
      stop();
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        start();
      }, 180);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
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

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      clearTimeout(scrollTimer);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Only as tall as the screen: below that the hero is the portrait, and a
  // full-height canvas on a phone would be several screens of pixels per frame.
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="hero-fade pointer-events-none absolute inset-x-0 top-0 h-full max-h-svh w-full [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
    />
  );
}
