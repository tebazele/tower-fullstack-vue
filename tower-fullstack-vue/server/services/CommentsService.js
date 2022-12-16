
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
// import { eventsService } from "./EventsService.js"

class CommentsService {
    async createComment(body) {
        // const event = await eventsService.getEventById(body.eventId)
        const newComment = await dbContext.Comments.create(body)
        await newComment.populate('creator')
        return newComment
    }

    async getAll(query) {
        const comments = await dbContext.Comments.find(query).populate('creator')
        return comments
    }

    async remove(userId, commentId) {
        const comment = await dbContext.Comments.findById(commentId).populate('creator')
        if (!comment) throw new BadRequest(`no comment at id: ${commentId}`)
        // @ts-ignore
        if (comment.creatorId.toString() != userId) throw new Forbidden('This comment does not belong to you')

        await comment.remove()
        return `comment has been removed`
    }

}

export const commentsService = new CommentsService()