<template>
    <div v-if="!event.isCanceled && event.capacity > 0">
        <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
            <div class="event-image border-top border-start border-end border-1 border-dark m-2 elevation-5">
                <div class="overlay px-3">
                    <h6 class="pt-1 fw-bold text-light">{{ event.name }}</h6>
                    <span class="text-secondary">{{ event.location }}</span>
                    <br>
                    <span class="text-secondary">{{ new Date(event.startDate).toLocaleDateString() }} {{ new
                            Date(event.startDate).toLocaleTimeString()
                    }}</span>
                    <br>
                    <span class="text-secondary flt-rgt py-2">{{ event.capacity }} Spots Left</span>
                </div>
            </div>
        </router-link>
    </div>

    <div v-else-if="!event.isCanceled && event.capacity == 0">
        <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
            <div class="event-image border-top border-start border-end border-1 border-dark m-2">
                <!-- <h1 class="text-danger text-center mt-5 fw-bold text-shadow">CANCELLED</h1> -->
                <div class="overlay-soldout px-3 elevation-5">
                    <div class="text-center pt-5">
                        <h1 class="text-light text-center caveat-font text-shadow">SOLD OUT</h1>
                        <h6 class="pt-1 fw-bold text-light">{{ event.name }}</h6>
                        <span class="text-secondary">{{ event.location }}</span>
                        <!-- <br>
                        <span class="text-secondary flt-rgt py-2">No capacity</span> -->

                    </div>
                </div>
            </div>
        </router-link>
    </div>
    <div v-else>
        <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
            <div class="event-image border-top border-start border-end border-1 border-dark m-2">
                <!-- <h1 class="text-danger text-center mt-5 fw-bold text-shadow">CANCELLED</h1> -->
                <div class="overlay-pink px-3 elevation-5">
                    <div class="text-center pt-5">
                        <h1 class="text-light text-center caveat-font text-shadow">CANCELLED</h1>
                        <h6 class="pt-1 fw-bold text-light">{{ event.name }}</h6>
                        <span class="text-secondary">{{ event.location }}</span>
                        <!-- <br>
                            <span class="text-secondary flt-rgt py-2">No capacity</span> -->

                    </div>
                </div>
            </div>
        </router-link>
    </div>



</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
        event: { type: Object, required: true }
    },
    setup(props) {

        return {
            coverImg: computed(() => `url('${props.event.coverImg}')`)
        }
    }
};
</script>


<style lang="scss" scoped>
.event-image {
    background-image: v-bind(coverImg);
    background-position: center;
    background-size: cover;
    min-height: 32vh;
    position: relative;
}

.overlay {
    backdrop-filter: blur(10px);
    min-height: 10vh;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid rgb(0, 200, 255);
    border-bottom: 1px solid #2A2D3A;
}

.overlay-pink {
    background-color: rgba(255, 0, 51, 0.45);
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid rgb(255, 0, 51);
    border-bottom: 1px solid rgb(255, 0, 51);
}

.overlay-soldout {
    background-color: #d46fe67d;
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #d46fe6;
    border-bottom: 1px solid #d46fe6;
}

.flt-rgt {
    position: relative;
    float: right;
}

.text-shadow {
    text-shadow: 1px 1px whitesmoke;
    font-size: 52px;
}
</style>