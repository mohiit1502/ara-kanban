import React from "react"
import "./KaHeader.component.scss"

interface KaHeaderProps { }

const KaHeader = (props: KaHeaderProps): JSX.Element => {
  return (
    <header className="c-KaHeader d-flex justify-content-between align-items-center px-3 py-4">
      <span className="boardTitle">Platform Launch</span>
      <button className="addTaskBtn py-2 px-3 cursor-pointer">+ Add New Task</button>
    </header>
  );
}

export default KaHeader
