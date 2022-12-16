import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:id', this.removeComment)
    }

    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const newComment = await commentsService.createComment(req.body)
            return res.send(newComment)
        } catch (error) {
            next(error)
        }
    }

    async removeComment(req, res, next) {
        try {
            const message = await commentsService.remove(req.userInfo.id, req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}