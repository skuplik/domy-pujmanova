import Chev from "./Chev";
import WeaveSeam from "./WeaveSeam";
import Gallery from "./Gallery";
import { TYPES, PRICES_VALID } from "../data/content";

function Spec({ t, open, onBook, onPlan }) {
  return (
    <div className="spec" id={"spec-" + t.id}>
      <Gallery photos={t.photos} name={t.name} play={open} />
      <div className="spec-r">
        <p className="spec-text">{t.text}</p>
        <dl className="sp">
          <div><dt>Plocha</dt><dd>{t.area}{t.terrace ? <small> + terasa {t.terrace}</small> : null}</dd></div>
          <div><dt>Na měsíce</dt><dd className="tnum">od {t.month}</dd></div>
          <div><dt>Na noc</dt><dd className="tnum">{t.night ? "od " + t.night : <span className="mut">jen na delší pobyt</span>}</dd></div>
        </dl>
        <div className="spec-act">
          <button className="btn btn-green" onClick={() => onBook(t.id)}>Domluvit prohlídku <Chev /></button>
          <button className="btn btn-line" onClick={() => onPlan(t.name)}>Půdorys <Chev /></button>
        </div>
      </div>
    </div>
  );
}

export default function Byty({ open, setOpen, onBook, onPlan }) {
  return (
    <section className="band band-seamed" id="byty" aria-labelledby="byty-lbl">
      <WeaveSeam side="top" />
      <div className="wrap">
        <div className="sec-top">
          <h2 className="lbl" id="byty-lbl">Byty a ceny</h2>
        </div>
        <ul className="plist">
          {TYPES.map((t) => {
            const isOpen = open === t.id;
            return (
              <li key={t.id} className={"pitem" + (isOpen ? " open" : "")}>
                <h3 className="faq-h">
                <button className="prow" aria-expanded={isOpen} aria-controls={"spec-" + t.id} onClick={() => setOpen(isOpen ? null : t.id)}>
                  <span className="prow-n">{t.name}</span>
                  <span className="prow-p tnum">od {t.month}<small> / měsíc</small></span>
                  <Chev d={isOpen ? "d" : "r"} />
                </button>
                </h3>
                <div className="acc" inert={isOpen ? undefined : ""}><div><div className="acc-in"><Spec t={t} open={isOpen} onBook={onBook} onPlan={onPlan} /></div></div></div>
              </li>
            );
          })}
        </ul>
        <p className="small mut byty-note">{PRICES_VALID}</p>
      </div>
      <WeaveSeam side="bottom" />
    </section>
  );
}
