import React from "react"

export type KaTheme = "ka-dark" | "ka-light"
export interface KaContextType {
	theme: KaTheme
	setTheme: (theme: KaTheme) => void
	currentBoard?: Board
	setCurrentBoard: (board: Board) => void
	modal: {
		open: boolean
		body?: React.ReactNode
		title?: string
		[key: string]: any
	}
	setModal: (modal: Partial<KaContextType['modal']>) => void
}

export const KaContext = React.createContext<KaContextType>({
	theme: "ka-dark",
	setTheme: () => { },
	setCurrentBoard: (board: Board) => { },
	modal: { open: false },
	setModal: () => { }
})
