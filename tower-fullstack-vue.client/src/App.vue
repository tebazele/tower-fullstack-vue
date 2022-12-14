<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      <div class="col-md-11 col-12 order-2 order-md-1">
        <router-view />
      </div>
      <div class="col-md-1 col-12 bg-dark text-center order-1 order-md-2">
        <Login />
      </div>
    </section>

  </main>
  <!-- <footer class="bg-dark text-light">
    Made for Tower by Jeanne
  </footer> -->
  <div class="modal fade" id="createEvent" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <CreateEventModal />
    </div>
  </div>
</template>

<script>

import { computed } from 'vue'
import { AppState } from './AppState'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'
import CreateEventModal from './components/CreateEventModal.vue'


export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login, CreateEventModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

// .full-height {
//   min-height: 100vh;
// }
</style>
