<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import NoInterviewComponent from 'src/components/NoInterviewComponent.vue';
import { useInterviewStore } from 'src/stores';

defineOptions({
  name: 'StatisticsPage',
});

const ChartComponent = defineAsyncComponent(
  () => import('src/components/ChartComponent.vue')
);

const interviewStore = useInterviewStore();
</script>

<template>
  <template v-if="interviewStore.interviewList.length">
    <div class="q-pa-md q-pt-xl">
      <h2 class="title-md">Interview statistics</h2>
      <ChartComponent :interview-list="interviewStore.interviewList" />
    </div>
  </template>

  <template v-else>
    <NoInterviewComponent />
  </template>
</template>

<style lang="scss" scoped></style>
