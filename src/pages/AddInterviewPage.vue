<script setup lang="ts">
/**
 * AddInterviewPage component allows users to create and add a new interview to their list.
 * The form includes fields for company information, a salary range, and HR details,
 * with client-side validation and submission logic to save the interview in the backend.
 */
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import type { InterviewInputInterface } from 'src/models';
import SalaryRangeInputComponent from 'src/components/SalaryRangeInputComponent.vue';
import CompanyInfoInputComponent from 'src/components/CompanyInfoInputComponent.vue';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { useUserStore } from 'src/stores/user-store';
import { createInterview } from 'src/services/firebase';
import { RouteNamesEnum } from 'src/enums';
import { createNewInterview } from 'src/utils';

// Component name for debugging and development purposes
defineOptions({ name: 'AddInterviewPage' });

// Dependencies
const router = useRouter();
const userStore = useUserStore();
const showToast = useQuasarNotify();

// Reactive object holding the new interview data
const newInterview = reactive<InterviewInputInterface>(createNewInterview());

// Reactive values for form validity and loading state
const isLoading = ref<boolean>(false);
const isFormInvalid = computed<boolean>(() => {
  return !(
    newInterview.companyName &&
    newInterview.vacancyLink &&
    newInterview.hrName
  );
});

/**
 * Handles the submission of the form to create a new interview.
 * Sets the loading state to true while the operation is in progress.
 * Attempts to create a new interview document in the backend using the provided user ID and interview data.
 * On success, navigates to the interviews page.
 * Displays an error notification if the operation fails.
 * Resets the loading state once the operation is complete.
 */
const onSubmit = async () => {
  isLoading.value = true;

  try {
    await createInterview(userStore.userId as string, newInterview);
    router.push({ name: RouteNamesEnum.INTERVIEWS });
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <!-- Form wrapper for adding a new interview -->
  <div class="q-pt-xl q-pa-md q-mx-auto max-w-700 q-pb-xl">
    <!-- Page title -->
    <h2 class="title-md">Add new interview</h2>
    <!-- Form for adding interview details -->
    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Component for entering company information -->
      <CompanyInfoInputComponent v-model:company-info="newInterview" />
      <!-- Component for entering salary range -->
      <SalaryRangeInputComponent
        v-model:min-salary="newInterview.minSalary"
        v-model:maxSalary="newInterview.maxSalary" />
      <!-- Submit button -->
      <q-btn
        label="add interview"
        type="submit"
        color="primary"
        :disable="isFormInvalid"
        :loading="isLoading" />
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.title-md {
  margin-bottom: 20px;
  text-align: left;
}
</style>
