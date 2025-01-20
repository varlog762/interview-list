<script setup lang="ts">
/**
 * This component is for viewing and editing a specific interview. It allows users to
 * update various fields of the interview, including company details, salary range,
 * interview stages, and interview status. Users can also add or remove interview stages.
 */
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { InterviewInputInterface } from 'src/models';
import InterviewStatusComponent from 'src/components/InterviewStatusComponent.vue';
import InterviewStageComponent from 'src/components/InterviewStageComponent.vue';
import SalaryRangeInputComponent from 'src/components/SalaryRangeInputComponent.vue';
import CompanyInfoInputComponent from 'src/components/CompanyInfoInputComponent.vue';
import { RouteNamesEnum } from 'src/enums';
import { getDocumentById, updateInterview } from 'src/services/firebase';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import { createNewStage } from 'src/utils';

// Component name for debugging and development purposes
defineOptions({
  name: 'InterviewPage',
});

// Dependencies
const userStore = useUserStore();
const showToast = useQuasarNotify();
const route = useRoute();
const router = useRouter();

// Reference to the current interview ID retrieved from the route parameters.
const interviewId = route.params.id as string;

// Boolean reference to handle the loading state when fetching the interview details.
const isLoading = ref<boolean>(true);

// Reference to store the interview data fetched from the database.
const interview = ref<InterviewInputInterface | null>(null);

// Computed property that returns the stages of the interview in reverse order.
const reversedStages = computed(() => {
  if (!interview.value?.stages) return [];

  return [...interview.value?.stages].reverse();
});

// Computed property that checks whether the form is valid based on required fields
// and the presence of valid interview stages.
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

/**
 * Loads the interview data for the current interview ID from the database.
 * If the interview ID is invalid or the user is not logged in, the function does nothing.
 * If the interview does not exist, the user is redirected to the 404 page.
 * If an error occurs during the operation, an error notification is displayed.
 * Sets the loading state to false once the operation is complete.
 */
const loadInterview = async (): Promise<void> => {
  isLoading.value = true;
  try {
    if (!interviewId || !userStore.userId) return;

    interview.value = await getDocumentById(userStore.userId, interviewId);

    if (!interview.value) {
      router.push({ name: RouteNamesEnum.NOT_FOUND });
    }
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Adds a new stage to the current interview.
 * If the interview does not exist, the function does nothing.
 * Initializes the stages array if it is undefined.
 * Creates a new stage and appends it to the stages array.
 */
const addStage = (): void => {
  if (!interview.value) return;

  interview.value.stages ??= [];
  const newStage = createNewStage();
  interview.value.stages.push(newStage);
};

/**
 * Removes the stage with the specified ID from the current interview.
 * If the interview does not exist or does not have any stages, the function does nothing.
 */
const removeStageById = (stageId: string): void => {
  if (!interview.value?.stages?.length) return;

  interview.value.stages = interview.value.stages.filter(
    stage => stage.interviewStageId !== stageId
  );
};

/**
 * Saves the current interview in the database.
 * If the interview ID is invalid, the user is not logged in, or the interview is not
 * initialized, the function does nothing.
 * If an error occurs during the operation, an error notification is displayed.
 * Redirects the user to the interview list page on successful completion.
 * Sets the loading state to true before the operation and false after it is complete.
 */
const saveInterview = async () => {
  isLoading.value = true;

  try {
    if (!interviewId || !userStore.userId || !interview.value) return;

    await updateInterview(userStore.userId, interviewId, interview.value!);
    router.push({ name: RouteNamesEnum.INTERVIEWS });
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
  <!-- Display a loading spinner while the interview data is being fetched. -->
  <SpinnerComponent v-if="isLoading" />

  <!-- Once the interview is loaded, display the interview details form. -->
  <template v-else-if="interview">
    <div class="q-pt-xl q-py-md q-mx-auto max-w-700 q-pb-xl">
      <h2 class="title-md">Interview to {{ interview.companyName }}</h2>

      <!-- The form used to update the interview details, triggered on submit. -->
      <q-form @submit="saveInterview" class="q-gutter-md">
        <!-- Company information input fields. Bound to the interview data model. -->
        <CompanyInfoInputComponent v-model:company-info="interview" />

        <!-- Salary range input fields for minimum and maximum salary. -->
        <SalaryRangeInputComponent
          v-model:min-salary="interview.minSalary"
          v-model:maxSalary="interview.maxSalary" />

        <!-- Button to add a new stage to the interview process. -->
        <q-btn
          @click="addStage"
          class="q-mb-md"
          icon="fa-solid fa-plus"
          label="add stage"
          type="button"
          color="info" />

        <!-- Render interview stages dynamically. If stages exist, they will be shown in reverse order. -->
        <template v-if="interview?.stages">
          <TransitionGroup>
            <InterviewStageComponent
              v-for="(stage, index) in reversedStages"
              :key="stage.interviewStageId"
              v-model:stage="reversedStages[index]"
              @remove-stage="removeStageById" />
          </TransitionGroup>
        </template>

        <!-- Interview status input field. Bound to the interview status. -->
        <InterviewStatusComponent
          v-if="interview.status"
          v-model:status="interview.status" />

        <!-- Button to save the interview details. Disabled if the form is invalid. -->
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
</template>

<style lang="scss" scoped>
.title-md {
  margin-bottom: 20px;
  text-align: left;
}
</style>
