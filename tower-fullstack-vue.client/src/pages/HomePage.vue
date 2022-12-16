<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 bg-image my-3 elevation-2">
        <section class="row">
          <div class="col-lg-5 col-12 text-light box-shadow-1 ms-2 ms-md-5">
            <h4 class="mt-5">Get ahead of the scalpers.
            </h4>
            <h4>Reserve your seat now with
            </h4>
            <h4>real events for real people.
            </h4>
          </div>
        </section>
      </div>
      <div class="col-md-6 col-12 d-flex bg-dark justify-content-between p-md-0 px-4 elevation-3">
        <button @click="filterBy = ''" class="btn btn-outline-light my-2 me-1 ms-3 stnd-w">All</button>
        <button @click="filterBy = 'concert'" class="btn btn-outline-light my-2 mx-1 stnd-w">Concerts</button>
        <button @click="filterBy = 'convention'" class="btn btn-outline-light my-2 mx-1 stnd-w">Conventions</button>
        <button @click="filterBy = 'digital'" class="btn btn-outline-light my-2 me-3 ms-1 stnd-w">Digital</button>
      </div>
      <div class="col-md-6 col-12 d-flex bg-dark justify-content-between p-md-0 px-4 elevation-3">

        <button @click="filterBy = 'exhibit'" class="btn btn-outline-light my-2 me-1 ms-3 stnd-w">Exhibits</button>
        <button @click="filterBy = 'expo'" class="btn btn-outline-light my-2 mx-1 stnd-w">Expos</button>
        <button @click="filterBy = 'sport'" class="btn btn-outline-light my-2 mx-1 stnd-w">Sports</button>
        <button @click="filterBy = 'other'" class="btn btn-outline-light my-2 ms-1 me-3 stnd-w">Other</button>
      </div>

      <div class="col-12 mt-4">
        <section class="row">
          <!-- v-if="events" -->
          <div v-for="e in events" :key="e.id" class="col-3">
            <!-- {{ e.name }} -->
            <EventCard :event="e" />
          </div>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import EventCard from '../components/EventCard.vue'
export default {
  setup() {
    const filterBy = ref("")
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getEvents();
    });
    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events;
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      })
    }
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.bg-image {
  background-image: url('https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80');
  background-position: center;
  background-size: cover;
  min-height: 35vh;
  max-width: 90vw;
  border: 1px solid rgb(0, 200, 255);
}

@media (max-width: 992px) {
  .bg-image {
    background-image: url('https://images.unsplash.com/photo-1557787163-1635e2efb160?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80');
    background-position: center;
    background-size: cover;
    min-height: 35vh;
    max-width: 120vw;
    border: 1px solid rgb(0, 200, 255);
  }

}

.box-shadow-1 {
  text-shadow: 2px 2px rgb(10, 10, 10);
}

.stnd-w {
  width: 18vh;
}
</style>
