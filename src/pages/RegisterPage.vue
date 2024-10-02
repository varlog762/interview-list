<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="text" label="Email" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>
