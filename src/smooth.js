import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { reduced } from "./utils";

export let lenis = null;

export function initSmooth() {
  if (reduced()) return () => {};
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  let raf = 0;
  const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); lenis.destroy(); lenis = null; };
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: reduced() ? "auto" : "smooth" });
}
