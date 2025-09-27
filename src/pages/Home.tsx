

import React from "react";
import { API_ROUTES } from "@config/constants";
import { Network } from "@utils";
import { KaContext } from "src/contexts/KaContext";
import { KaDrawer, KaHeader, KaMain, KaModal } from "@components";


const USER_ID = 1;

const Home: React.FC = () => {
  const { mobileDrawerOpen, setMobileDrawerOpen, setCurrentBoard } = React.useContext(KaContext);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [boards, setBoards] = React.useState<any[]>([]);
  const [currentBoard, setCurrentBoardLocal] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    Network.get(API_ROUTES.BOARDS.replace(":userId", String(USER_ID)), {
      headers: { Authorization: "Bearer testtoken" },
    })
      .then((data) => {
        setBoards(data.boards || []);
        setCurrentBoardLocal(data.boards?.[0] || null);
        setCurrentBoard(data.boards?.[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setCurrentBoard]);

  // Example: statusOptions from currentBoard
  const statusOptions: StatusOption[] = currentBoard?.statuses?.map((s: any) => ({ value: s.value, label: s.label })) || [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const handleCreateBoard = async (title: string) => {
    if (!title.trim()) return;
    try {
      const res = await Network.post(API_ROUTES.BOARDS.replace(":userId", String(USER_ID)), { name: title.trim() }, {
        headers: { Authorization: "Bearer testtoken" },
      });
      setBoards(prev => [...prev, res.board]);
      setCurrentBoardLocal(res.board);
      setCurrentBoard(res.board);
    } catch (err) {
      alert("Error creating board: " + ((err as any).message || err));
    }
  }

  return (
    <div className="c-Home d-flex mw-100" style={{ height: '100vh', overflowY: 'hidden' }}>
      {(!isMobile || mobileDrawerOpen) && <KaDrawer
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoardLocal}
        loading={loading}
        error={error}
        createBoard={handleCreateBoard}
      />}
      <div className="c-Home__main d-flex flex-column flex-grow-1 mw-100">
        <KaHeader
          onMenuClick={isMobile ? () => setMobileDrawerOpen(!mobileDrawerOpen) : undefined}
          menuOpen={mobileDrawerOpen}
          statusOptions={statusOptions}
        />
        <KaMain />
      </div>
      <KaModal />
    </div>
  );
};

export default Home;