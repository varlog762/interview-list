<script setup lang="ts">
defineOptions({
  name: 'SpinnerComponent',
});
</script>

<template>
  <!-- TODO: replace q-page tag -->
  <q-page class="flex flex-center column q-gutter-md">
    <h5 class="text-secondary">Loading...</h5>
    <q-spinner color="primary" size="3em" :thickness="10" />
  </q-page>
</template>
