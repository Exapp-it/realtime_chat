<script setup>
import { onMounted } from 'vue';
const props = defineProps({
  message: String,
  status: String,
  duration: {
    Number,
    default: 2000,
  },
})

const emit = defineEmits(['remove'])

onMounted(() => {
  setTimeout(() => emit('remove'), props.duration);
})

function alertClass() {
  return `alert-${this.status} alert-dismissible fade show`;
}

</script>

<template>
  <div class="alert alert-dismissible fade show" :class="alertClass" role="alert">
    <div class="d-flex align-items-center">
      <div v-if="status === 'success'" class="alert-icon me-3 text-success">
        <i class="bi bi-check-circle"></i>
      </div>
      <div v-if="status === 'danger'" class="alert-icon me-3 text-danger">
        <i class="bi bi-exclamation-circle"></i>
      </div>
      <div v-if="status === 'info'" class="alert-icon me-3 text-info">
        <i class="bi bi-info-circle"></i>
      </div>
      <div class="text-sm">
        {{ props.message }}
      </div>
      <button @click="emit('remove')" type="button" class="btn-close ms-auto"></button>
    </div>
  </div>
</template>

