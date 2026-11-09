import { useState, useEffect } from "react";
import Logo from "./Logo";
import Chev from "./Chev";
import { go } from "../utils";
import { scrollToY, lenis } from "../smooth";

export default function Header({ onBook }) {
  const [open, setOpen] = useState(false);

  const [float, setFloat] = useState(false);
  useEffect(() => {
    const on = () => setFloat(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [["byty", "Byty a ceny"], ["okoli", "Vybavení a okolí"], ["postup", "Jak to probíhá"], ["otazky", "Otázky"], ["kontakt", "Kontakt"]];
  const nav = (id) => { setOpen(false); setTimeout(() => go(id), 50); };

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (lenis) open ? lenis.stop() : lenis.start();
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className={"hdr" + (float ? " is-float" : "") + (open ? " is-open" : "")}>
      <div className="hdr-in wrap">
        <a href="#top" className="hdr-wm" onClick={(e) => { e.preventDefault(); scrollToY(0); }}><Logo className="hdr-logo" /></a>
        <nav className="hdr-nav" aria-label="Hlavní menu">
          {links.map(([id, l]) => <a key={id} href={"#" + id} onClick={(e) => { e.preventDefault(); nav(id); }}>{l}</a>)}
        </nav>
        <button className="btn btn-green hdr-cta" onClick={onBook}>Domluvit prohlídku <Chev /></button>
        <button className="hdr-menu" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>{open ? "Zavřít" : "Menu"}</button>
      </div>

      <div id="mnav" className={"mnav" + (open ? " open" : "")} inert={open ? undefined : ""} aria-hidden={!open}>
        <nav className="mnav-list" aria-label="Menu">
          {links.map(([id, l], i) => (
            <a key={id} href={"#" + id} style={{ "--i": i }} onClick={(e) => { e.preventDefault(); nav(id); }}>
              <span>{l}</span><Chev />
            </a>
          ))}
        </nav>
        <div className="mnav-foot" style={{ "--i": links.length }}>
          <button className="btn btn-green" onClick={() => { setOpen(false); onBook(); }}>Domluvit prohlídku <Chev /></button>
          <p className="small mut">Marie Pujmanové 683, Prostějov</p>
        </div>
      </div>
    </header>
  );
}
