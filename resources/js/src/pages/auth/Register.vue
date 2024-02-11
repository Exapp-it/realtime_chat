<script setup>
import api from '../../router/api';
import { ref } from "vue";
import Toast from '../../store/toast';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const errors = ref({});
const message = ref(null);


const store = () => {
  api.post('/api/auth/register', {
    login: login.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
  })
    .then(res => {
      router.push({ name: 'auth.login' });
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
        message.value = error.response.data.message;
        Toast.add({
          message: error.response.data.message,
          status: 'danger',
        })
      }
    });
};
</script>


<template>
  <div class="card mt-5 p-5 border-0 shadow w-50 mx-auto">
    <h3 class="text-center">Register</h3>
    <div class="mt-2 py-2">
      <div class="form-group mb-5">
        <label for="login">Username</label>
        <input :class="{ 'is-invalid': errors.login }" v-model="login" type="text" class="form-control" placeholder="Login"
          id="login">
        <span class="invalid-feedback" v-if="errors?.login">{{ errors.login.join(', ') }}</span>
      </div>
      <div class="form-group mb-5">
        <label for="email">Email</label>
        <input :class="{ 'is-invalid': errors.email }" v-model="email" type="email" class="form-control" placeholder="Email"
          id="email">
        <span class="invalid-feedback" v-if="errors?.email">{{ errors.email.join(', ') }}</span>
      </div>
      <div class="form-group mb-5">
        <label for="password">Password</label>
        <input :class="{ 'is-invalid': errors.password }" v-model="password" type="password" class="form-control"
          placeholder="**********" id="password">
        <span class="invalid-feedback" v-if="errors?.password">{{ errors.password.join(', ') }}</span>
      </div>
      <div class="form-group mb-5">
        <label for="password_confirmation">Password Confirmation</label>
        <input :class="{ 'is-invalid': errors.passwordConfirmation }" v-model="passwordConfirmation" type="password"
          class="form-control" placeholder="**********" id="password_confirmation">
        <span class="invalid-feedback" v-if="errors?.passwordConfirmation">{{ errors.passwordConfirmation.join(', ')
        }}</span>
      </div>
      <div class="form-group mt-5">
        <button @click.prevent="store" type="submit" class="btn btn-lg btn-primary w-100">Register</button>
      </div>
    </div>
</div></template>
