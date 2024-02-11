<script setup>
import ToastListItem from "./ToastListItem.vue";
import Toast from "../store/toast";


const remove = index => {
  Toast.remove(index);
}
</script>

<template>
  <TransitionGroup tag="div" enter-from-class="translate-x-full opacity-0" enter-active-class="duration-500"
    leave-active-class="duration-500" leave-to-class="translate-x-full opacity-0"
    class="toast-container position-absolute top-5 z-index end-0 pt-3 my-5 me-2 bg-white shadow-lg  rounded fade show">
    <ToastListItem v-for="(item, index) in Toast.items" :key="item.key" :message="item.message" :status="item.status"
      :duration="3000" @remove="remove(index)" />
  </TransitionGroup>
</template>
