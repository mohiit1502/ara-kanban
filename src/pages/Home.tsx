

import React from "react"
import { KaDrawer, KaHeader, KaMain, KaModal } from "@components"

const Home: React.FC = () => {
  return (
    <div className="c-Home d-flex" style={{ height: '100vh' }}>
      <KaDrawer />
      <div className="c-Home__main d-flex flex-column flex-grow-1">
        <KaHeader />
        <KaMain />
      </div>
      <KaModal />
    </div>
  )
}

export default Home