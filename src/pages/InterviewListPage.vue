<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { InterviewInputInterface } from 'src/models';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import InterviewTableComponent from 'src/components/InterviewTableComponent.vue';
import ConfirmationPopupComponent from 'src/components/ConfirmationPopupComponent.vue';
import InterviewFilterComponent from 'src/components/InterviewFilterComponent.vue';
import NoInterviewComponent from 'src/components/NoInterviewComponent.vue';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { getAllInterviews, deleteInterview } from 'src/services/firebase';

defineOptions({
  name: 'InterviewListPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();

const interviewList = ref<InterviewInputInterface[]>([]);
const filteredInterviewList = ref<InterviewInputInterface[]>([]);
const interviewIdToDelete = ref<string | null>(null);
const isLoading = ref<boolean>(true);
const isPopupVisible = ref<boolean>(false);

const loadInterviews = async () => {
  try {
    interviewList.value = await getAllInterviews(userStore.userId as string);
    filteredInterviewList.value = [...interviewList.value];
  } catch (error) {
    showToast(error as Error);
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
    if (!interviewIdToDelete.value || !userStore.userId) return;

    await deleteInterview(userStore.userId, interviewIdToDelete.value);
    loadInterviews();
  } catch (error) {
    showToast(error as Error);
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
  loadInterviews();
});
</script>

<template>
  <SpinnerComponent v-if="isLoading" />
  <template v-else>
    <template v-if="interviewList.length">
      <div class="q-pa-md q-pt-xl">
        <h2 class="title-md q-mb-md">Your interviews</h2>
        <InterviewFilterComponent
          :interviewList="interviewList"
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
