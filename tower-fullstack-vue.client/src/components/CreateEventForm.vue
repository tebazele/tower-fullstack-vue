<template>
    <form @submit.prevent="createEvent">
        <label for="eventName">Event Name</label>
        <input v-model="formData.name" type="text" id="eventName" />
        <label for="eventImg">Cover Image</label>
        <input v-model="formData.coverImg" type="url" id="eventImg" />
        <label for="eventDesc">Description</label>
        <input v-model="formData.description" type="text" id="eventDesc" />
        <label for="eventLocation">Location</label>
        <input v-model="formData.location" type="text" id="eventLocation" />
        <label for="eventCapacity">Capacity</label>
        <input v-model="formData.capacity" type="number" id="eventCapacity" />
        <label for="eventDate">Start Date</label>
        <input v-model="formData.startDate" id="eventDate" type="datetime-local" />
        <select v-model="formData.type" class="form-select mt-3" id="eventType" aria-label="Type of Event">
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="digital">Digital Event</option>
            <option value="exhibit">Exhibit</option>
            <option value="expo">Expo</option>
            <option value="sport">Sport</option>
            <option value="other">Other</option>
        </select>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Event</button>
        </div>

    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, ref, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { eventsService } from '../services/EventsService.js';
import { useRouter } from 'vue-router';
export default {

    setup() {
        const formData = ref({})
        const router = useRouter()
        return {
            formData,
            async createEvent() {
                try {
                    // formData.value.startDate = new Date(formData.value.startDate)
                    const event = await eventsService.createEvent(formData.value)
                    Pop.toast('Event created', 'success')
                    formData.value = {}
                    Modal.getOrCreateInstance('#createEvent').hide()
                    router.push({ name: 'EventDetails', params: { eventId: event.id } })
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            }
        }
    }
};
</script>



<style lang="scss" scoped>
input {
    width: 100%
}
</style>