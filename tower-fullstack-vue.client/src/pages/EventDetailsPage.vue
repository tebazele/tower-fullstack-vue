<template>
    <div class="container-fluid pos-rel">
        <section class="row justify-content-center" v-if="activeEvent.id">
            <div class="col-12 details-bg my-3" :class="{ 'details-bg-image': activeEvent }"></div>
        </section>
        <div class="border-blue p-4 my-2 pos-abs" :class="{ cancelled: activeEvent.isCanceled }">
            <section class="row justify-content-between">

                <img v-if="!activeEvent.isCanceled" :src="activeEvent.coverImg"
                    class="col-4 p-0 ms-4 cover-img border-blue" />

                <div v-else class="col-4 ms-4 p-5 cancel-img overlay-pink">
                    <h1 class="text-center mt-5 caveat-font fs-xl">CANCELLED</h1>
                </div>
                <div class="col-7 text-light">
                    <section class="row">
                        <!-- FIXME only owner can cancel event, also work on colors-->
                        <div v-if="account.id == activeEvent.creatorId && !activeEvent.isCanceled"
                            class="col-12 text-end">
                            <button data-bs-toggle="offcanvas" data-bs-target="#editEvent" aria-controls="editEvent"
                                class="btn btn-success bg-success me-3">Update
                                Event</button>
                            <button @click="cancelEvent" class="btn btn-secondary bg-info m-3">Cancel Event</button>
                        </div>
                    </section>
                    <section class="row justify-content-between">
                        <div class="col-6">
                            <h3>{{ activeEvent.name }}</h3>
                        </div>
                        <!-- FIXME day event starts -->
                        <div class="col-4">
                            <h3 class="text-end me-3">{{ new Date(activeEvent.startDate).toLocaleDateString() }}
                            </h3>
                        </div>
                    </section>
                    <section class="row justify-content-between">
                        <div class="col-4">
                            <h6>{{ activeEvent.location }}</h6>
                        </div>
                        <!-- FIXME time event starts -->
                        <div class="col-4">
                            <h6 class="text-end me-3">{{ new Date(activeEvent.startDate).toLocaleTimeString('en-US')
                            }}</h6>
                        </div>
                    </section>
                    <section class="row">
                        <div class="col-12 mb-3">
                            <p class="truncate-text">{{ activeEvent.description }}</p>
                        </div>
                    </section>
                    <section class="row justify-content-between align-items-end">
                        <div v-if="!activeEvent.isCanceled && activeEvent.capacity > 0" class="col-5">
                            {{ activeEvent.capacity }} Spots Left
                        </div>
                        <div v-else-if="!activeEvent.isCanceled && activeEvent.capacity == 0" class="col-5">
                            Event Sold Out
                        </div>
                        <div v-else class="col-5">

                        </div>
                        <div v-if="!activeEvent.isCanceled && activeEvent.capacity > 0" class="col-3 text-end">
                            <div v-if="account.id">
                                <button v-if="!findMe" @click="createTicket"
                                    class="btn btn-warning bg-warning me-3">Attend
                                    Event</button>
                                <button v-else @click="removeTicket(findMe.id)" class="btn btn-danger me-3">Skip
                                    Event</button>
                            </div>
                            <div v-else title="Please log in to attend">
                                <button v-if="!findMe" @click="createTicket" class="btn btn-warning bg-warning me-3"
                                    disabled>Attend
                                    Event</button>
                                <button v-else @click="removeTicket(findMe.id)" class="btn btn-danger me-3">Skip
                                    Event</button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
        <section class="row">
            <div class="col-12">
                <p class="text-light">See Who's Attending:</p>
            </div>
            <!-- TODO get attendees and add here -->
            <div v-if="!tickets[0] && !activeEvent.isCanceled" class="col-12 bg-dark">
                <h3 class="text-light mt-1">Be the first to get a ticket!<i class="mdi mdi-arrow-up-bold"></i></h3>
            </div>
            <div v-else-if="tickets && !activeEvent.isCanceled" class="col-12 bg-dark">
                <section class="d-flex">
                    <div v-for="t in tickets" :key="t.id">
                        <img class="img-fluid rounded-circle tiny-img m-1" :src="t.profile.picture"
                            :title='t.profile.name' />
                    </div>
                </section>
            </div>
            <div v-else class="col-12 bg-dark">
                <h2 class="text-light mt-1 caveat-font">This event has been canceled</h2>
            </div>
        </section>
        <!-- SECTION Comments  -->
        <section class="row justify-content-center">
            <div class="col-9">
                <section class="row">
                    <div class="col-12 pt-5">
                        <p class="text-light">What are people saying</p>
                    </div>
                    <!-- FIXME comment out min-height once component exists -->
                    <div class="col-12 bg-dark mb-5">
                        <section class="row">
                            <div class="col-12 text-end">
                                <p class="m-4 text-success">Join the Conversation</p>
                            </div>
                            <!-- SECTION post comment -->

                            <div class="col-12 p-4">
                                <CommentForm />

                            </div>
                        </section>
                        <section class="row">
                            <div class="col-12 mb-5" v-for="c in comments" :key="c.id">
                                <Comments :comment="c" />
                                <!-- a comment {{ c }} -->
                            </div>
                        </section>

                    </div>
                </section>
            </div>
        </section>
    </div>

    <!-- offcanvas for editing events -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="editEvent" aria-labelledby="editEventLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="editEventLabel">Edit Your Event</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="updateEvent">
                <label for="eventName">Event Name</label>
                <input v-model="editable.name" type="text" id="eventName" maxlength="30" required />
                <label for="eventImg">Cover Image</label>
                <input v-model="editable.coverImg" type="url" id="eventImg" required />
                <label for="eventDesc">Description</label>
                <input v-model="editable.description" type="text" id="eventDesc" required />
                <label for="eventLocation">Location</label>
                <input v-model="editable.location" type="text" id="eventLocation" required />
                <label for="eventCapacity">Capacity</label>
                <input v-model="editable.capacity" type="number" id="eventCapacity" required />
                <label for="eventDate">Start Date</label>
                <input v-model="editable.startDate" id="eventDate" type="datetime-local" />
                <select v-model="editable.type" class="form-select mt-3" id="eventType" aria-label="Type of Event"
                    required>
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="digital">Digital Event</option>
                    <option value="exhibit">Exhibit</option>
                    <option value="expo">Expo</option>
                    <option value="sport">Sport</option>
                    <option value="other">Other</option>
                </select>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary mt-3">Update Event</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { Offcanvas } from 'bootstrap';
