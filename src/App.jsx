import { useState, useEffect } from "react";
import { initReveal } from "./reveal";
import { initSmooth } from "./smooth";
import { initTypo } from "./typo";
import { go } from "./utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Byty from "./components/Byty";
import Cards from "./components/Cards";
import Okoli from "./components/Okoli";
import Postup from "./components/Postup";
import Faq from "./components/Faq";
import Kontakt from "./components/Kontakt";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

export default function App() {
  const [open, setOpen] = useState("1kk");
  const [plan, setPlan] = useState(null);
  const [video, setVideo] = useState(false);
  useEffect(() => initReveal(), []);
  useEffect(() => initSmooth(), []);
  useEffect(() => initTypo(), []);
  const onBook = () => go("kontakt");
  const onType = (id) => { setOpen(id); setTimeout(() => go("byty"), 10); };
  return (
    <>
      <a className="skip" href="#byty">Přeskočit na byty</a>
      <Header onBook={() => onBook()} />
      <main>
        <Hero onType={onType} />
        <Intro onVideo={() => setVideo(true)} />
        <Byty open={open} setOpen={setOpen} onBook={onBook} onPlan={setPlan} />
        <Cards onBook={() => onBook()} />
        <Okoli />
        <Postup />
        <Faq />
        <Kontakt />
      </main>
      <Footer />
      {plan && <Modal title={"Půdorys " + plan} onClose={() => setPlan(null)}><div className="plan-ph">[Půdorys {plan} od klienta]</div></Modal>}
      {video && <Modal title="Prohlídka domu" onClose={() => setVideo(false)}><video className="mvid" src="video/hero.mp4" controls autoPlay muted playsInline /></Modal>}
    </>
  );
}
