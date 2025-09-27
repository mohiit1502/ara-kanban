import { useContext, useEffect, useState } from 'react';
import { KaContext } from 'src/contexts/KaContext';
import { API_ROUTES } from '@config/constants';
import { Helper, Network } from '@utils';
import TaskList from '@components/TaskList';
import "./KaMain.component.scss"

const KaMain = (): JSX.Element => {
  const { currentBoard } = useContext(KaContext);
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentBoard) {
      setLoading(true);
      Network.get(API_ROUTES.TASKS.replace(":boardId", String(currentBoard?.id)))
        .then((data) => {
          setTaskGroups(Helper.groupBy(data.tasks || [], "status"));
        })
        .finally(() => setLoading(false));
    }
  }, [currentBoard]);

  return <main className="c-KaMain d-flex p-3 flex-grow-1">
    {taskGroups?.map(taskGroup => <TaskList taskGroup={taskGroup} />)}
    {/* Add a task list to add new list */}
    <TaskList type="add-new" taskGroup={{ groupId: "Add New List", tasks: [] }} />
  </main>
}

export default KaMain
