<template>
    <div class="container-fluid pos-rel">
        <section class="row justify-content-center" v-if="activeEvent.id">
            <div class="col-12 details-bg my-3" :class="{ 'details-bg-image': activeEvent }"></div>
        </section>
        <div class="pos-abs border-blue p-5 my-2">
            <section class="row">

                <img :src="activeEvent.coverImg" class="col-4 p-0 img-fluid border-blue" />

                <div class="col-8 text-light">
                    <section class="row">
                        <!-- FIXME only owner can cancel event, also work on colors-->
                        <div class="col-12 text-end">
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


                    <p>{{ activeEvent.description }}</p>

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
    max-height: 360px;
    // border: 1px solid rgb(0, 200, 255);
}

.border-blue {
    border: 1px solid rgb(0, 200, 255);
}
</style>