// Backend API route constants
export const API_BASE_URL = "http://localhost:5000"

export const API_ROUTES = {
  BOARDS: `${API_BASE_URL}/boards/:userId`,
  BOARD: `${API_BASE_URL}/boards/:userId/:boardId`,
  TASKS: `${API_BASE_URL}/tasks/:boardId`,
  TASK: `${API_BASE_URL}/tasks/:boardId/:taskId`,
  TASKLISTS: `${API_BASE_URL}/task-lists`,
  TASKLIST: `${API_BASE_URL}/task-lists/:taskId`,
  USERS: `${API_BASE_URL}/users`,
  USER: `${API_BASE_URL}/users/:id`,
}
