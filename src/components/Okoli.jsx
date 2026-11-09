import Chev from "./Chev";
import { useState, useRef } from "react";
import { SquareParking, CookingPot, ShowerHead, Tv, CigaretteOff, ShieldCheck } from "lucide-react";
import MapReal from "./MapReal";
import { scrollToY } from "../smooth";
import { NEAR, AMENITIES } from "../data/content";

const ICONS = { SquareParking, CookingPot, ShowerHead, Tv, CigaretteOff, ShieldCheck };
const Ic = ({ n }) => { const C = ICONS[n]; return C ? <C className="ico" size={22} strokeWidth={1.25} aria-hidden="true" /> : null; };

export default function Okoli() {
  const [hover, setHover] = useState(-1);
  const [picked, setPicked] = useState(-1);
  const active = hover >= 0 ? hover : picked;
  const focus = useRef(null);
  const pick = (i) => {
    setPicked(i);
    focus.current && focus.current(i);

    const mapEl = document.querySelector(".mapr");
    if (mapEl && mapEl.getBoundingClientRect().bottom < 80) scrollToY(mapEl.getBoundingClientRect().top + window.scrollY - (window.innerHeight - mapEl.offsetHeight) / 2);
  };
  return (
    <section className="okoli wrap" id="okoli" aria-labelledby="okoli-h">
      <div className="okoli-top">
        <div>
          <p className="lbl">Vybavení a okolí</p>
          <h2 id="okoli-h" className="h2">Všechno potřebné v&nbsp;bytě i&nbsp;kousek od domu<span className="gd">.</span></h2>
        </div>
      </div>

      <div className="okoli-blk">
        <h3 className="lbl okoli-sub">V bytě a v domě</h3>
        <ul className="amen">
          {AMENITIES.map(([ic, n, d]) => (
            <li key={n}><Ic n={ic} /><p className="amen-n">{n}</p><p className="small mut">{d}</p></li>
          ))}
        </ul>
      </div>

      <div className="okoli-blk">
        <div className="okoli-subrow">
          <h3 className="lbl okoli-sub">V okolí</h3>
          <a className="tlink" href="https://maps.google.com/?q=Marie+Pujmanov%C3%A9+683+Prost%C4%9Bjov" target="_blank" rel="noopener">Otevřít v Mapách <Chev /></a>
        </div>
        <div className="okoli-map">
          <MapReal active={active} setActive={setHover} focusRef={focus} />
          <ul className="nrows">
            {NEAR.map(([c, n, d], i) => (
              <li key={n}>
                <button type="button" className={"nr" + (active === i ? " on" : "")} aria-pressed={picked === i}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} onFocus={() => setHover(i)} onBlur={() => setHover(-1)} onClick={() => pick(i)}>
                  <span className="nr-n">{n}</span>
                  <span className="nr-d tnum">{d}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
