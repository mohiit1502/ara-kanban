import React, { useContext } from "react"
import "./KaModal.component.scss"
import { KaContext } from "src/contexts/KaContext"

const KaModal = (): JSX.Element | null => {
  const { modal, setModal } = useContext(KaContext);
  if (!modal.open) return null;
  const handleClose = () => setModal({ open: false });
  return (
    <div className="c-KaModal__overlay" onClick={handleClose}>
      <div className="c-KaModal" onClick={e => e.stopPropagation()}>
        <button className="c-KaModal__close" onClick={handleClose} aria-label="Close">×</button>
        {modal.title && <div className="c-KaModal__title mb-3 fw-bold">{modal.title}</div>}
        {modal.body}
      </div>
    </div>
  );
}

export default KaModal
