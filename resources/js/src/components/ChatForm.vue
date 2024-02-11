<script setup>
import { reactive } from 'vue'
import useChat from '../use/chat';
const form = reactive({
  message: '',
});

const { errors, addMessage } = useChat();

const sendMessage = async () => {
  await addMessage(form);
  form.message = ''
}

</script>

<template>
  <textarea v-model="form.message" @keyup.enter="sendMessage" class="form-control " rows="5"></textarea>
  <button @click="sendMessage" class="btn btn-success mt-5 mb-3 float-end">Send</button>
</template>
