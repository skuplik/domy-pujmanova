import { useEffect, useRef, useState } from "react";
import { HOME, NEAR } from "../data/content";

const STYLE = "https://tiles.openfreemap.org/styles/positron";
const FIT = { padding: { top: 110, bottom: 60, left: 70, right: 100 }, maxZoom: 15 };
const LOCALE = {
  "CooperativeGesturesHandler.WindowsHelpText": "Mapu přiblížíte kolečkem se stisknutým Ctrl",
  "CooperativeGesturesHandler.MacHelpText": "Mapu přiblížíte kolečkem se stisknutým ⌘",
  "CooperativeGesturesHandler.MobileHelpText": "Mapou posunete dvěma prsty",
};
const C = { bg: "#F6F8F2", water: "#DCE7D3", park: "#E7EFDD", build: "#ECEFE6", road: "#FFFFFF", casing: "#E2E6DB", text: "#7C8275", halo: "#FFFFFF" };

function tint(map) {
  for (const l of map.getStyle().layers) {
    const id = l.id.toLowerCase();
    const set = (k, v) => { try { map.setPaintProperty(l.id, k, v); } catch (e) {} };
    if (l.type === "background") set("background-color", C.bg);
    else if (l.type === "fill") {
      if (/water/.test(id)) set("fill-color", C.water);
      else if (/park|wood|grass|forest|cemetery|pitch/.test(id)) set("fill-color", C.park);
      else if (/building/.test(id)) set("fill-color", C.build);
      else set("fill-color", C.bg);
      set("fill-outline-color", "rgba(0,0,0,0)");
    } else if (l.type === "line") {
      if (/water|river|stream/.test(id)) set("line-color", C.water);
      else if (/casing|outline/.test(id)) set("line-color", C.casing);
      else if (/rail/.test(id)) set("line-color", "#D5DBCC");
      else if (/boundary|admin/.test(id)) set("line-opacity", 0);
      else set("line-color", C.road);
    } else if (l.type === "symbol") {
      set("text-color", C.text); set("text-halo-color", C.halo);
      if (/poi|shield|airport/.test(id)) try { map.setLayoutProperty(l.id, "visibility", "none"); } catch (e) {}
    }
  }
}

export default function MapReal({ active, setActive, focusRef }) {
  const box = useRef(null);
  const map = useRef(null);
  const marks = useRef([]);
  const bounds = useRef(null);
  const homeEl = useRef(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let dead = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setState("loading");
      const [{ default: maplibregl }] = await Promise.all([import("maplibre-gl"), import("maplibre-gl/dist/maplibre-gl.css")]);
      if (dead) return;
      const m = new maplibregl.Map({
        container: el, style: STYLE, center: [HOME.lng, HOME.lat], zoom: 13.4,
        attributionControl: false, cooperativeGestures: true, locale: LOCALE, dragRotate: false, pitchWithRotate: false,
      });
      m.touchZoomRotate.disableRotation();
      map.current = m;
      m.on("error", () => { if (!m.isStyleLoaded()) setState("error"); });
      m.on("load", () => {
        tint(m);
        const pts = NEAR.filter((n) => Array.isArray(n[3]));
        const b = new maplibregl.LngLatBounds([HOME.lng, HOME.lat], [HOME.lng, HOME.lat]);
        pts.forEach((n) => b.extend(n[3]));
        bounds.current = b;
        m.fitBounds(b, { ...FIT, duration: 0 });

        const h = document.createElement("div");
        h.className = "mk mk-home";
        h.innerHTML = '<span class="mk-pulse"></span><span class="mk-sq"></span><span class="mk-tip mk-tip-on"><b>' + HOME.name + "</b><span>" + HOME.addr + "</span></span>";
        new maplibregl.Marker({ element: h, anchor: "center" }).setLngLat([HOME.lng, HOME.lat]).addTo(m);
        homeEl.current = h;

        marks.current = NEAR.map((n, i) => {
          if (!Array.isArray(n[3])) return null;
          const d = document.createElement("button");
          d.type = "button";
          d.className = "mk mk-poi";
          d.setAttribute("aria-label", n[1] + ", " + n[2]);
          d.innerHTML = '<span class="mk-dot"></span><span class="mk-tip"><small>' + n[0] + "</small><b>" + n[1] + "</b><span>" + n[2] + "</span></span>";
          d.addEventListener("mouseenter", () => setActive(i));
          d.addEventListener("mouseleave", () => setActive(-1));
          d.addEventListener("focus", () => setActive(i));
          d.addEventListener("blur", () => setActive(-1));
          d.addEventListener("click", (ev) => { ev.stopPropagation(); setActive((a) => (a === i ? -1 : i)); });
          new maplibregl.Marker({ element: d, anchor: "center" }).setLngLat(n[3]).addTo(m);
          return d;
        });
        m.on("click", () => setActive(-1));
        setState("ready");
      });
    }, { rootMargin: "400px 0px" });
    io.observe(el);
    return () => { dead = true; io.disconnect(); map.current && map.current.remove(); };
  }, [setActive]);

useEffect(() => {
    if (!focusRef) return;
    focusRef.current = (i) => {
      const m = map.current, ll = NEAR[i] && NEAR[i][3];
      if (!m || !ll) return;
      if (ll === "home") { m.flyTo({ center: [HOME.lng, HOME.lat], zoom: 16, speed: 0.9, essential: true }); return; }
      m.fitBounds([[Math.min(ll[0], HOME.lng), Math.min(ll[1], HOME.lat)], [Math.max(ll[0], HOME.lng), Math.max(ll[1], HOME.lat)]],
        { padding: { top: 120, bottom: 80, left: 110, right: 110 }, maxZoom: 16, speed: 0.9, essential: true });
    };
  }, [focusRef]);

useEffect(() => {
    marks.current.forEach((d, i) => d && d.classList.toggle("on", i === active));
    if (homeEl.current) {
      homeEl.current.classList.toggle("on", !!NEAR[active] && NEAR[active][3] === "home");
      homeEl.current.classList.toggle("dim", !!NEAR[active] && NEAR[active][3] !== "home");
    }
  }, [active, state]);

  return (
    <div className={"mapr mapr-" + state}>
      <div ref={box} data-lenis-prevent className="mapr-c" role="region" aria-label="Mapa okolí domu Marie Pujmanové 683, Prostějov" />
      <div className="mapr-ctl" role="group" aria-label="Ovládání mapy">
        <button type="button" aria-label="Přiblížit" onClick={() => map.current && map.current.zoomIn()}><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12" /></svg></button>
        <button type="button" aria-label="Oddálit" onClick={() => map.current && map.current.zoomOut()}><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 7h12" /></svg></button>
        <button type="button" aria-label="Zpět na celé okolí" onClick={() => map.current && bounds.current && map.current.fitBounds(bounds.current, FIT)}><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" /></svg></button>
      </div>
      <p className="mapr-attr">
        <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> · <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">© OpenMapTiles</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a>
      </p>
      {state === "error" && <p className="mapr-err small mut">Mapu se nepodařilo načíst. <a href="https://maps.google.com/?q=Marie+Pujmanov%C3%A9+683+Prost%C4%9Bjov" target="_blank" rel="noopener">Otevřít v Mapách</a></p>}
    </div>
  );
}
