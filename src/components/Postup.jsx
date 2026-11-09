export default function Postup() {
  const s = [
    ["Krok 1", "Zavoláte nebo napíšete", "Makléři nebo na recepci budovy A. Řekněte, kolik vás bude a od kdy chcete bydlet."],
    ["Krok 2", "Prohlídka", "Termín domluvíte rovnou v hovoru. Ukážeme vám volné byty naživo."],
    ["Krok 3", "Smlouva a klíče", "Byty jsou hotové a zařízené. Po podpisu se můžete hned nastěhovat."],
  ];
  return (
    <section className="band" id="postup" aria-labelledby="postup-h">
      <div className="wrap post">
        <div className="post-l">
          <p className="lbl">Postup</p>
          <h2 id="postup-h" className="h2">Jak to probíhá<span className="gd">.</span></h2>
        </div>
        <ol className="post-cards">
          {s.map(([k, h, p]) => (
            <li key={k} className="pcard"><p className="lbl">{k}</p><h3 className="pc-h">{h}</h3><p className="mut small">{p}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
