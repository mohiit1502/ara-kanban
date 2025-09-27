import React from "react"

export type KaTheme = "ka-dark" | "ka-light"
export interface KaContextType {
	theme: KaTheme;
	setTheme: (theme: KaTheme) => void;
	currentBoard?: Board;
	setCurrentBoard: (board: Board) => void;
	modal: KaModalState;
	setModal: (modal: Partial<KaModalState>) => void;
	mobileDrawerOpen: boolean;
	setMobileDrawerOpen: (open: boolean) => void;
}

export const KaContext = React.createContext<KaContextType>({
	theme: "ka-dark",
	setTheme: () => { },
	setCurrentBoard: (board: Board) => { },
	modal: { open: false },
	setModal: () => { },
	mobileDrawerOpen: false,
	setMobileDrawerOpen: () => { }
})
