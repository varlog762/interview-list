<script setup lang="ts">
import ChartComponent from 'src/components/ChartComponent.vue';

defineOptions({
  name: 'StatisticsPage',
});
</script>

<template>
  <div class="q-pa-md q-pt-xl">
    <h2 class="title-md">Interview statistics</h2>
    <ChartComponent />
  </div>
</template>

<style lang="scss" scoped>
.pie-max-width {
  max-width: 800px;
}
</style>
