<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

defineOptions({
  name: 'StatisticsPage',
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const interviewData = ref([
  { status: 'offer', count: 3 },
  { status: 'reject', count: 5 },
  { status: 'pending', count: 2 },
]);

const chartData = computed(() => ({
  labels: interviewData.value.map(item => item.status),
  datasets: [
    {
      data: interviewData.value.map(item => item.count),
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFCA28'],
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
      <PieChart :data="chartData" :options="chartOptions" />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped></style>
