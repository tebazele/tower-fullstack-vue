import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
class EventsService {
    async getEvents() {
        const res = await api.get('/api/events')
        logger.log('got events', res.data)
        AppState.events = res.data
    }

    async getEventById(eventId) {
        const res = await api.get(`/api/events/${eventId}`)
        logger.log(res.data)
        AppState.activeEvent = res.data

    }

    async createEvent(data) {
        const res = await api.post('/api/events', data)
        logger.log(res.data)
        AppState.events.unshift(res.data)
        return res.data
    }
}

export const eventsService = new EventsService()