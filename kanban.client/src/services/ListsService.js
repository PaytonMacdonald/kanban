import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class ListsService {
  async getAllLists(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
  }
}

export const listsService = new ListsService()
