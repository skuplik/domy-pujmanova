import Chev from "./Chev";
import { IMG, go } from "../utils";
import { BUILDING_A } from "../data/content";

export default function Cards({ onBook }) {
  return (
    <section className="cards-sec" aria-label="Další možnosti">
      <div className="wrap cards">
        <article className="card" id="budova-a">
          <p className="lbl">Budova A</p>
          <h2 className="card-h">Potřebujete jen na pár nocí?</h2>
          <p className="mut small">Byty po celkové rekonstrukci hned vedle, 1+kk o {BUILDING_A.area}. Recepce nonstop.</p>
          <dl className="mini">
            <div><dt>Noc</dt><dd className="tnum">od {BUILDING_A.night}</dd></div>
            <div><dt>Měsíc</dt><dd className="tnum">od {BUILDING_A.month}</dd></div>
          </dl>
          <button className="btn btn-line btn-sm" onClick={() => go("kontakt")}>Kontakt na recepci <Chev /></button>
        </article>
        <article className="card card-photo">
          <img src={IMG("byt-2kk-7")} alt="" loading="lazy" />
          <div className="card-in">
            <p className="lbl lbl-w">Prohlídka</p>
            <h2 className="card-h">Přijďte se podívat naživo</h2>
            <button className="btn btn-white btn-sm" onClick={() => onBook()}>Domluvit termín <Chev /></button>
          </div>
        </article>
        <article className="card card-art">
          <div className="card-in">
            <p className="lbl">Ke stažení</p>
            <h2 className="card-h">Ceník a půdorysy bytů</h2>

            <a className="btn btn-line btn-sm" href="cenik.pdf" target="_blank" rel="noopener">Stáhnout PDF <Chev /></a>
          </div>
        </article>
      </div>
    </section>
  );
}
