<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create an Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="createEvent">
                <label for="eventName" type="text">Event Name</label>
                <input v-model="formData.name" id="eventName" />
                <label for="eventName" type="url">Cover Image</label>
                <input v-model="formData.coverImg" id="eventName" />
                <label for="eventName" type="text">Description</label>
                <input v-model="formData.description" id="eventName" />
                <label for="eventName" type="text">Location</label>
                <input v-model="formData.location" id="eventName" />
                <label for="eventName" type="number">Capacity</label>
                <input v-model="formData.capacity" id="eventName" />
                <label for="eventName" type="date">Start Date</label>
                <input v-model="formData.startDate" id="eventName" />
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
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { Modal } from 'bootstrap';
export default {
    setup() {
        const formData = ref({})

        return {
            formData,
            async createEvent() {
                try {
                    const event = await eventsService.createEvent(formData.value)
                    Pop.toast('Event created', 'success')
                    formData.value = {}
                    Modal.getOrCreateInstance('#createEvent').hide()
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