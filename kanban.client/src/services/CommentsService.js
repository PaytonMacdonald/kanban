import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class CommentsService {
  async getAllComments(id) {
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.comments = res.data // implement dictionary instead (or push)
  }
}

export const commentsService = new CommentsService()
