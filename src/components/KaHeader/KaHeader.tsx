import React, { useContext } from "react"
import { KaContext } from "src/contexts/KaContext";
import AddTaskForm from "@components/AddTaskForm";
import "./KaHeader.component.scss"


interface KaHeaderProps {
  onMenuClick?: () => void;
  menuOpen?: boolean;
  statusOptions: StatusOption[];
}

const KaHeader = (props: KaHeaderProps): JSX.Element => {
  const { currentBoard, setModal } = useContext(KaContext);
  const { onMenuClick, menuOpen, statusOptions } = props;
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <header className="c-KaHeader d-flex justify-content-between align-items-center px-3 py-4 mw-100">
      {onMenuClick && (
        <button className="menuBtn me-3 p-2" onClick={onMenuClick} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </button>
      )}
      <span className="boardTitle">{currentBoard?.name || "Select a board"}</span>
      <button className="addTaskBtn py-2 px-3 cursor-pointer" onClick={() => setModal({
        open: true,
        title: "Add New Task",
        body: <AddTaskForm statusOptions={statusOptions} />,
      })}>+{isMobile ? "" : " Add New Task"}</button>
    </header>
  );
}

export default KaHeader
