<script setup>
import api from '../../router/api';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Toast from '../../store/toast';
import { useStore } from 'vuex';

const store = useStore();
const errors = ref({});
const login = ref('');
const password = ref('');
const router = useRouter();


const loginStore = async () => {
  try {
    const response = await api.post('/api/auth/login', {
      login: login.value,
      password: password.value,
    });
    localStorage.accessToken = response.data.access_token;
    localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    router.push({ name: 'dashboard.index' });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
      Toast.add({
        message: error.response.data.message,
        status: 'danger',
      });
    }
  }
};

</script>


<template>
  <div class="card mt-5 p-5 border-0 shadow col-6 mx-auto">
    <h3 class="text-center">Login</h3>
    <div class="mt-2 py-2">
      <div class="form-group mb-5">
        <label for="login">Username</label>
        <input :class="{ 'is-invalid': errors.login }" v-model="login" type="text" class="form-control"
          placeholder="Login" id="login">
        <span class="invalid-feedback" v-if="errors?.login">{{ errors.login.join(', ') }}</span>
      </div>
      <div class="form-group mb-5">
        <label for="password">Password</label>
        <input :class="{ 'is-invalid': errors.password }" v-model="password" type="password" class="form-control"
          placeholder="**********" id="password">
        <span class="invalid-feedback" v-if="errors?.password">{{ errors.password.join(', ') }}</span>
      </div>
      <div class="form-group mt-5">
        <button @click.prevent="loginStore" type="submit" class="btn btn-lg btn-primary w-100">Login</button>
      </div>
    </div>
  </div>
</template>
