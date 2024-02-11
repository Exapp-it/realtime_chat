<script setup>
import Navigation from './components/Navigation.vue'
import ToastList from './components/ToastList.vue';
</script>

<template>
  <ToastList />
  <Navigation />
  <main class="container">
    <RouterView />
  </main>
</template>
