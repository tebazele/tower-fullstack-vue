<template>
    <!-- TODO add router link to event details page -->
    <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
        <div class="event-image border-top border-start border-end border-1 border-dark m-2">
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
    min-height: 47vh;
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

.flt-rgt {
    position: relative;
    float: right;
}
</style>