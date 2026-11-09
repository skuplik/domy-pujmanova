import Chev from "./Chev";
import { IMG, go } from "../utils";

export default function Intro({ onVideo }) {
  return (
    <section className="intro wrap" aria-labelledby="intro-lbl">
      <div className="intro-l">
        <h2 className="lbl" id="intro-lbl">O domech</h2>
        <p className="intro-p">Domy Pujmanova jsou dva bytové domy v Prostějově-Vrahovicích, A a B. V obou pronajímáme byty: v domě A po celkové rekonstrukci, v domě B v novostavbě z roku 2026. Všechny jsou plně zařízené, s vlastní koupelnou a kuchyní, nábytkem a televizí.</p>
        <p className="intro-p">Pronajímáme je na pár nocí, na měsíce i dlouhodobě, podle toho, co potřebujete.</p>
        <button className="vid" onClick={onVideo}>
          <span className="vid-th"><img src={IMG("hero-poster")} alt="" /><span className="vid-pl" aria-hidden="true">▶</span></span>
          <span><span className="lbl">Video</span><span className="vid-t">Prohlídka domu za 20 vteřin</span></span>
        </button>
      </div>
      <ul className="links">
        {[["byty", "Byty a ceny"], ["okoli", "Co máte v okolí"], ["budova-a", "Budova A na pár nocí"]].map(([id, l]) => (
          <li key={id}><a href={"#" + id} onClick={(e) => { e.preventDefault(); go(id); }}>{l}<Chev /></a></li>
        ))}
      </ul>
    </section>
  );
}
