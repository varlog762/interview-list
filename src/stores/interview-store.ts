import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { InterviewInputInterface } from 'src/models';
import {
  firebaseGetAllInterviews,
  firebaseDeleteInterview,
} from 'src/services/firebase';
import { useUserStore } from 'src/stores/';
import useQuasarNotify from 'src/composables/useQuasarNotify';

/**
 * Interview store
 */
export const useInterviewStore = defineStore('interview', () => {
  const userStore = useUserStore();
  const showToast = useQuasarNotify();

  /**
   * The list of interviews for the current user
   */
  const interviewList = ref<InterviewInputInterface[]>([]);

  /**
   * Fetches all interviews for the current user from Firestore.
   * The interviews are retrieved in descending order of creation time.
   * If the user is not logged in, the function does nothing.
   */
  const fetchInterviews = async () => {
    if (!userStore.isLoggedIn) return;

    try {
      interviewList.value = await firebaseGetAllInterviews(
        userStore.userId as string
      );
    } catch (error) {
      showToast(error as Error);
    }
  };

  /**
   * Deletes an interview document with the given ID from Firestore.
   * If the deletion is successful, it fetches the updated list of interviews.
   * If the user is not logged in, the function does nothing.
   * @param docId The ID of the interview document to delete.
   */
  const deleteInterview = async (docId: string) => {
    if (!userStore.isLoggedIn) return;

    try {
      await firebaseDeleteInterview(userStore.userId as string, docId);
      await fetchInterviews();
    } catch (error) {
      showToast(error as Error);
    }
  };

  return { interviewList, fetchInterviews, deleteInterview };
});
