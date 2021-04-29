import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class TasksService {
  async getAllTasks(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks[id] = res.data
  }

  async createTask(data) {
    await api.post('api/tasks', data)
  }

  async deleteTask(id) {
    await api.delete('api/tasks/' + id)
  }

  async moveTask(newId, data) {
    const oldId = data.listId
    data.listId = newId
    await api.put('api/tasks/' + data.id, data)
    this.getAllTasks(oldId)
    this.getAllTasks(data.listId)
  }
}

export const tasksService = new TasksService()
