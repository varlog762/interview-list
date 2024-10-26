<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import type { InterviewInputInterface, InterviewResultType } from 'src/models';
import { InterviewStatus } from 'src/enums';
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
const result = ref<InterviewResultType>(InterviewStatus.SCHEDULED);

const interviewStageName = ref<string>('');
const interviewStageDate = ref<string | null>(null);
const interviewStageComment = ref<string>('');

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
    <div class="q-pt-xl q-pa-md q-mx-auto max-w-700 q-pb-xl">
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

        <q-btn
          icon="fa-solid fa-plus"
          label="add stage"
          type="button"
          color="info" />

        <div class="interview-stage-container">
          <q-input
            class="field"
            filled
            type="text"
            v-model="interviewStageName"
            label="Stage name *"
            lazy-rules
            :rules="[validateRequiredInput]" />

          <div class="q-gutter-sm">
            <q-badge color="primary"> Model: {{ interviewStageDate }} </q-badge>
            <!-- TODO: delete this component -->
            <q-badge color="purple" text-color="white" class="q-ma-md">
              Mask: YYYY-MM-DD HH:mm
            </q-badge>
          </div>

          <div class="q-gutter-md row items-start justify-center q-mb-md">
            <q-date
              v-model="interviewStageDate"
              mask="YYYY-MM-DD HH:mm"
              color="primary" />
            <q-time
              v-model="interviewStageDate"
              mask="YYYY-MM-DD HH:mm"
              color="primary" />
          </div>
          <q-input
            placeholder="Add comment"
            v-model="interviewStageComment"
            filled
            type="textarea"
            class="q-mb-md" />
          <q-btn
            icon="fa-solid fa-trash"
            label="delete stage"
            type="button"
            color="negative" />
        </div>

        <div class="flex justify-around q-gutter-x-xs ml-8 mt-0">
          <q-radio
            v-model="result"
            :val="InterviewStatus.SCHEDULED"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="primary">
            <span class="text-body1">{{ InterviewStatus.SCHEDULED }}</span>
          </q-radio>
          <q-radio
            v-model="result"
            :val="InterviewStatus.PENDING"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="info">
            <span class="text-body1">{{ InterviewStatus.PENDING }}</span>
          </q-radio>
          <q-radio
            v-model="result"
            :val="InterviewStatus.OFFER"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="positive">
            <span class="text-body1">{{ InterviewStatus.OFFER }}</span>
          </q-radio>
          <q-radio
            v-model="result"
            :val="InterviewStatus.REJECT"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="negative">
            <span class="text-body1">{{ InterviewStatus.REJECT }}</span>
          </q-radio>
          <q-radio
            v-model="result"
            :val="InterviewStatus.CANCELED"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            color="warning">
            <span class="text-body1">{{ InterviewStatus.CANCELED }}</span>
          </q-radio>
        </div>

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

.interview-stage-container {
  margin-bottom: 20px;
  padding: 15px;
  border: 2px solid $light-gray;
  border-radius: 5px;
}
</style>
