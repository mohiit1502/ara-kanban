import { TaskItem } from "@components";
import "./TaskList.component.scss"

interface TaskListProps {
  taskGroup: TaskGroup
  type?: "default" | "add-new"
}

const TaskList = (props: TaskListProps): JSX.Element => {
  const { taskGroup, type } = props;
  // Generate a random pastel color for the list-color indicator
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
  return <div className="c-TaskList h-100 mx-2 d-flex flex-column">
    {type === "add-new" ? <div className="c-TaskList__new flex-center h-100 flex-grow-1">
      <span className="add-new-list-btn py-2 px-3 cursor-pointer">+ Add New List</span>
    </div>
      :
      <>
        <span className="list-header"><span className="list-color d-inline-block" style={{ backgroundColor: randomColor }} />{taskGroup.groupId} ({taskGroup.tasks.length})</span>
        {taskGroup.tasks.map(task => <TaskItem key={task.id} task={task} />)}
      </>
    }
  </div>
}

export default TaskList
