<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { InterviewInputInterface } from 'src/models';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import InterviewTableComponent from 'src/components/InterviewTableComponent.vue';
import ConfirmationPopupComponent from 'src/components/ConfirmationPopupComponent.vue';
import InterviewFilterComponent from 'src/components/InterviewFilterComponent.vue';
import NoInterviewsComponent from 'src/components/NoInterviewsComponent.vue';
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

const confirmInterviewDeletion = async () => {
  isPopupVisible.value = false;
  isLoading.value = true;

  try {
    if (!interviewIdToDelete.value) return;

    await interviewStore.deleteInterview(interviewIdToDelete.value);
    filteredInterviewList.value = [...interviewStore.interviewList];
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

  <div class="q-py-md q-pt-xl" v-else-if="interviewStore.interviewList.length">
    <h2 class="title-md q-mb-md">Your interviews</h2>
    <InterviewFilterComponent
      :interviewList="interviewStore.interviewList"
      @filtered-interviews="updateFilteredInterviews" />
    <InterviewTableComponent
      :interviewList="filteredInterviewList"
      @delete-interview="showInterviewDeletionPopup" />
  </div>

  <NoInterviewsComponent v-else />

  <!-- Delete confirmation popup -->
  <confirmation-popup-component
    :isVisible="isPopupVisible"
    @cancel="cancelDeletion"
    @hide="cancelDeletion"
    @confirm="confirmInterviewDeletion">
    Confirm deletion of this interview?
  </confirmation-popup-component>
</template>
