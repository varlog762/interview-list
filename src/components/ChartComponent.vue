<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import type { InterviewInputInterface, ChartItemInterface } from 'src/models';
import { brandColors } from 'src/constants';
import { useUserStore } from 'src/stores/user-store';
import { getAllInterviews } from 'src/services/firebase';

defineOptions({
  name: 'ChartComponent',
});

const userStore = useUserStore();
const isLoading = ref<boolean>(true);

const interviewList = ref<InterviewInputInterface[]>([]);

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const interviewData = computed<ChartItemInterface[]>(() => {
  if (!interviewList.value) return [];

  return interviewList.value.reduce((acc, item) => {
    const existingItem = acc.find(i => i.status === item.status);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ status: item.status!, count: 1 });
    }

    return acc;
  }, [] as ChartItemInterface[]);
});

const chartData = computed(() => ({
  labels: interviewData.value.map(item => item.status),
  datasets: [
    {
      data: interviewData.value.map(item => item.count),
      backgroundColor: [
        brandColors.POSITIVE,
        brandColors.NEGATIVE,
        brandColors.INFO,
        brandColors.PRIMARY,
        brandColors.WARNING,
      ],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Распределение по статусам' },
  },
};

//TODO: replace this:
const loadInterviews = async () => {
  try {
    interviewList.value = await getAllInterviews(userStore.userId as string);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadInterviews();
});
</script>

<template>
  <div class="chart-container">
    <div class="chart-max-width">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  padding: 20px;
}
.chart-max-width {
  margin: 0 auto;
  max-width: 50%;
}
</style>
