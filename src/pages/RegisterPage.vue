<script setup lang="ts">
/**
 * RegisterPage component provides a user interface for registering a new account.
 * It includes form validation, input fields for email, password, and password confirmation,
 * and handles sign-up actions.
 */
import { ref, computed, watch } from 'vue';

import { validateEmailInput, validatePasswordInput } from 'src/utils';
import { ErrorMessagesEnum } from 'src/enums';
import { useUserStore } from 'src/stores/user-store';

// Component name for debugging and development purposes
defineOptions({
  name: 'RegisterPage',
});

// Accessing the user store to manage sign-up functionality
const userStore = useUserStore();

// Reactive values for the email, password, and password confirmation inputs
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

// Reactive value to track form validity
const isFormValid = ref<boolean>(false);

// Computed value for the submit button's disabled state
const isSubmitButtonDisabled = computed<boolean>(() => !isFormValid.value);

/**
 * Validates that the password and password confirmation inputs match.
 * @returns {string | true} - Returns an error message if the passwords do not match, otherwise returns true.
 */
const validatePasswordConfirmation = (): string | true => {
  if (password.value !== confirmPassword.value) {
    return ErrorMessagesEnum.PASSWORDS_DONT_MATCH;
  }

  return true;
};

/**
 * Validates the sign-up form by checking if the email, password, and password confirmation
 * inputs are valid. Updates the `isFormValid` reactive value based on the result.
 */
const validateForm = (): void => {
  const isEmailValid = validateEmailInput(email.value) === true;
  const isPasswordValid = validatePasswordInput(password.value) === true;
  const isPasswordConfirmationValid = validatePasswordConfirmation() === true;
  isFormValid.value =
    isEmailValid && isPasswordValid && isPasswordConfirmationValid;
};

// Watches for changes in email, password, and password confirmation inputs and revalidates the form
watch([email, password, confirmPassword], validateForm);

/**
 * Handles the sign-up form submission by creating an authentication input object
 * with the user's email and password, and then calling the user store's `signUp`
 * method with the input object.
 */
const onSubmit = (): void => {
  const authInput = {
    email: email.value,
    password: password.value,
  };

  userStore.signUp(authInput);
};
</script>

<template>
  <!-- Form wrapper for the registration interface -->
  <div class="form-wrapper">
    <div class="q-pa-md auth-form">
      <!-- Page title -->
      <h2 class="title-md">Sign up</h2>
      <!-- Link to the login page -->
      <router-link to="/auth/login" class="auth-link">
        Have an account?
      </router-link>
      <!-- Registration form -->
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
        <!-- Confirm password input field -->
        <q-input
          filled
          type="password"
          v-model="confirmPassword"
          label="Confirm password"
          :rules="[validatePasswordConfirmation]" />
        <!-- Submit button -->
        <div>
          <q-btn
            label="sign up"
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

<style lang="scss" scoped>
.q-pa-md {
  margin: 0 auto;
}
</style>
