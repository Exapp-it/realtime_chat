<script setup>
import { useRouter } from 'vue-router';
import { computed, onMounted, onBeforeMount } from 'vue';
import ChatList from './ChatList.vue';
import ChatForm from './ChatForm.vue';
import useChat from "../use/chat";
import api from '../router/api';

const { messages, getMessages } = useChat();

const user = computed(() => localStorage.currentUser);
const router = useRouter();

const logout = async () => {
  try {
    await api.delete('api/auth/logout');
    localStorage.removeItem('accessToken');
    router.push({ name: 'home.index' });
  } catch (error) {
    console.error(error);
  }
}

Echo.private('chat')
  .listen('MessageSentEvent', (e) => {
    messages.value.push({
      message: e.message,
      user: e.user,
    })
  })

onMounted(async () => {
  getMessages();
});

</script>

<template>
  <div class="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        Real Time Chat
        <form @submit.prevent="logout">
          <button type="submit" class="btn btn-sm btn-danger">Exit</button>
        </form>
      </div>
      <div class="card-body height3">
        <ChatList :user="user" :messages="messages" />
      </div>
      <div class="card-footer pt-5">
        <ChatForm />
      </div>
    </div>
  </div>
</template>
