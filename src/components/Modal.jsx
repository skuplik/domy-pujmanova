import { useEffect } from "react";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="modal" data-lenis-prevent role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top"><p className="h3l">{title}</p><button className="tlink" onClick={onClose}>Zavřít</button></div>
        {children}
      </div>
    </div>
  );
}
