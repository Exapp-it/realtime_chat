<script setup>
const { user } = defineProps(['user', 'messages'])


</script>

<template>
  <div class="scrollable-container">
    <ul class="chat-list">
      <li v-for="(message, index) in messages" :key="index"
        :class="{ 'out': user == message.user.id, 'in': user != message.user.id }">
        <div class="chat-img">
          <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png">
        </div>
        <div class="chat-body">
          <div class="chat-message">
            <h5>{{ message.user.login }}</h5>
            <p>{{ message.text }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
