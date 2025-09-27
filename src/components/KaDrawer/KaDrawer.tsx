import { useContext, useEffect, useRef, useState } from "react"
import { API_ROUTES } from "@config/constants"
import { Network } from "@utils"
import { KaTheme } from "@config/enums"
import { KaContext } from "src/contexts/KaContext"
import "./KaDrawer.component.scss"

const USER_ID = 1

const KaDrawer = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [boards, setBoards] = useState<any[]>([])
  const [newBoardTitle, setNewBoardTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [initBoardAdd, setInitBoardAdd] = useState(false)
  const { theme, setTheme, currentBoard, setCurrentBoard } = useContext(KaContext)
  const createBoardTextRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Network.get(API_ROUTES.BOARDS.replace(":userId", String(USER_ID)), {
      headers: { Authorization: "Bearer testtoken" },
    })
      .then((data) => {
        setBoards(data.boards || [])
        setCurrentBoard(data.boards?.[0])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    createBoardTextRef.current?.focus()
  }, [initBoardAdd])

  const createBoard = () => {
    if (!newBoardTitle.trim()) {
      alert("Board title cannot be empty");
      return;
    }
    Network.post(API_ROUTES.BOARDS.replace(":userId", String(USER_ID)), {
      name: newBoardTitle.trim(),
    }, {
      headers: { Authorization: "Bearer testtoken" },
    })
      .then((data) => {
        setBoards((prevBoards) => [...prevBoards, data.board]);
        setNewBoardTitle("");
        setInitBoardAdd(false);
      })
      .catch((err) => {
        alert("Error creating board: " + err.message);
      });
  }

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
            <input ref={createBoardTextRef} onChange={e => setNewBoardTitle(e.target.value)} onBlur={() => setInitBoardAdd(false)} className="c-KaDrawer__add-board-text me-3" />
            <button className="c-KaDrawer__add-board-button" onMouseDown={createBoard}>Create</button>
          </div> : <li className="c-KaDrawer__board cursor-pointer create ps-5 py-2" onClick={() => setInitBoardAdd(true)}>+ Create New Board</li>}
        </div>
      </ul>
    </div>
    <div className="c-KaDrawer__sidebar-footer mt-auto">
      <button className="c-KaDrawer__theme-toggle btn btn-outline-secondary" aria-label="Toggle theme" onClick={() => setTheme(theme === KaTheme.DARK ? KaTheme.LIGHT : KaTheme.DARK)} />
    </div>
  </aside>
}

export default KaDrawer
