import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class ListsService {
  async getAllLists(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
  }

  async createList(data) {
    await api.post('api/lists', data)
  }

  async deleteList(id) {
    await api.delete('api/lists/' + id)
  }
}

export const listsService = new ListsService()
