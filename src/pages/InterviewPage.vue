<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import type { InterviewInputInterface } from 'src/models';
import InterviewStatusComponent from 'src/components/InterviewStatusComponent.vue';
import InterviewStageComponent from 'src/components/InterviewStageComponent.vue';
import SalaryRangeInputComponent from 'src/components/SalaryRangeInputComponent.vue';
import CompanyInfoInputComponent from 'src/components/CompanyInfoInputComponent.vue';
import { RouteNames } from 'src/enums';
import { getDocumentById, updateInterview } from 'src/services/firebase';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';

defineOptions({
  name: 'InterviewPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();
const route = useRoute();
const router = useRouter();

const interviewId = route.params.id as string;
const isLoading = ref<boolean>(true);
const interview = ref<InterviewInputInterface | null>(null);

const reversedStages = computed(() => {
  if (!interview.value?.stages) return [];

  return [...interview.value?.stages].reverse();
});

const isFormInvalid = computed<boolean>(() => {
  const {
    stages = [],
    companyName,
    vacancyLink,
    hrName,
  } = interview.value || {};

  const hasRequiredFields = companyName && vacancyLink && hrName;
  const areStagesValid = stages.every(stage => stage.interviewStageName);

  return !hasRequiredFields || (stages.length > 0 && !areStagesValid);
});

const loadInterview = async (): Promise<void> => {
  isLoading.value = true;
  try {
    if (!interviewId || !userStore.userId) return;

    interview.value = await getDocumentById(userStore.userId, interviewId);
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};

const addStage = (): void => {
  if (!interview.value) return;

  const newStageId = uuidv4();

  interview.value.stages ??= [];

  interview.value.stages.push({
    interviewStageId: newStageId,
    interviewStageName: '',
    interviewStageDate: '(Click to select date and time)',
    interviewStageComment: '',
  });
};

const removeStageById = (stageId: string): void => {
  if (interview.value?.stages) {
    interview.value.stages = interview.value.stages.filter(
      stage => stage.interviewStageId !== stageId
    );
  }
};

const saveInterview = async () => {
  isLoading.value = true;

  try {
    if (!interviewId || !userStore.userId || !interview.value) return;

    await updateInterview(userStore.userId, interviewId, interview.value!);
    router.push({ name: RouteNames.INTERVIEWS });
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadInterview();
});
</script>
<template>
  <!-- spinner -->
  <SpinnerComponent v-if="isLoading" />
  <!-- page content-->
  <template v-else>
    <template v-if="interview">
      <div class="q-pt-xl q-pa-md q-mx-auto max-w-700 q-pb-xl">
        <h2 class="title-md">Interview to {{ interview.companyName }}</h2>
        <q-form @submit="saveInterview" class="q-gutter-md">
          <CompanyInfoInputComponent v-model:company-info="interview" />

          <SalaryRangeInputComponent
            v-model:min-salary="interview.minSalary"
            v-model:maxSalary="interview.maxSalary" />

          <q-btn
            @click="addStage"
            class="q-mb-sm"
            icon="fa-solid fa-plus"
            label="add stage"
            type="button"
            color="info" />

          <template v-if="interview?.stages">
            <TransitionGroup>
              <InterviewStageComponent
                v-for="(stage, index) in reversedStages"
                :key="stage.interviewStageId"
                v-model:stage="reversedStages[index]"
                @remove-stage="removeStageById" />
            </TransitionGroup>
          </template>

          <InterviewStatusComponent
            v-if="interview.status"
            v-model:status="interview.status" />

          <q-btn
            icon="fa-regular fa-floppy-disk"
            label="save interview"
            type="submit"
            color="primary"
            :disable="isFormInvalid"
            :loading="isLoading" />
        </q-form>
      </div>
    </template>
    <!-- TODO: add error component -->
    <template v-else>Oops! Something went wrong...</template>
  </template>
</template>

<style lang="scss" scoped>
.title-md {
  margin-bottom: 20px;
  text-align: left;
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