import Comments from '../components/Comments.vue';
import { commentsService } from '../services/CommentsService.js'
import CommentForm from '../components/CommentForm.vue';
export default {
    setup() {
        const route = useRoute();
        const editable = ref({});
        // const commentReq = ref({})
        watchEffect(() => {
            if (AppState.activeEvent.id) {
                editable.value = { ...AppState.activeEvent };
            }
            if (AppState.activeEvent.isCanceled) {
                logger.log('this event is canceled')
            }
        });
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                logger.log(error);
                Pop.error(error);
            }
        }
        async function getTicketsByEventId() {
            try {
                await ticketsService.getTicketsByEventId(route.params.eventId);
            }
            catch (error) {
                logger.log(error);
                Pop.error(error);
            }
        }

        async function getComments() {
            try {
                await commentsService.getComments(route.params.eventId)
                logger.log(route.params.eventId)
            } catch (error) {
                logger.log(error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getEventById();
            getTicketsByEventId();
            getComments();
        });
        return {
            editable,
            route,
            account: computed(() => AppState.account),
            activeEvent: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            tickets: computed(() => AppState.tickets),
            coverImg: computed(() => {
                if (AppState.activeEvent) {
                    return `url('${AppState.activeEvent.coverImg}')`;
                }
                else {
                    return `url('https://thiscatdoesnotexist.com')`;
                }
            }),
            findMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
            async createTicket() {
                try {
                    await ticketsService.createTicket({ eventId: route.params.eventId });
                }
                catch (error) {
                    logger.log(error);
                    Pop.error(error);
                }
            },
            async removeTicket(ticketId) {
                try {
                    if (await Pop.confirm("Cancel your ticket?", "You will lose your spot", "That's OK", "info")) {
                        await ticketsService.removeTicket(ticketId);
                    }
                }
                catch (error) {
                    logger.log(error);
                    Pop.error(error);
                }
            },
            async updateEvent() {
                try {
                    await eventsService.updateEvent(route.params.eventId, editable.value);
                    Pop.toast("Event updated");
                    Offcanvas.getOrCreateInstance("#editEvent").hide();
                }
                catch (error) {
                    logger.log(error);
                    Pop.error(error);
                }
            },
            async cancelEvent() {
                try {
                    if (await Pop.confirm("Are you sure you want to cancel this event?", "All tickets will be refunded and attendees notified.")) {
                        await eventsService.cancelEvent(route.params.eventId);
                    }
                }
                catch (error) {
                    logger.log(error);
                    Pop.error(error);
                }
            }
        };
    },
    components: { Comments, CommentForm }
};
</script>


<style lang="scss" scoped>
.details-bg {
    // background-image: v-bind(coverImg);
    height: 360px;

}

.details-bg-image {
    background-image: v-bind(coverImg);
    filter: blur(5px);
    background-position: bottom;
    background-size: cover;
    // border: 1px solid rgb(0, 200, 255);
}

.min-height {
    min-height: 80vh;
}

.pos-rel {
    position: relative;
}

.pos-abs {
    position: absolute;
    top: 6px;
    left: 0;
    background-color: #56c7fb73;
    height: 362px;
    width: 100%;
    // border: 1px solid rgb(0, 200, 255);
}

.cancelled {
    position: absolute;
    background-image: url('../assets/img/cancelled.png');
    background-position: right -140px bottom -20px;
    top: 6px;
    left: 0;
    background-color: rgba(255, 0, 51, 0.25);
    height: 362px;
    width: 100%;
}

.border-blue {
    border: 1px solid rgb(0, 200, 255);
}

.tiny-img {
    width: 7vh;
    height: 7vh;
    border: 1px solid #757e9f;
}

.cover-img {
    position: relative;
    height: 312px;
    max-width: 28vw;
    object-fit: cover;
    object-position: center;
}

.cancel-img {
    position: relative;
    height: 312px;
    max-width: 28vw;
    color: whitesmoke;
}

.fs-xl {
    font-size: 62px;
}

input {
    width: 100%
}

.truncate-text {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 100px;
}

.overlay-pink {
    background-color: #ff003340;
    border-top: 1px solid rgb(255, 0, 51);
    border-bottom: 1px solid rgb(255, 0, 51);
}
</style>