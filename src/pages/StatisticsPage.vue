<script setup lang="ts">
import { ref, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

defineOptions({
  name: 'StatisticsPage',
});

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const interviewData = ref([
  { status: 'offer', count: 3 },
  { status: 'reject', count: 8 },
  { status: 'pending', count: 2 },
]);

const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--q-primary')
  .trim();
const secondaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--q-secondary')
  .trim();
const accentColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--q-accent')
  .trim();

const chartData = computed(() => ({
  labels: interviewData.value.map(item => item.status),
  datasets: [
    {
      data: interviewData.value.map(item => item.count),
      backgroundColor: [primaryColor, secondaryColor, accentColor],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Распределение по статусам' },
  },
};
</script>

<template>
  <q-card>
    <q-card-section>
      <h6>Статистика собеседований</h6>
    </q-card-section>
    <q-card-section>
      <div class="pie-max-width">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.pie-max-width {
  max-width: 800px;
}
</style>
