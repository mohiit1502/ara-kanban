import { useContext, useEffect, useRef, useState } from "react"
import { API_ROUTES } from "@config/constants"
import { Network } from "@utils"
import { KaTheme } from "@config/enums"
import { KaContext } from "src/contexts/KaContext"
import "./KaDrawer.component.scss"

const USER_ID = 1

interface KaDrawerProps {
  boards: any[];
  currentBoard: any;
  setCurrentBoard: (board: any) => void;
  loading: boolean;
  error: string | null;
  createBoard: (title: string) => void;
}

const KaDrawer = ({ boards, loading, error, createBoard }: KaDrawerProps): JSX.Element => {
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [initBoardAdd, setInitBoardAdd] = useState(false);
  const { theme, setTheme, currentBoard, setCurrentBoard } = useContext(KaContext);
  const createBoardTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    createBoardTextRef.current?.focus();
  }, [initBoardAdd]);

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) {
      alert("Board title cannot be empty");
      return;
    }
    createBoard(newBoardTitle);
    setNewBoardTitle("");
    setInitBoardAdd(false);
  };

  return <aside className="c-KaDrawer d-flex flex-column">
    <div className="c-KaDrawer__logo d-flex align-items-center p-4">
      <div className="c-KaDrawer__logo-icon d-flex me-3 ms-4">
        <span className="c-KaDrawer__icon c-KaDrawer__icon--bright" />
        <span className="c-KaDrawer__icon c-KaDrawer__icon--mid" />
        <span className="c-KaDrawer__icon c-KaDrawer__icon--dark" />
      </div>
      <div className="c-KaDrawer__logo-label fw-bold">kanban</div>
    </div>
    <div className="c-KaDrawer__boards flex-grow-1 mt-4">
      <div className="c-KaDrawer__boards-title mb-2 ms-4 list-header py-3 px-4">ALL BOARDS ({boards.length})</div>
      <ul className="c-KaDrawer__boards-list list-unstyled">
        <>{
          boards.length ? loading ? (
            <li>Loading...</li>
          ) : error ? (
            <li className="text-danger">{error}</li>
          ) : (
            boards.map((board) => (
              <li
                key={board.id}
                className={`c-KaDrawer__board cursor-pointer fw-bold ps-5 py-2 mb-1${currentBoard?.id === board.id ? " selected me-5" : ""}`}
                onClick={() => setCurrentBoard(board)}>
                {board.name}
              </li>
            ))
          ) : <div>No boards available</div>}
        </>
        <div className="c-KaDrawer__create-board mt-3">
          {initBoardAdd ? <div className="add-board-container d-flex mx-3">
            <input
              ref={createBoardTextRef}
              onChange={e => setNewBoardTitle(e.target.value)}
              onBlur={() => setInitBoardAdd(false)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateBoard();
                }
              }}
              className="c-KaDrawer__add-board-text me-3"
            />
            <button className="c-KaDrawer__add-board-button" onMouseDown={handleCreateBoard}>Create</button>
          </div> : <li className="c-KaDrawer__board cursor-pointer create ps-5 py-2" onClick={() => setInitBoardAdd(true)}>+ Create New Board</li>}
        </div>
      </ul>
    </div>
    <div className="d-flex w-100 px-5">
      <div className="c-KaDrawer__sidebar-footer mt-auto mb-4">
        <div className="c-KaDrawer__theme-toggle-switch">
          <span className={`c-KaDrawer__theme-label${theme === KaTheme.LIGHT ? ' active' : ''}`}>LIGHT</span>
          <button
            className={`c-KaDrawer__theme-toggle-btn${theme === KaTheme.DARK ? ' dark' : ' light'}`}
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === KaTheme.DARK ? KaTheme.LIGHT : KaTheme.DARK)}
          >
            <span className="c-KaDrawer__theme-toggle-knob" />
          </button>
          <span className={`c-KaDrawer__theme-label${theme === KaTheme.DARK ? ' active' : ''}`}>DARK</span>
        </div>
      </div>
    </div>
  </aside>
}

export default KaDrawer
