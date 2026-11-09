import Logo from "./Logo";
import SlezanLogo from "./SlezanLogo";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <a href="#top" className="ftr-logo" aria-label="Domy Pujmanova, zpět nahoru"><Logo className="ftr-logo-svg" /></a>
        <span className="small mut">Marie Pujmanové 683, 798 11 Prostějov</span>
        <a className="ftr-sl" href="https://slezan.com" target="_blank" rel="noopener" aria-label="Projekt skupiny Slezan, slezan.com (otevře se v novém okně)">
          <span className="small mut">Projekt skupiny</span>
          <SlezanLogo className="sl-logo" />
        </a>
      </div>
    </footer>
  );
}
