<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import useQuasarNotify from 'src/composables/useQuasarNotify';
import { useUserStore } from 'src/stores/user-store';
import type { InterviewInputInterface } from 'src/models';
import { createInterview } from 'src/services/firebase';
import { RouteNames } from 'src/enums';
import { validateRequiredInput } from 'src/utils';

defineOptions({ name: 'AddInterviewPage' });
const router = useRouter();
const userStore = useUserStore();
const showToast = useQuasarNotify();

const companyName = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const telegramUsername = ref<string>('');
const whatsAppUsername = ref<string>('');
const hrPhoneNumber = ref<string>('');

const isLoading = ref<boolean>(false);
const isFormInvalid = computed<boolean>(() => {
  return !(companyName.value && vacancyLink.value && hrName.value);
});

const onSubmit = async () => {
  const interviewInput: InterviewInputInterface = {
    id: uuidv4(),
    companyName: companyName.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    telegramUsername: telegramUsername.value,
    whatsAppUsername: whatsAppUsername.value,
    hrPhoneNumber: hrPhoneNumber.value,
    createdAt: new Date(),
  };

  try {
    isLoading.value = true;
    await createInterview(userStore.userId as string, interviewInput);
    router.push({ name: RouteNames.INTERVIEWS });
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="form-wrapper">
    <div class="q-pa-md q-mx-auto" style="max-width: 500px">
      <h2 class="title-md">Add new interview</h2>
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

        <q-btn
          label="add interview"
          type="submit"
          color="primary"
          :disable="isFormInvalid"
          :loading="isLoading" />
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
