<script setup lang="ts">
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

defineOptions({ name: 'AddInterviewPage' });
const router = useRouter();
const userStore = useUserStore();
const showToast = useQuasarNotify();

const newInterview = reactive<InterviewInputInterface>(createNewInterview());

const isLoading = ref<boolean>(false);
const isFormInvalid = computed<boolean>(() => {
  return !(
    newInterview.companyName &&
    newInterview.vacancyLink &&
    newInterview.hrName
  );
});

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
  <div class="q-pt-xl q-pa-md q-mx-auto max-w-700 q-pb-xl">
    <h2 class="title-md">Add new interview</h2>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <CompanyInfoInputComponent v-model:company-info="newInterview" />

      <SalaryRangeInputComponent
        v-model:min-salary="newInterview.minSalary"
        v-model:maxSalary="newInterview.maxSalary" />

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
