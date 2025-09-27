import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { KaProvider } from "./contexts/KaProvider"
import { store } from "./store"
import Router from "./Router"
import "bootstrap/dist/css/bootstrap.min.css"
import "./static/styles/global.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <KaProvider>
          <Router />
        </KaProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
