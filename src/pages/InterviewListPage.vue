<script setup lang="ts">
/**
 * This component serves as the main page for managing user interviews.
 * It displays a list of interviews with filtering and deletion options.
 * Users can view all interviews, filter them based on certain criteria, and delete selected
 * interviews using a confirmation popup.
 */
import { ref, onMounted } from 'vue';

import type { InterviewInputInterface } from 'src/models';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import InterviewTableComponent from 'src/components/InterviewTableComponent.vue';
import ConfirmationPopupComponent from 'src/components/ConfirmationPopupComponent.vue';
import InterviewFilterComponent from 'src/components/InterviewFilterComponent.vue';
import NoInterviewsComponent from 'src/components/NoInterviewsComponent.vue';
import { useInterviewStore } from 'src/stores';

// Component name for debugging and development purposes
defineOptions({
  name: 'InterviewListPage',
});

// Initialize the interview store to manage the state of interviews
const interviewStore = useInterviewStore();

// Reactive state for the filtered list of interviews
const filteredInterviewList = ref<InterviewInputInterface[]>([]);

// ID of the interview to be deleted
const interviewIdToDelete = ref<string | null>(null);

// Loading state for fetching or deleting interviews
const isLoading = ref<boolean>(true);

// State to control the visibility of the confirmation popup
const isPopupVisible = ref<boolean>(false);

/**
 * Fetches all interviews from the backend and updates the filteredInterviewList
 * reactive state. It also sets the isLoading state to false after the operation
 * is finished.
 */
const getInterviews = async () => {
  try {
    await interviewStore.fetchInterviews();
    filteredInterviewList.value = [...interviewStore.interviewList];
  } finally {
    isLoading.value = false;
  }
};

/**
 * Displays the interview deletion confirmation popup.
 * Sets the ID of the interview to be deleted and makes the popup visible.
 * @param id - The ID of the interview to be deleted.
 */
const showInterviewDeletionPopup = (id: string) => {
  interviewIdToDelete.value = id;
  isPopupVisible.value = true;
};

/**
 * Cancels the deletion of an interview.
 * Hides the deletion confirmation popup and resets the ID of the interview to be deleted.
 */
const cancelDeletion = () => {
  interviewIdToDelete.value = null;
  isPopupVisible.value = false;
};

/**
 * Confirms the deletion of an interview by hiding the confirmation popup,
 * setting the loading state, and invoking the delete operation on the
 * interview store. Updates the filtered interview list after deletion.
 * Resets the interview ID to be deleted and the loading state once the
 * operation is complete.
 */
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

/**
 * Updates the reactive state of the filteredInterviewList with the given array
 * of InterviewInputInterface objects.
 * @param {InterviewInputInterface[]} filterInterviews - The array of interviews
 *   to be used to update the filteredInterviewList reactive state.
 */
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
  <!-- Display a spinner while interviews are being loaded -->
  <SpinnerComponent v-if="isLoading" />

  <!-- Display the list of interviews if available -->
  <div class="q-py-md q-pt-xl" v-else-if="interviewStore.interviewList.length">
    <h2 class="title-md q-mb-md">Your interviews</h2>

    <!-- Filter component to refine the interview list -->
    <InterviewFilterComponent
      :interviewList="interviewStore.interviewList"
      @filtered-interviews="updateFilteredInterviews" />

    <!-- Table component to display the interviews -->
    <InterviewTableComponent
      :interviewList="filteredInterviewList"
      @delete-interview="showInterviewDeletionPopup" />
  </div>

  <!-- Display a fallback component if no interviews are available -->
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
