<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { InterviewInputInterface } from 'src/models';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import InterviewTableComponent from 'src/components/InterviewTableComponent.vue';
import ConfirmationPopupComponent from 'src/components/ConfirmationPopupComponent.vue';
import InterviewFilterComponent from 'src/components/InterviewFilterComponent.vue';
import NoInterviewComponent from 'src/components/NoInterviewComponent.vue';
import { useInterviewStore } from 'src/stores';

defineOptions({
  name: 'InterviewListPage',
});

const interviewStore = useInterviewStore();

const filteredInterviewList = ref<InterviewInputInterface[]>([]);
const interviewIdToDelete = ref<string | null>(null);
const isLoading = ref<boolean>(true);
const isPopupVisible = ref<boolean>(false);

const getInterviews = async () => {
  try {
    await interviewStore.fetchInterviews();
    filteredInterviewList.value = [...interviewStore.interviewList];
  } finally {
    isLoading.value = false;
  }
};
const showInterviewDeletionPopup = (id: string) => {
  interviewIdToDelete.value = id;
  isPopupVisible.value = true;
};

const cancelDeletion = () => {
  interviewIdToDelete.value = null;
  isPopupVisible.value = false;
};

const confirmDeletion = async () => {
  isPopupVisible.value = false;
  isLoading.value = true;

  try {
    await interviewStore.deleteInterview(interviewIdToDelete.value!);
  } finally {
    interviewIdToDelete.value = null;
    isLoading.value = false;
  }
};

const updateFilteredInterviews = (
  filterInterviews: InterviewInputInterface[]
): void => {
  filteredInterviewList.value = filterInterviews;
};

onMounted(() => {
  getInterviews();
});
</script>

<template>
  <SpinnerComponent v-if="isLoading" />
  <template v-else>
    <template v-if="interviewStore.interviewList.length">
      <div class="q-pa-md q-pt-xl">
        <h2 class="title-md q-mb-md">Your interviews</h2>
        <InterviewFilterComponent
          :interviewList="interviewStore.interviewList"
          @filtered-interviews="updateFilteredInterviews" />
        <InterviewTableComponent
          :interviewList="filteredInterviewList"
          @delete-interview="showInterviewDeletionPopup" />
      </div>
    </template>

    <template v-else>
      <NoInterviewComponent />
    </template>

    <!-- Delete confirmation popup -->
    <confirmation-popup-component
      :isVisible="isPopupVisible"
      @cancel="cancelDeletion"
      @hide="cancelDeletion"
      @confirm="confirmDeletion">
      Confirm deletion of this interview?
    </confirmation-popup-component>
  </template>
</template>

<style lang="scss" scoped></style>
