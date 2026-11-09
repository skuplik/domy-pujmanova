import { reduced } from "./utils";

const REVEAL = {
  "rv-up": [".lbl:not(.lbl-w)", ".sec-top .mut", ".h2", ".intro-p", ".vid", ".links a", ".okoli-top > * > *", ".okoli-subrow > *", ".post-l > *", ".kon-r > p", ".kon-r > .tlink"],
  "rv-line": [".plist > .pitem", ".nrows > li"],
  "rv-tile": [".card", ".pcard", ".amen li", ".kon-list li"],
  "rv-img": [".map", ".okoli-img"],
};

export function initReveal() {
  if (reduced() || !("IntersectionObserver" in window)) return () => {};
  const io = new IntersectionObserver((es) => {
    for (const e of es) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      el.classList.add("in");
      io.unobserve(el);

      setTimeout(() => { el.classList.remove("rv", "in", ...Object.keys(REVEAL)); el.style.removeProperty("--i"); }, 2000);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  for (const [cls, sels] of Object.entries(REVEAL)) {
    document.querySelectorAll(sels.join(",")).forEach((el) => {
      if (el.classList.contains("rv")) return;
      const sib = [...el.parentElement.children].filter((s) => s.matches(sels.join(",")));
      el.style.setProperty("--i", Math.min(sib.indexOf(el), 8));
      el.classList.add("rv", cls);
      io.observe(el);
    });
  }

  const onEnd = () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    document.querySelectorAll(".rv:not(.in)").forEach((el) => { el.classList.add("in"); io.unobserve(el); });
  };
  window.addEventListener("scroll", onEnd, { passive: true });
  return () => { io.disconnect(); window.removeEventListener("scroll", onEnd); };
}
