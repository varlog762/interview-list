<script setup lang="ts">
import { watch } from 'vue';

defineOptions({
  name: 'SalaryRangeInputComponent',
});
const minSalary = defineModel<number>('minSalary');
const maxSalary = defineModel<number>('maxSalary');

watch(minSalary, newMinSalary => {
  if (
    newMinSalary != null &&
    maxSalary.value != null &&
    newMinSalary > maxSalary.value
  ) {
    maxSalary.value = newMinSalary;
  }
});
</script>

<template>
  <div class="flex q-col-gutter-sm ml-8 mt-8 q-my-sm">
    <q-input
      class="col pt-0"
      filled
      type="number"
      v-model.number="minSalary"
      :min="0"
      label="Minimum salary">
    </q-input>

    <q-input
      class="col pt-0"
      filled
      type="number"
      v-model.number="maxSalary"
      :min="0"
      label="Maximum salary" />
  </div>
</template>

<style lang="scss" scoped></style>
