<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from 'vue';

import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import NoInterviewsComponent from 'src/components/NoInterviewsComponent.vue';
import { useInterviewStore } from 'src/stores';

defineOptions({
  name: 'StatisticsPage',
});

const ChartComponent = defineAsyncComponent(
  () => import('src/components/ChartComponent.vue')
);

const isLoading = ref<boolean>(true);

const interviewStore = useInterviewStore();

onMounted(async () => {
  try {
    if (!interviewStore.interviewList.length) {
      await interviewStore.fetchInterviews();
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <SpinnerComponent v-if="isLoading" />

  <template v-else-if="interviewStore.interviewList.length">
    <div class="q-pa-md q-pt-xl">
      <h2 class="title-md">Interview statistics</h2>
      <ChartComponent :interview-list="interviewStore.interviewList" />
    </div>
  </template>

  <NoInterviewsComponent v-else />
</template>

<style lang="scss" scoped></style>
