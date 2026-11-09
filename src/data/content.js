export const PRICES_VALID = "Ceny platí do 31. 12. 2026, pak vyjde nový ceník.";
export const TYPES = [
  {
    id: "1kk", name: "1+kk", area: "29 m²", terrace: null, floor: null, month: "7 600 Kč", night: "1 100 Kč",
    text: "Obytný pokoj s kuchyňským koutem, jídelním stolem a rozkládací pohovkou. Vlastní koupelna se sprchou a WC.",
    photos: [["byty-pujmanova-3", "Obytný pokoj"], ["byt-1-kk-vyssi-3", "Kuchyňský kout"], ["byt-1-kk-vyssi-1", "Pokoj"], ["byty-pujmanova-4", "Koupelna"]],
  },
  {
    id: "1kkt", name: "1+kk s terasou", area: "28 m²", terrace: "12 m²", floor: "5. patro", month: "7 600 Kč", night: null,
    text: "Byt v ustupujícím horním patře. Z pokoje vyjdete posuvnými dveřmi rovnou na terasu s výhledem do zeleně.",
    photos: [["byty-pujmanova-1", "Terasa přímo z pokoje"], ["byt-1-kk-terasa-5", "Kuchyňský kout"], ["byty-pujmanova-2", "Kuchyň a vstup"], ["byt-1-kk-terasa-8", "Koupelna"]],
  },
  {
    id: "2kkt", name: "2+kk s terasou", area: "42 m²", terrace: "13 m²", floor: "4. patro", month: "9 600 Kč", night: null,
    text: "Největší byt v nabídce. Oddělená ložnice, světlý obytný pokoj s kuchyní a terasa přes celou šířku bytu.",
    photos: [["byt-2kk-1", "Obytný pokoj s kuchyní"], ["byt-2kk-10", "Kuchyň a výstup na terasu"], ["byt-2kk-7", "Terasa"], ["byt-2kk-12", "Koupelna"]],
  },
];

export const BUILDING_A = { area: "28 m²", month: "6 600 Kč", night: "580 Kč" };

export const HOME = { name: "Domy Pujmanova", addr: "Marie Pujmanové 683, Prostějov", lng: 17.13964, lat: 49.47573 };

export const AMENITIES = [
  ["CookingPot", "Vybavená kuchyňka", "Linka, sporák, lednice, mikrovlnka a konvice."],
  ["ShowerHead", "Koupelna s WC", "Vlastní sprchový kout a WC v každém bytě."],
  ["Tv", "Nábytek a televize", "Byty jsou plně zařízené, stačí přijet s kufrem."],
  ["ShieldCheck", "Bezpečný dům", "Vstup na čipy, bezpečnostní zámky a kamery."],
  ["SquareParking", "Parkování", "Vyhrazené místo u domu za příplatek."],
  ["CigaretteOff", "Nekuřácký dům", "Kouřit se nesmí v celém domě."],
];

export const NEAR = [
  ["Doprava", "Autobusová zastávka", "300 m", [17.13773, 49.47739], "Bus"],
  ["Doprava", "Hlavní nádraží", "1,4 km", [17.12956, 49.47215], "TrainFront"],
  ["Nákupy", "OC Arkáda", "1,9 km", [17.12727, 49.48417], "ShoppingBag"],
  ["Město", "Centrum Prostějova", "8 min MHD", [17.10922, 49.47212], "Landmark"],
  ["Auto", "Dálnice D46", "do 5 min", [17.12441, 49.46472], "Car"],
];

export const FAQ = [
  ["Kdy se můžu nastěhovat?", "Hned. Byty jsou dokončené a vybavené, stačí se domluvit na prohlídce a podepsat smlouvu."],
  ["Půjde to jen na pár nocí?", "Ano. V budově A i B pronajímáme byty na noc, na měsíc i dlouhodobě. Na krátké pobyty doporučujeme budovu A, je levnější a má nonstop recepci. V budově B dáváme přednost delším pobytům. Vždycky se ale dá domluvit."],
  ["Ubytujete víc lidí najednou?", "Ano, třeba pracovní kolektiv nebo větší skupinu. Zavolejte nebo napište, kolik vás bude a od kdy, a navrhneme rozdělení do bytů podle toho, co je zrovna volné."],
  ["Co všechno je v ceně?", "Elektřina, voda, teplo a používání veškerého vybavení bytu. Zvlášť se platí jen internet a vyhrazené parkovací místo."],
  ["Jak vysoká je kauce?", "Od 5 000 Kč za byt, podle dohody."],
  ["Můžu bydlet se psem?", "Bohužel ne. Domácí zvířata v bytech mít nejde."],
  ["Jak je to s bezpečností, praním a koly?", "Do domu se chodí na čip, dům i byty mají bezpečnostní zámky, je tu kamerový systém a požární hlídání napojené na centrální pult. Oba domy mají moderní výtah. V budově A se dá domluvit praní, případně si můžete do bytu dát vlastní pračku. Úschovna kol je v přízemí budovy A, u budovy B ji stavíme do jara 2027."],
];
