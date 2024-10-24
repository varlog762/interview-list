<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import type { InterviewInputInterface, InterviewResultType } from 'src/models';
import { getDocumentById } from 'src/services/firebase';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { validateRequiredInput } from 'src/utils';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';

defineOptions({
  name: 'InterviewPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();
const route = useRoute();
const interviewId = route.params.id as string;

const interview = ref<InterviewInputInterface | null>(null);
const companyName = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const telegramUsername = ref<string>('');
const whatsAppUsername = ref<string>('');
const hrPhoneNumber = ref<string>('');
const minSalary = ref<number>(0);
const maxSalary = ref<number>(0);
const result = ref<InterviewResultType>(null);

const isSalaryInvalid = computed<boolean>(() => {
  return minSalary.value > maxSalary.value;
});

const isLoading = ref<boolean>(true);
const isFormInvalid = computed<boolean>(() => {
  return !(companyName.value && vacancyLink.value && hrName.value);
});

const loadInterview = async () => {
  try {
    if (!interviewId || !userStore.userId) return;

    interview.value = (await getDocumentById(
      userStore.userId,
      interviewId
    )) as InterviewInputInterface;
    if (interview.value) {
      companyName.value = interview.value.companyName;
      vacancyLink.value = interview.value.vacancyLink;
      hrName.value = interview.value.hrName;
      telegramUsername.value = interview.value.telegramUsername ?? '';
      whatsAppUsername.value = interview.value.whatsAppUsername ?? '';
      hrPhoneNumber.value = interview.value.hrPhoneNumber ?? '';
    }
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = () => {};

onMounted(() => loadInterview());
</script>
<template>
  <!-- spinner -->
  <spinner-component v-if="isLoading"></spinner-component>
  <!-- page content-->
  <template v-else>
    <div class="q-pt-xl q-pa-md q-mx-auto mw-500">
      <h2 class="title-md">Interview to {{ companyName }}</h2>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="required-tip">* - required fields</div>
        <q-input
          class="first-field field"
          filled
          type="text"
          label="Company name *"
          v-model="companyName"
          lazy-rules
          :rules="[validateRequiredInput]" />

        <q-input
          class="field"
          filled
          type="text"
          v-model="vacancyLink"
          label="Job listing link *"
          lazy-rules
          :rules="[validateRequiredInput]" />

        <q-input
          class="field"
          filled
          type="text"
          v-model="hrName"
          label="HR name *"
          lazy-rules
          :rules="[validateRequiredInput]" />

        <q-input
          class="field"
          filled
          type="text"
          v-model="telegramUsername"
          label="Telegram username" />

        <q-input
          class="field"
          filled
          type="text"
          v-model="whatsAppUsername"
          label="WhatsApp username" />

        <q-input
          class="field"
          filled
          type="text"
          v-model="hrPhoneNumber"
          label="Phone number" />

        <div class="flex q-col-gutter-sm ml-8">
          <q-input
            class="col pt-0"
            :error="isSalaryInvalid"
            filled
            type="number"
            v-model="minSalary"
            label="Minimum salary">
            <template #error>Invalid salary</template>
          </q-input>

          <q-input
            class="col pt-0"
            :error="isSalaryInvalid"
            filled
            type="number"
            v-model="maxSalary"
            label="Maximum salary" />
        </div>

        <div class="q-gutter-x-sm ml-8 mt-0">
          <q-radio
            v-model="result"
            val="reject"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="negative">
            <div class="text-subtitle1">Reject</div>
          </q-radio>
          <q-radio
            v-model="result"
            val="offer"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="positive"
            ><div class="text-subtitle1">Offer</div></q-radio
          >
        </div>

        <q-btn
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
.ml-8 {
  margin-left: 8px;
}

.mt-0 {
  margin-top: 0;
}

.pt-0 {
  padding-top: 0;
}

.title-md {
  margin-bottom: 50px;
}

.required-tip {
  color: $gray;
  letter-spacing: 0.1em;
}

.field {
  padding-bottom: 20px;
}

.first-field {
  margin-top: 0px;
}
</style>
