import React, { useState, useEffect } from "react"
import { KaContext, KaTheme } from "./KaContext"

interface KaProviderProps {
	children: React.ReactNode
}

export const KaProvider: React.FC<KaProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<KaTheme>("ka-dark")
	const [currentBoard, setCurrentBoard] = useState<Board>()
	const [modal, setModalState] = useState<{ open: boolean; body?: React.ReactNode; title?: string;[key: string]: any }>({ open: false })

	useEffect(() => {
		document.documentElement.setAttribute("ar-theme", theme)
	}, [theme])

	// setModal merges new props into modal state
	const setModal = (modalProps: Partial<typeof modal>) => {
		setModalState(prev => ({ ...prev, ...modalProps }))
	}

	return (
		<KaContext.Provider value={{ theme, setTheme, currentBoard, setCurrentBoard, modal, setModal }}>
			{children}
		</KaContext.Provider>
	)
}
