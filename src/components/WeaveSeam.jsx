import { useEffect, useRef } from "react";
import { reduced } from "../utils";

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export default function WeaveSeam({ side = "top", bg = "--band", bar = "--paper", rows = 8, ROW = 11, rowLag = 0.04 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const P = (110.8 / 19) * ROW;
    let w = 0, h = 0, raf = 0, cells = [];
    const build = () => {
      cells = [];
      for (let r = 0; r < rows; r++) {

        const long = r < rows / 2 ? r % 2 === 0 : r % 2 === 1;
        let col = 0;
        for (let x = -P; x < w + P; x += P, col++) {
          const bx = long ? x : x + (P * 2) / 3;
          const bw = long ? (P * 2) / 3 : P / 3;
          const ry = r * ROW;
          cells.push({ x: bx, y: ry, w: bw });
        }
      }
    };
    const draw = () => {
      raf = 0;
      const rect = cv.getBoundingClientRect();
      const vh = window.innerHeight;

      const hdr = document.querySelector(".hdr");
      const topEdge = hdr ? hdr.getBoundingClientRect().bottom : 0;
      const p = reduced() ? 1 : clamp((vh - rect.top) / Math.max(1, vh - topEdge), 0, 1);
      ctx.clearRect(0, 0, w, h);

      const paper = cssVar(bar), green = cssVar(bg);
      const half = rows / 2;
      const nearWhite = (r) => (side === "top" ? r < half : r >= half);
      for (let r = 0; r < rows; r++) {
        ctx.fillStyle = nearWhite(r) ? paper : green;
        ctx.fillRect(0, r * ROW, w, ROW + 0.5);
      }

const lag = rowLag;
      const total = 1 + lag * (rows - 1);
      for (const c of cells) {
        const r = Math.round(c.y / ROW);
        const order = side === "top" ? rows - 1 - r : r;
        const reveal = (p * total - order * lag) * w;
        if (reveal <= c.x) continue;
        const len = Math.min(c.w, reveal - c.x);
        ctx.fillStyle = nearWhite(r) ? green : paper;
        ctx.fillRect(c.x, c.y, len + 0.5, ROW + 0.5);
      }
    };
    const size = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw();
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw); };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [side, bg, bar, rows, ROW, rowLag]);
  return <canvas ref={ref} className="weave-seam" style={{ height: rows * ROW }} aria-hidden="true" />;
}
