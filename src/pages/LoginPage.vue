<script setup lang="ts">
/**
 * LoginPage component provides a user interface for signing into the application.
 * It includes form validation, input fields for email and password, and handles sign-in actions.
 */
import { computed, ref, watch } from 'vue';

import { validateEmailInput, validatePasswordInput } from 'src/utils';
import { useUserStore } from 'src/stores/user-store';

// Component name for debugging and development purposes
defineOptions({
  name: 'LoginPage',
});

// Accessing the user store to manage sign-in functionality
const userStore = useUserStore();

// Reactive value for the email input
const email = ref<string>('');

// Reactive value for the password input
const password = ref<string>('');

// Reactive value to track form validity
const isFormValid = ref<boolean>(false);

// Computed value for the submit button's disabled state
const isSubmitButtonDisabled = computed<boolean>(() => !isFormValid.value);

/**
 * Validates the sign-in form by checking if the email and password inputs are valid.
 * Updates the `isFormValid` reactive value based on the result.
 */
const validateForm = (): void => {
  const isEmailValid = validateEmailInput(email.value) === true;
  const isPasswordValid = validatePasswordInput(password.value) === true;
  isFormValid.value = isEmailValid && isPasswordValid;
};

/**
 * Handles the sign-in form submission by creating an authentication input object
 * with the user's email and password, and then calling the user store's `signIn`
 * method with the input object.
 */
const onSubmit = async () => {
  const authInput = {
    email: email.value,
    password: password.value,
  };

  userStore.signIn(authInput);
};

// Watches for changes in email and password inputs and revalidates the form
watch([email, password], validateForm);
</script>

<template>
  <!-- Form wrapper for the login interface -->
  <div class="form-wrapper">
    <div class="q-pa-md auth-form">
      <!-- Page title -->
      <h2 class="title-md">Sign in</h2>
      <!-- Link to the registration page -->
      <router-link to="/auth/register" class="auth-link">
        Need an account?
      </router-link>
      <!-- Login form -->
      <q-form @submit="onSubmit" class="q-gutter-md">
        <!-- Email input field -->
        <q-input
          filled
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[validateEmailInput]" />
        <!-- Password input field -->
        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          :rules="[validatePasswordInput]" />
        <!-- Submit button -->
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
