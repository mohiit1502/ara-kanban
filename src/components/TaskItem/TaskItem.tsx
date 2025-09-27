import "./TaskItem.component.scss"

interface TaskItemProps {
  task: Task
}

const TaskItem = (props: TaskItemProps): JSX.Element => {
  const { task } = props;
  return <div key={task.id} className="c-TaskItem p-3 mb-3">
    <h5 className="task-title">{task.title}</h5>
    {task.description && <p className="task-description subtitle mb-1">{task.description}</p>}
  </div>
}

export default TaskItem
