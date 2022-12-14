import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
    async createTicket(body) {
        const foundEvent = await eventsService.getEventById(body.eventId)
        if (foundEvent.isCanceled) throw new Forbidden('Sorry, this event is canceled. Please purchase a ticket for another event')
        const newTicket = await dbContext.Tickets.create(body)
        await newTicket.populate('profile event')
        // @ts-ignore
        foundEvent.capacity -= 1
        await foundEvent.save()
        await newTicket.populate('profile event')
        return newTicket
    }

    async getMyEvents(accountId) {
        const myTicketsArray = await dbContext.Tickets.find({ accountId }).populate('event')
        return myTicketsArray
    }

}

export const ticketsService = new TicketsService()