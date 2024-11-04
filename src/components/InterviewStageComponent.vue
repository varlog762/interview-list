<script setup lang="ts">
import type { InterviewStageInterface } from 'src/models';

defineOptions({
  name: 'InterviewStageComponent',
});

const stage = defineModel<InterviewStageInterface>('stage');

defineEmits<{ 'remove-stage': [stageId: string] }>();
</script>

<template>
  <div class="interview-stage-container">
    <q-input
      v-model="stage!.interviewStageName"
      class="field q-mb-md"
      color="info"
      filled
      type="text"
      label="Stage name *" />

    <div class="q-mb-md" style="max-width: 300px">
      <q-input
        filled
        v-model="stage!.interviewStageDate"
        label="Date & time"
        readonly>
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale">
              <q-date
                v-model="stage!.interviewStageDate"
                mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale">
              <q-time
                v-model="stage!.interviewStageDate"
                mask="YYYY-MM-DD HH:mm"
                format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <q-input
      color="info"
      label="Add comment"
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
  margin-top: 8px;
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
