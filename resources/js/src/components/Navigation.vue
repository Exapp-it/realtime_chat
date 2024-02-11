<script setup>
import { ref, onUpdated, onMounted, computed, watch } from 'vue';
import { RouterLink } from 'vue-router';

const accessToken = ref('');

const isAuthenticated = ref(!!localStorage.accessToken);

const getAccessToken = () => {
  accessToken.value = localStorage.accessToken;
  isAuthenticated.value = !!accessToken.value;
};

const updateAuthentication = () => {
  isAuthenticated.value = !!accessToken.value;
};

watch(accessToken, updateAuthentication);

onMounted(getAccessToken);
onUpdated(getAccessToken);
</script>



<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <RouterLink class="navbar-brand" :to="{ name: 'home.index' }">WebSocket Chat</RouterLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <RouterLink class="nav-link" :to="{ name: 'home.index' }">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'dashboard.index' }">Chat</RouterLink>
          </li>

        </ul>
        <span class="d-flex gap-3 ms-auto">
          <RouterLink v-if="!isAuthenticated" class="nav-link" :to="{ name: 'auth.login' }">Login</RouterLink>
          <RouterLink v-if="!isAuthenticated" class="nav-link" :to="{ name: 'auth.register' }">Register
          </RouterLink>
          <RouterLink v-if="isAuthenticated" class="nav-link" :to="{ name: 'dashboard.index' }">Dashboard
          </RouterLink>
        </span>
      </div>
    </nav>
  </header>
</template>
