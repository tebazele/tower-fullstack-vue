import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
    async getComments(eventId) {
        const res = await api.get('/api/events/' + eventId + '/comments')
        logger.log('got comments by event Id', res.data)
        AppState.comments = res.data
    }

    async createComment(body) {
        const res = await api.post('/api/comments', body)
        logger.log('new comment', res.data)
        AppState.comments.push(res.data)
    }

    async removeComment(commentId) {
        const res = await api.delete('/api/comments/' + commentId)
        logger.log(res.data)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }
}

export const commentsService = new CommentsService()