<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type {
  InterviewInputInterface,
  TableColumnsInterface,
} from 'src/models';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { getAllInterviews } from 'src/services/firebase';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';

defineOptions({
  name: 'InterviewListPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();

const interviews = ref<InterviewInputInterface[]>([]);
const isLoading = ref<boolean>(true);

const columns: TableColumnsInterface[] = [
  {
    name: 'companyName',
    label: 'Company name',
    align: 'left',
    field: 'companyName',
  },
  {
    name: 'vacancyLink',
    label: 'Vacancy link',
    field: 'vacancyLink',
    align: 'left',
  },
  { name: 'hrName', label: "HR's name", field: 'hrName' },
  {
    name: 'telegramUsername',
    label: 'Telegram username',
    field: 'telegramUsername',
  },
  {
    name: 'whatsAppUsername',
    label: 'WhatsApp username',
    field: 'whatsAppUsername',
  },
  { name: 'hrPhoneNumber', label: 'Phone number', field: 'hrPhoneNumber' },
];

onMounted(async () => {
  try {
    interviews.value = await getAllInterviews(userStore.userId as string);
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <spinner-component v-if="isLoading"></spinner-component>
  <template v-else>
    <template v-if="interviews.length">
      <div class="q-pa-md q-pt-xl">
        <h2 class="title-md">Your interviews</h2>
        <div class="q-pa-md">
          <q-table :rows="interviews" :columns="columns" row-key="name" />
        </div>
      </div>
    </template>
    <!-- TODO: implement this component-->
    <template v-else>THERE ARE NO INTERVIEWS</template>
  </template>
</template>

<style lang="scss" scoped></style>
