import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class TasksService {
  async getAllTasks(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks = res.data // implement dictionary instead (or push)
  }
}

export const tasksService = new TasksService()
