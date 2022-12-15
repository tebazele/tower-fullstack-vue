<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 bg-dark my-4">
        <h5 class="text-light m-3">My Events</h5>
      </div>
      <!-- Event card area -->
      <div class="col-3" v-for="t in myTickets" :key="t.id">
        <EventCard :event="t.event" />
      </div>
    </section>
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
