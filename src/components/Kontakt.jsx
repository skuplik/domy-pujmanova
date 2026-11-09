import Chev from "./Chev";

export default function Kontakt() {
  return (
    <section className="kon" id="kontakt" aria-labelledby="k-h">
      <div className="kon-r wrap">
        <p className="lbl">Kontakt</p>
        <h2 id="k-h" className="h2">Domluvte si prohlídku<span className="gd">.</span></h2>
        <p className="mut kon-p">Zavolejte nebo napište, kolik vás bude a od kdy chcete bydlet. Termín prohlídky domluvíme rovnou.</p>
        <ul className="kon-list">
          <li><p className="lbl">Telefon</p><a className="kon-v tnum" href="tel:+420603262273">+420 603 262 273</a><span className="small mut">Ing. Pavel Němec</span></li>
          <li><p className="lbl">E-mail</p><a className="kon-v" href="mailto:info@domypujmanova.cz">info@domypujmanova.cz</a><span className="small mut">Pro poptávky a dotazy</span></li>
          <li><p className="lbl">Adresa</p><span className="kon-v">Marie Pujmanové 683</span><span className="small mut">798 11 Prostějov-Vrahovice</span></li>
          <li><p className="lbl">Recepce budovy A</p><a className="kon-v tnum" href="tel:+420582335289">582 335 289</a><span className="small mut">Nonstop, i pro krátké pobyty</span></li>
        </ul>
        <a className="tlink" href="https://maps.google.com/?q=Marie+Pujmanov%C3%A9+683+Prost%C4%9Bjov" target="_blank" rel="noopener">Navigovat k domu <Chev /></a>
      </div>
    </section>
  );
}
