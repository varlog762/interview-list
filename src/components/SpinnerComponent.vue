<script setup lang="ts">
defineOptions({
  name: 'SpinnerComponent',
});
</script>

<template>
  <div class="absolute-center q-pa-md flex flex-center column q-gutter-md">
    <h5 class="text-secondary">Loading...</h5>
    <q-spinner color="primary" size="3em" :thickness="10" />
  </div>
</template>

<style lang="scss" scoped></style>
