import { useEffect, useRef } from "react";
import Chev from "./Chev";
import { IMG, reduced, go } from "../utils";

export default function Hero({ onType }) {
  const v = useRef(null);
  useEffect(() => { if (reduced() && v.current) v.current.pause(); }, []);
  return (
    <section className="hero" id="top" aria-labelledby="hero-h">
      <video ref={v} aria-hidden="true" tabIndex={-1} src="video/hero.mp4" poster={IMG("hero-poster")} autoPlay muted loop playsInline preload="auto" />
      <div className="hero-shade" />
      <div className="wrap hero-in">
        <h1 id="hero-h" className="hero-h">Nájemní byty<br />v&nbsp;Prostějově<span className="gd">.</span></h1>
        <button className="btn btn-white" onClick={() => go("byty")}>Vybrat byt <Chev /></button>
      </div>
    </section>
  );
}
