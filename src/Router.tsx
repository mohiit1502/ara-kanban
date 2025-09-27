import { useContext, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import * as pages from "@pages"
import { KaContext, KaContextType } from "./contexts/KaContext"
import Helper from "./utils/helper"
import ROUTES from "./routes"

Helper.populateComponentsInRoutes(ROUTES, pages)


const Router = (): JSX.Element | null => {
	const { theme } = useContext<KaContextType>(KaContext)
	useEffect(() => {
		document.documentElement.setAttribute('ar-theme', theme);
	}, [theme]);
	return useRoutes(ROUTES)
}

export default Router
