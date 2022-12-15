<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      <div class="col-md-11 col-12 order-2 order-md-1">
        <router-view />
      </div>
      <div class="col-md-1 col-12 bg-dark text-center order-1 order-md-2 full-height">
        <Login />
      </div>
    </section>

  </main>
  <!-- <footer class="bg-dark text-light">
    Made for Tower by Jeanne
  </footer> -->
  <ModalComponent id="createEvent">
    <CreateEventForm />
  </ModalComponent>
</template>

<script>

import { computed } from 'vue'
import { AppState } from './AppState'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'
import CreateEventForm from './components/CreateEventForm.vue'


export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login, ModalComponent, CreateEventForm }
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

.full-height {
  min-height: 100vh;
}
</style>
