import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class CommentsService {
  async getAllComments(id) {
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.comments[id] = res.data
  }

  async createComment(data) {
    await api.post('api/comments', data)
  }

  async deleteComment(id) {
    await api.delete('api/comments/' + id)
  }
}

export const commentsService = new CommentsService()
