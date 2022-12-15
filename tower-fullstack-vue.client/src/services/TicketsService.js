import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class TicketsService {
    async createTicket(body) {
        const res = await api.post('api/tickets', body)
        logger.log(res.data)
        AppState.tickets.push(res.data)
        AppState.myTickets.push(res.data)
        AppState.activeEvent.capacity--

    }

    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log(res.data)
        AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
        AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
    }

    async getTicketsByEventId(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('got tickets for this event', res.data)
        AppState.tickets = res.data
    }

    async getMyTicketEvents() {
        const res = await api.get('account/tickets')
        logger.log('got my tickets to events', res.data)
        AppState.myTickets = res.data
    }
}

export const ticketsService = new TicketsService()