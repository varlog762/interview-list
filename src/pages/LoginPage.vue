<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { validateEmailInput, validatePasswordInput } from 'src/utils';

const email = ref('');
const password = ref('');
const isFormValid = ref(false);
const isSubmitButtonDisabled = computed(() => !isFormValid.value);

const validateForm = () => {
  const isEmailValid = validateEmailInput(email.value) === true;
  const isPasswordValid = validatePasswordInput(password.value) === true;
  isFormValid.value = isEmailValid && isPasswordValid;
};

watch([email, password], validateForm);
const onSubmit = () => {
  console.log('submit');
};
</script>

<template>
  <div class="form-wrapper">
    <div class="q-pa-md" style="max-width: 500px">
      <h2 class="title-md">Sign in</h2>
      <router-link to="/auth/register" class="auth-link"
        >Need an account?</router-link
      >
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[validateEmailInput]" />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          :rules="[validatePasswordInput]" />
        <div>
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            :disable="isSubmitButtonDisabled" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  margin-top: 15%;
}

.q-pa-md {
  margin: 0 auto;
}
</style>
