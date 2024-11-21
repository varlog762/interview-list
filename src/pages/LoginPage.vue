<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { validateEmailInput, validatePasswordInput } from 'src/utils';
import { useUserStore } from 'src/stores/user-store';

defineOptions({
  name: 'LoginPage',
});

const userStore = useUserStore();
const email = ref<string>('');
const password = ref<string>('');
const isFormValid = ref<boolean>(false);
const isSubmitButtonDisabled = computed<boolean>(() => !isFormValid.value);

const validateForm = (): void => {
  const isEmailValid = validateEmailInput(email.value) === true;
  const isPasswordValid = validatePasswordInput(password.value) === true;
  isFormValid.value = isEmailValid && isPasswordValid;
};

const onSubmit = async () => {
  const authInput = {
    email: email.value,
    password: password.value,
  };

  userStore.signIn(authInput);
};

watch([email, password], validateForm);
</script>

<template>
  <div class="form-wrapper">
    <div class="q-pa-md auth-form">
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
            label="sign in"
            type="submit"
            color="primary"
            class="auth-button"
            :disable="isSubmitButtonDisabled"
            :loading="userStore.isLoading" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
