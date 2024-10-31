<script setup lang="ts">
import { ref } from 'vue';

import type { InterviewStageInterface } from 'src/models';

defineOptions({
  name: 'InterviewStageComponent',
});

const stage = defineModel<InterviewStageInterface>('stage');

defineEmits<{ 'remove-stage': [stageId: string] }>();

let isDatePickerVisible = ref<boolean>(false);
const toggleDatePicker = (): void => {
  isDatePickerVisible.value = !isDatePickerVisible.value;
};
</script>

<template>
  <div class="interview-stage-container">
    <q-input
      v-model="stage!.interviewStageName"
      class="q-mb-sm field"
      color="info"
      filled
      type="text"
      label="Stage name *" />

    <div class="q-gutter-sm q-mb-md q-pb-sm">
      <q-badge
        color="info"
        class="text-subtitle1 cursor-pointer"
        @click="toggleDatePicker()">
        Date & time:
        {{ stage!.interviewStageDate }}
      </q-badge>
    </div>

    <Transition>
      <div
        class="q-gutter-md row items-start justify-center q-mb-md"
        v-show="isDatePickerVisible">
        <q-date
          dense
          v-model="stage!.interviewStageDate"
          mask="YYYY-MM-DD HH:mm"
          color="info" />
        <q-time
          v-model="stage!.interviewStageDate"
          mask="YYYY-MM-DD HH:mm"
          color="info" />
      </div>
    </Transition>

    <q-input
      color="info"
      placeholder="Add comment"
      v-model="stage!.interviewStageComment"
      autogrow
      filled
      min-height="5rem"
      type="textarea"
      class="q-mb-md" />
    <q-btn
      @click="$emit('remove-stage', stage!.interviewStageId)"
      icon="fa-solid fa-trash"
      label="delete stage"
      type="button"
      color="negative" />
  </div>
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
