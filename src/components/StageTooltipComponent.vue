<script setup lang="ts">
import type { InterviewStageInterface } from 'src/models';

defineOptions({
  name: 'StageTooltipComponent',
});

const props = defineProps<{ stage: InterviewStageInterface }>();
</script>

<template>
  <div class="row items-start">
    <q-card class="bg-secondary text-white">
      <q-card-section>
        <div class="text-subtitle2">
          {{ props.stage.interviewStageName }}
        </div>
        <div v-if="props.stage.interviewStageDate">
          {{ props.stage.interviewStageDate }}
        </div>
      </q-card-section>
      <div v-if="stage.interviewStageComment">
        <q-separator dark />
        <q-card-section class="text-body2 mw-250">
          {{ props.stage.interviewStageComment }}
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.mw-250 {
  max-width: 250px;
}
</style>
