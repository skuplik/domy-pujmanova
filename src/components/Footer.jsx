import Logo from "./Logo";
import SlezanLogo from "./SlezanLogo";

export default function Footer({ sub = false }) {
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <a href={sub ? "../" : "#top"} className="ftr-logo" aria-label={sub ? "Domy Pujmanova, hlavní stránka" : "Domy Pujmanova, zpět nahoru"}><Logo className="ftr-logo-svg" /></a>
        <span className="small mut">Marie Pujmanové 683, 798 11 Prostějov</span>
        <a className="ftr-sl" href="https://slezan.com" target="_blank" rel="noopener" aria-label="Projekt skupiny Slezan, slezan.com (otevře se v novém okně)">
          <span className="small mut">Projekt skupiny</span>
          <SlezanLogo className="sl-logo" />
        </a>
      </div>
      <div className="wrap ftr-legal">
        <p className="small mut">Provozovatel: DŮM MP PROSTĚJOV s.r.o., Marie Pujmanové 683, 798 11 Prostějov, IČ 248 33 797, zapsáno u Krajského soudu v Brně, oddíl C, vložka 75455</p>
        <a className="small ftr-link" href={sub ? "./" : "ochrana-osobnich-udaju/"}>Ochrana osobních údajů</a>
      </div>
    </footer>
  );
}
