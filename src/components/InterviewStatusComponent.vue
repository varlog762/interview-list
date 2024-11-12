<script setup lang="ts">
import type { InterviewStatusType } from 'src/models';
import { InterviewStatusEnum } from 'src/enums';

defineOptions({
  name: 'InterviewStatusComponent',
});

const status = defineModel<InterviewStatusType>('status');
</script>

<template>
  <div class="flex justify-start q-gutter-x-sm ml-8 mt-0 gap">
    <q-radio
      v-model="status"
      :val="InterviewStatusEnum.SCHEDULED"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="primary">
      <span class="text-body1">{{ InterviewStatusEnum.SCHEDULED }}</span>
    </q-radio>
    <q-radio
      v-model="status"
      :val="InterviewStatusEnum.PENDING"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="info">
      <span class="text-body1">{{ InterviewStatusEnum.PENDING }}</span>
    </q-radio>
    <q-radio
      v-model="status"
      :val="InterviewStatusEnum.OFFER"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="positive">
      <span class="text-body1">{{ InterviewStatusEnum.OFFER }}</span>
    </q-radio>
    <q-radio
      v-model="status"
      :val="InterviewStatusEnum.REJECT"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="negative">
      <span class="text-body1">{{ InterviewStatusEnum.REJECT }}</span>
    </q-radio>
    <q-radio
      v-model="status"
      :val="InterviewStatusEnum.CANCELED"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="warning">
      <span class="text-body1">{{ InterviewStatusEnum.CANCELED }}</span>
    </q-radio>
  </div>
</template>

<style lang="scss" scoped></style>
