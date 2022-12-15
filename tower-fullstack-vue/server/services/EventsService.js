import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator').sort({ startDate: 1 })
        return events
    }
    async getEventById(eventId) {
        const event = await (await dbContext.Events.findById(eventId)).populate('creator')
        if (!event) throw new BadRequest(`no event with id: ${eventId}`)
        return event
    }
    async createEvent(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator')
        return event
    }

    async editEvent(userId, eventId, body) {
        const originalEvent = await dbContext.Events.findById(eventId)
        if (!originalEvent) throw new BadRequest(`no event at id: ${eventId}`)
        if (originalEvent.creatorId != userId) throw new Forbidden('Not allowed to edit events you did not create')
        if (originalEvent.isCanceled) throw new BadRequest('This event is already canceled')

        originalEvent.name = body.name ? body.name : originalEvent.name
        originalEvent.description = body.description ? body.description : originalEvent.description
        originalEvent.coverImg = body.coverImg ? body.coverImg : originalEvent.coverImg
        originalEvent.location = body.location ? body.location : originalEvent.location
        originalEvent.capacity = body.capacity ? body.capacity : originalEvent.capacity
        originalEvent.startDate = body.startDate ? body.startDate : originalEvent.startDate
        originalEvent.type = body.type ? body.type : originalEvent.type

        const savedEvent = await originalEvent.save()
        const populatedEvent = await savedEvent.populate('creator')

        return populatedEvent
    }

    async archiveEvent(userId, eventId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden('You are not the creator of this event. Only the creator can cancel this event')

        event.isCanceled = !event.isCanceled
        await event.save()

        return event
    }

}

export const eventsService = new EventsService()