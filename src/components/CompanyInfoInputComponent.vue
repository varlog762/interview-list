<script setup lang="ts">
import type { InterviewInputInterface } from 'src/models';
import { validateRequiredInput } from 'src/utils';

defineOptions({
  name: 'CompanyInfoInputComponent',
});

const companyInfo = defineModel<InterviewInputInterface>('companyInfo');
</script>

<template>
  <div class="required-tip">* - required fields</div>
  <div>
    <q-input
      class="first-field field"
      filled
      type="text"
      label="Company name *"
      v-model="companyInfo!.companyName"
      lazy-rules
      :rules="[validateRequiredInput]" />

    <q-input
      class="field"
      filled
      type="text"
      v-model="companyInfo!.vacancyLink"
      label="Job listing link *"
      lazy-rules
      :rules="[validateRequiredInput]" />

    <q-input
      class="field"
      filled
      type="text"
      v-model="companyInfo!.hrName"
      label="HR name *"
      lazy-rules
      :rules="[validateRequiredInput]" />

    <q-input
      class="field"
      filled
      type="text"
      v-model="companyInfo!.telegramUsername"
      label="Telegram username" />

    <q-input
      class="field"
      filled
      type="text"
      v-model="companyInfo!.whatsAppUsername"
      label="WhatsApp username" />

    <q-input
      class="field"
      filled
      type="text"
      v-model="companyInfo!.hrPhoneNumber"
      label="Phone number" />
  </div>
</template>

<style lang="scss" scoped>
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
