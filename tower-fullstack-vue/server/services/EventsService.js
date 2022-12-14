import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

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

}

export const eventsService = new EventsService()