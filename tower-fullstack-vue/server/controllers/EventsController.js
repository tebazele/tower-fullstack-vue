import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
    constructor() {
        super('/api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:id', this.getEventById)
            .get('/:id/tickets', this.getEventAttendees)
            .get('/:id/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:id', this.editEvent)
            .delete('/:id', this.archiveEvent)
    }

    async getAllEvents(req, res, next) {
        try {
            const events = await eventsService.getAllEvents()
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventsService.getEventById(req.params.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(req.body)
            res.send(event)
        } catch (error) {
            next(error)
        }

    }

    async editEvent(req, res, next) {
        try {
            const updated = await eventsService.editEvent(req.userInfo.id, req.params.id, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }

    async archiveEvent(req, res, next) {
        try {
            const archivedEvent = await eventsService.archiveEvent(req.userInfo.id, req.params.id)
            return res.send(archivedEvent)
        } catch (error) {
            next(error)
        }
    }

    async getEventAttendees(req, res, next) {
        try {
            const attendees = await ticketsService.getEventAttendees(req.params.id)
            return res.send(attendees)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const comments = await commentsService.getAll({ eventId: req.params.id })
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}