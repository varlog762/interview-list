<script setup lang="ts">
/**
 * The StatisticsPage component is responsible for displaying the statistics of interviews.
 * It fetches the interview data from the store asynchronously,
 * shows a loading spinner while fetching the data, and conditionally displays either
 * the interview statistics chart or a message that no interviews are available.
 */
import { ref, defineAsyncComponent, onMounted } from 'vue';

import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import NoInterviewsComponent from 'src/components/NoInterviewsComponent.vue';
import { useInterviewStore } from 'src/stores';

// Component name for debugging and development purposes
defineOptions({
  name: 'StatisticsPage',
});

// Dynamically importing the ChartComponent for lazy loading
const ChartComponent = defineAsyncComponent(
  () => import('src/components/ChartComponent.vue')
);

// State to manage loading status
const isLoading = ref<boolean>(true);

// Initialize the interview store to manage the state of interviews
const interviewStore = useInterviewStore();

// Lifecycle hook that fetches interviews when the component is mounted
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
  <!-- Show spinner while loading the data -->
  <SpinnerComponent v-if="isLoading" />

  <!-- Show interview statistics if interviews are available -->
  <template v-else-if="interviewStore.interviewList.length">
    <div class="q-pa-md q-pt-xl">
      <h2 class="title-md">Interview statistics</h2>
      <!-- Passing the interview list to the ChartComponent for visualization -->
      <ChartComponent :interview-list="interviewStore.interviewList" />
    </div>
  </template>

  <!-- Display a fallback component if no interviews are available -->
  <NoInterviewsComponent v-else />
</template>

<style lang="scss" scoped></style>
