import { useState } from "react";
import Chev from "./Chev";
import { FAQ } from "../data/content";

export default function Faq() {
  const [o, setO] = useState(-1);
  return (
    <section className="faq wrap" id="otazky" aria-labelledby="faq-lbl">
      <h2 className="lbl" id="faq-lbl">Časté otázky</h2>
      <ul className="plist">
        {FAQ.map(([q, a], i) => (
          <li key={q} className={"pitem" + (o === i ? " open" : "")}>
            <h3 className="faq-h">
              <button className="prow prow-faq" aria-expanded={o === i} aria-controls={"fa" + i} onClick={() => setO(o === i ? -1 : i)}>
                <span className="prow-n">{q}</span><Chev d={o === i ? "d" : "r"} />
              </button>
            </h3>
            <div id={"fa" + i} className="acc" inert={o === i ? undefined : ""}><div><div className="acc-in faq-a"><p>{a}</p></div></div></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
