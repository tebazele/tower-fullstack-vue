import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:id', this.removeTicket)
    }

    async createTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const newTicket = await ticketsService.createTicket(req.body)
            return res.send(newTicket)
        } catch (error) {
            next(error)
        }
    }

    async removeTicket(req, res, next) {
        try {
            const message = await ticketsService.removeTicket(req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}