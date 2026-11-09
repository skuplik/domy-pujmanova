import { useEffect } from "react";
import Logo from "../components/Logo";
import Chev from "../components/Chev";
import Footer from "../components/Footer";
import { initTypo } from "../typo";

const OPERATOR = "DŮM MP PROSTĚJOV s.r.o., Marie Pujmanové 683, 798 11 Prostějov, IČ 248 33 797, zapsaná v obchodním rejstříku vedeném Krajským soudem v Brně, oddíl C, vložka 75455";

const SECTIONS = [
  ["Kdo vaše údaje zpracovává", [
    <>Správcem osobních údajů je {OPERATOR} (dále jen „my“).</>,
    <>S dotazy k osobním údajům se na nás obracejte e-mailem na <a href="mailto:info@domypujmanova.cz">info@domypujmanova.cz</a> nebo telefonicky na <a href="tel:+420603262273">+420 603 262 273</a>. [Doplnit případného pověřence pro ochranu osobních údajů.]</>,
  ]],
  ["Jaké údaje zpracováváme", [
    <><b>Když se ozvete s poptávkou:</b> jméno a příjmení, telefon, e-mail a to, co nám sami napíšete nebo řeknete (například kolik vás bude a od kdy chcete bydlet).</>,
    <><b>Když uzavřeme smlouvu:</b> [doplnit, např. jméno a příjmení, datum narození, adresa trvalého bydliště, číslo dokladu totožnosti, bankovní spojení, údaje o platbách].</>,
    <><b>Během pobytu:</b> [doplnit, např. údaje do evidence ubytovaných, záznamy z kamerového systému ve společných prostorách, údaje z čipového vstupního systému].</>,
  ]],
  ["Proč údaje zpracováváme a na jakém základě", [
    <><b>Odpověď na poptávku a domluva prohlídky:</b> jednání před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).</>,
    <><b>Uzavření a plnění smlouvy o nájmu nebo ubytování:</b> plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR).</>,
    <><b>Plnění zákonných povinností:</b> například účetnictví, daně a evidence ubytovaných (čl. 6 odst. 1 písm. c) GDPR).</>,
    <><b>Bezpečnost domu a ochrana majetku:</b> kamerový systém a čipový vstup na základě našeho oprávněného zájmu (čl. 6 odst. 1 písm. f) GDPR). [Ověřit a doplnit.]</>,
  ]],
  ["Jak dlouho údaje uchováváme", [
    <><b>Poptávky, ze kterých nevznikne smlouva:</b> [doplnit, např. nejdéle 6 měsíců od posledního kontaktu].</>,
    <><b>Údaje ze smluv:</b> po dobu trvání smlouvy a poté po dobu, kterou ukládají právní předpisy [doplnit, např. 10 let u účetních dokladů].</>,
    <><b>Kamerové záznamy:</b> [doplnit, např. 7 dní, pokud nejsou potřeba k řešení události].</>,
  ]],
  ["Komu údaje předáváme", [
    <>Údaje mohou zpracovávat naši dodavatelé, kteří pro nás zajišťují [doplnit, např. účetnictví, IT služby nebo správu kamerového systému], a to jen v rozsahu nutném pro jejich práci.</>,
    <>Orgánům veřejné moci údaje předáváme jen tehdy, když nám to ukládá zákon.</>,
    <>Údaje nepředáváme mimo Evropskou unii. [Ověřit.]</>,
  ]],
  ["Tento web", [
    <>Web nepoužívá analytické ani reklamní cookies a nesbírá údaje přes formuláře.</>,
    <>Mapa okolí se načítá ze služby OpenFreeMap, které se při zobrazení mapy technicky předává IP adresa vašeho zařízení. Web běží na hostingu [doplnit poskytovatele], který může ukládat IP adresy do provozních záznamů.</>,
  ]],
  ["Vaše práva", [
    <>Máte právo na přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost a máte právo vznést námitku proti zpracování založenému na oprávněném zájmu.</>,
    <>Pokud zpracování probíhá na základě souhlasu, můžete ho kdykoli odvolat.</>,
    <>Pokud máte za to, že s vašimi údaji nezacházíme správně, můžete podat stížnost u Úřadu pro ochranu osobních údajů (<a href="https://uoou.gov.cz" target="_blank" rel="noopener">uoou.gov.cz</a>).</>,
  ]],
];

export default function Privacy() {
  useEffect(() => initTypo(), []);
  return (
    <>
      <header className="sub-hdr">
        <div className="wrap sub-hdr-in">
          <a href="../" className="hdr-wm" aria-label="Domy Pujmanova, hlavní stránka"><Logo className="hdr-logo" /></a>
          <a href="../" className="tlink">Zpět na web <Chev /></a>
        </div>
      </header>
      <main className="wrap legal">
        <p className="lbl">Informace</p>
        <h1 className="h2">Ochrana osobních údajů<span className="gd">.</span></h1>
        <p className="legal-lead mut">Tady vysvětlujeme, jak zpracováváme osobní údaje lidí, kteří se zajímají o nájem bytu v Domech Pujmanova nebo u nás bydlí.</p>
        {SECTIONS.map(([h, ps], i) => (
          <section key={h} className="legal-sec">
            <h2 className="legal-h"><span className="legal-n tnum">{String(i + 1).padStart(2, "0")}</span>{h}</h2>
            <div className="legal-body">{ps.map((p, j) => <p key={j}>{p}</p>)}</div>
          </section>
        ))}
        <p className="small mut legal-valid">Tyto informace platí od [doplnit datum].</p>
      </main>
      <Footer sub />
    </>
  );
}
