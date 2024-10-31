<script setup lang="ts">
defineOptions({
  name: 'InterviewStageComponent',
});
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
.interview-stage-container {
  margin-bottom: 20px;
  padding: 15px;
  border: 2px solid $light-gray;
  border-radius: 5px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
