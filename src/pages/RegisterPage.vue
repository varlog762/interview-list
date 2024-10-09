<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import { validateEmailInput, validatePasswordInput } from 'src/utils';
import { ErrorMessages } from 'src/enums';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const isFormValid = ref<boolean>(false);
const isSubmitButtonDisabled = computed<boolean>(() => !isFormValid.value);

const validatePasswordConfirmation = (): string | true => {
  if (password.value !== confirmPassword.value) {
    return ErrorMessages.PASSWORDS_DONT_MATCH;
  }

  return true;
};

const validateForm = () => {
  const isEmailValid = validateEmailInput(email.value) === true;
  const isPasswordValid = validatePasswordInput(password.value) === true;
  const isPasswordConfirmationValid = validatePasswordConfirmation() === true;
  isFormValid.value =
    isEmailValid && isPasswordValid && isPasswordConfirmationValid;
};

watch([email, password, confirmPassword], validateForm);

const onSubmit = () => {
  const authInput = {
    email: email.value,
    password: password.value,
  };

  userStore.signUp(authInput);
};
</script>

<template>
  <div class="form-wrapper">
    <div class="q-pa-md" style="max-width: 500px">
      <h2 class="title-md">Sign up</h2>
      <router-link to="/auth/login" class="auth-link"
        >Have an account?</router-link
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

        <q-input
          filled
          type="password"
          v-model="confirmPassword"
          label="Confirm password"
          :rules="[validatePasswordConfirmation]" />
        <div>
          <q-btn
            label="sign up"
            type="submit"
            color="primary"
            :disable="isSubmitButtonDisabled"
            :loading="userStore.isLoading" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.q-pa-md {
  margin: 0 auto;
}
</style>
