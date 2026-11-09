const NB = " ";
const SHORT = /(?<=^|[\s(„"'–—/])([ksvzouaiKSVZOUAI])[ \t\n]+(?=\S)/g;
const THOUSANDS = /(\d) (?=\d{3}(?!\d))/g;
const NUM = /(\d)[ \t]+(?=(Kč|m²|m2|km|m|min|h|%|NP|osob|os\.|noc|kW|MW)(?!\p{L}))/gu;
const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);

export const fixText = (t) => t.replace(SHORT, "$1" + NB).replace(THOUSANDS, "$1" + NB).replace(NUM, "$1" + NB);

const fixNode = (node) => {
  if (node.nodeType === 3) {
    const p = node.parentNode;
    if (!p || SKIP.has(p.nodeName)) return;
    const v = node.nodeValue;
    if (!v || !/[ \t\n]/.test(v)) return;
    const f = fixText(v);
    if (f !== v) node.nodeValue = f;
    return;
  }
  if (node.nodeType !== 1 || SKIP.has(node.nodeName)) return;
  const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) fixNode(n);
};

export function initTypo(root = document.body) {
  fixNode(root);
  const mo = new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === "characterData") fixNode(m.target);
      else m.addedNodes.forEach(fixNode);
    }
  });
  mo.observe(root, { childList: true, subtree: true, characterData: true });
  return () => mo.disconnect();
}
