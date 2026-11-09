import { useState, useRef } from "react";
import { IMG, reduced } from "../utils";

const DUR = 5;

export default function Gallery({ photos, name, play = true }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const auto = play && !reduced();
  const next = () => setI((x) => (x + 1) % photos.length);
  const prev = () => setI((x) => (x - 1 + photos.length) % photos.length);

  const sx = useRef(null);
  const onTouchStart = (e) => { sx.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (sx.current == null) return;
    const d = e.changedTouches[0].clientX - sx.current;
    if (Math.abs(d) > 40) (d < 0 ? next : prev)();
    sx.current = null;
  };
  return (
    <div className={"gal" + (hold || !auto ? " is-hold" : "")} role="region" aria-roledescription="galerie" aria-label={"Fotky bytu " + name} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {photos.map(([f, c], j) => (
        <img key={f} loading="lazy" src={IMG(f)} alt={"Byt " + name + ", " + c.toLowerCase()} className={j === i ? "on" : ""} aria-hidden={j === i ? undefined : "true"} />
      ))}
      <button type="button" className="gal-nav gal-prev" aria-label="Předchozí fotka" onClick={prev}><svg viewBox="0 0 10 16" aria-hidden="true"><path d="M8 1 1 8l7 7" /></svg></button>
      <button type="button" className="gal-nav gal-next" aria-label="Další fotka" onClick={next}><svg viewBox="0 0 10 16" aria-hidden="true"><path d="m2 1 7 7-7 7" /></svg></button>
      <div className="gal-ui">
        <div className="gal-bars">
          {photos.map(([f, c], j) => (
            <button key={f} type="button" aria-label={"Fotka " + (j + 1) + ": " + c} aria-current={j === i ? "true" : undefined} onClick={() => setI(j)}
              className={j < i ? "done" : j === i ? "on" : ""}>

              <span key={j === i ? "a" + i : "x"} style={{ animationDuration: DUR + "s" }} onAnimationEnd={j === i ? next : undefined} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
