<script setup lang="ts">
/**
 * The ChartComponent is a chart component that visualizes the statistics of interviews based on their statuses.
 * It receives the interview data as a prop, processes the data to calculate the number of interviews per status,
 * and displays a pie chart using the vue-chartjs library.
 */

import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import type { InterviewInputInterface, ChartItemInterface } from 'src/models';
import { getColorHexByStatus } from 'src/utils';

// Component name for debugging and development purposes
defineOptions({
  name: 'ChartComponent',
});

// Defining the prop for the interview list passed from the parent component
const { interviewList } = defineProps<{
  interviewList: InterviewInputInterface[];
}>();

// Registering the necessary modules from Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Computed property to process the interview list and prepare data for the chart
const interviewData = computed<ChartItemInterface[]>(() => {
  if (!interviewList) return [];

  return interviewList.reduce((acc, item) => {
    const existingItem = acc.find(i => i.status === item.status);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ status: item.status!, count: 1 });
    }

    return acc;
  }, [] as ChartItemInterface[]);
});

// Computed property for the chart's data configuration
const chartData = computed(() => ({
  labels: interviewData.value.map(item => item.status),
  datasets: [
    {
      data: interviewData.value.map(item => item.count),
      backgroundColor: interviewData.value.map(interview =>
        getColorHexByStatus(interview.status)
      ),
    },
  ],
}));

// Chart configuration options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: '' },
  },
};
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
  max-width: 50vw;
}
</style>
