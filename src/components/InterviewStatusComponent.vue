<script setup lang="ts">
import { ref, watch } from 'vue';

import type { InterviewStatusType } from 'src/models';
import { InterviewStatus } from 'src/enums';

defineOptions({
  name: 'InterviewStatusComponent',
});

const props = defineProps<{ status: InterviewStatusType }>();

const emit = defineEmits(['update:status']);

const statusLocal = ref(props.status);

watch(statusLocal, () => {
  emit('update:status', statusLocal.value);
});
</script>

<template>
  <div class="flex justify-start q-gutter-x-sm ml-8 mt-0 gap">
    <q-radio
      v-model="statusLocal"
      :val="InterviewStatus.SCHEDULED"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="primary">
      <span class="text-body1">{{ InterviewStatus.SCHEDULED }}</span>
    </q-radio>
    <q-radio
      v-model="statusLocal"
      :val="InterviewStatus.PENDING"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="info">
      <span class="text-body1">{{ InterviewStatus.PENDING }}</span>
    </q-radio>
    <q-radio
      v-model="statusLocal"
      :val="InterviewStatus.OFFER"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="positive">
      <span class="text-body1">{{ InterviewStatus.OFFER }}</span>
    </q-radio>
    <q-radio
      v-model="statusLocal"
      :val="InterviewStatus.REJECT"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="negative">
      <span class="text-body1">{{ InterviewStatus.REJECT }}</span>
    </q-radio>
    <q-radio
      v-model="statusLocal"
      :val="InterviewStatus.CANCELED"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      color="warning">
      <span class="text-body1">{{ InterviewStatus.CANCELED }}</span>
    </q-radio>
  </div>
</template>

<style lang="scss" scoped></style>
