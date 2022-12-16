<template>
  <div class="container-fluid">
    <div class="my-4 mx-3">
      <section class="row">
        <div class="col-12 my-4 mx-2">
          <h1 class="text-light me-3 p-3 bg-dark">My Events</h1>
        </div>
        <!-- Event card area -->
        <div class="col-3 pb-5" v-for="t in myTickets" :key="t.id">
          <EventCard :event="t.event" />
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { ticketsService } from '../services/TicketsService.js'
import EventCard from '../components/EventCard.vue'
export default {
  setup() {
    async function getMyTicketEvents() {
      try {
        await ticketsService.getMyTicketEvents();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getMyTicketEvents();
    });
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
