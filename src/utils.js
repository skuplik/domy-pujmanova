export const IMG = (n) => "img/" + n + ".jpg";
export const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const go = (id) => {
  const el = document.getElementById(id);
  if (el) import("./smooth").then(({ scrollToY }) => scrollToY(el.getBoundingClientRect().top + window.scrollY - 76));
};
