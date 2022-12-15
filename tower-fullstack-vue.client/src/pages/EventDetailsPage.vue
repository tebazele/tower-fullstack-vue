<template>
    <div class="container-fluid pos-rel">
        <section class="row justify-content-center" v-if="activeEvent.id">
            <div class="col-12 details-bg my-3" :class="{ 'details-bg-image': activeEvent }"></div>
        </section>
        <div class="pos-abs border-blue p-4 my-2">
            <section class="row justify-content-between">

                <img :src="activeEvent.coverImg" class="col-4 p-0 ms-4 img-fluid border-blue" />

                <div class="col-7 text-light">
                    <section class="row">
                        <!-- FIXME only owner can cancel event, also work on colors-->
                        <div v-if="account.id == activeEvent.creatorId" class="col-12 text-end">
                            <button class="btn btn-info me-3">Update Event</button>
                            <button class="btn btn-danger m-3">Cancel Event</button>
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
                        <div class="col-12">
                            <p>{{ activeEvent.description }}</p>
                        </div>
                    </section>
                    <section class="row justify-content-between align-items-end">
                        <div class="col-5">
                            {{ activeEvent.capacity }} Spots Left
                        </div>
                        <div class="col-3 text-end">
                            <button class="btn btn-warning me-3">Attend Event</button>
                        </div>
                    </section>



                </div>



            </section>


        </div>





        <section class="row">
            <div class="col-12">
                <p>See Who's Attending:</p>
            </div>
            <!-- TODO get attendees and add here -->
            <div class="col-12 bg-dark">
                <h1>People's images and names</h1>
            </div>
        </section>
        <section class="row justify-content-center">
            <div class="col-9">
                <section class="row">
                    <div class="col-12 pt-5">
                        <p>What are people saying</p>
                    </div>
                    <!-- FIXME comment out min-height once component exists -->
                    <div class="col-12 bg-dark min-height">
                        <!-- TODO comments component -->

                    </div>
                </section>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
export default {
    setup() {
        const route = useRoute()

        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                logger.log(error)
                Pop.error(error)
            }
        }

        onMounted(() => {
            getEventById()
        })
        return {
            account: computed(() => AppState.account),
            activeEvent: computed(() => AppState.activeEvent),
            coverImg: computed(() => {
                if (AppState.activeEvent) {
                    return `url('${AppState.activeEvent.coverImg}')`
                }
                else {
                    return `url('https://thiscatdoesnotexist.com')`
                }
            })
        }
    }
};
</script>


<style lang="scss" scoped>
.details-bg {
    // background-image: v-bind(coverImg);
    min-height: 360px;

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
    top: 8px;
    left: 0;
    background-color: #122f787a;
    height: 360px;
    width: 100%;
    // border: 1px solid rgb(0, 200, 255);
}

.border-blue {
    border: 1px solid rgb(0, 200, 255);
}
</style>