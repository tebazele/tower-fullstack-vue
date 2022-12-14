import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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

    async getEventAttendees(eventId) {
        let tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets
    }

    async removeTicket(userId, ticketId) {
        const foundTicket = await dbContext.Tickets.findById(ticketId)
        if (!foundTicket) throw new BadRequest(`no ticket at id: ${ticketId}`)
        // @ts-ignore
        if (foundTicket.accountId.toString() != userId) throw new Forbidden(`Cannot delete tickets for someone else`)

        const event = await eventsService.getEventById(foundTicket.eventId)
        if (event.isCanceled) throw new Forbidden('This event is canceled. All tickets will be refunded.')

        await foundTicket.remove()
        // @ts-ignore
        event.capacity += 1
        await event.save()

        return `You are no longer attending ${event.name}`

    }

}

export const ticketsService = new TicketsService()