<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <!-- <div class="dropdown dropstart my-2 my-lg-0"> -->
      <!-- <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown"
          aria-expanded="false"> -->
      <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo"
          class="rounded elevation-5 pt-2 pt-md-0 profile-pic" />
      </div>
      <!-- </div> -->
      <!-- <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div> -->
      <!-- </div> -->
      <div class="my-4">
        <router-link :to="{ name: 'Home' }">
          <p>
            Home
          </p>
        </router-link>
        <router-link :to="{ name: 'Account' }">
          <p>
            Account
          </p>
        </router-link>
        <!-- NOTE opens model with create form -->
        <button class="btn btn-success bg-success mb-md-3 me-2 me-md-0 btn-wdth" data-bs-toggle="modal"
          data-bs-target="#createEvent"><span class="mdi mdi-plus">Event</span></button>
        <button class="btn btn-outline-light btn-wdth" @click="logout">Logout</button>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-pic {
  height: 80px;
  width: 80px;
  object-fit: cover;
  object-position: center;
}

.btn-wdth {
  width: 100%;
}
</style>
