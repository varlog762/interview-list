<script setup lang="ts">
import { ref } from 'vue';

import { validateEmailInput } from 'src/utils';

const email = ref('');
const password = ref('');

const onSubmit = () => {
  console.log('submit');
};

const validatePasswordInput = (val: string): string | boolean =>
  (val && val.length > 0) || 'Please type a password';
</script>

<template>
  <div class="form-wrapper">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          type="email"
          v-model="email"
          label="Email"
          hint="Enter your email"
          lazy-rules
          :rules="[validateEmailInput]" />

        <q-input
          filled
          type="password"
          v-model="password"
          label=""
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            val => (val > 0 && val < 100) || 'Please type a password',
          ]" />
        <div>
          <q-btn label="Submit" type="submit" color="primary" />
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
