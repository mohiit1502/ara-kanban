interface Board {
  id: number
  userId: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

interface Task {
  id: number
  boardId: number
  title: string
  description?: string
  status: "todo" | "in-progress" | "done"
  createdAt: string
  updatedAt: string
}

interface TaskGroup {
  groupId: string
  tasks: Task[]
}
