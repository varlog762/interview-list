import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { InterviewInputInterface } from 'src/models';
import {
  firebaseGetAllInterviews,
  firebaseDeleteInterview,
} from 'src/services/firebase';
import { useUserStore } from 'src/stores/';
import useQuasarNotify from 'src/composables/useQuasarNotify';

export const useInterviewStore = defineStore('interview', () => {
  const userStore = useUserStore();
  const showToast = useQuasarNotify();

  const interviewList = ref<InterviewInputInterface[]>([]);

  const fetchInterviews = async () => {
    try {
      interviewList.value = await firebaseGetAllInterviews(
        userStore.userId as string
      );
    } catch (error) {
      showToast(error as Error);
    }
  };

  const deleteInterview = async (docId: string) => {
    try {
      await firebaseDeleteInterview(userStore.userId as string, docId);
      await fetchInterviews();
    } catch (error) {
      showToast(error as Error);
    }
  };

  return { interviewList, fetchInterviews, deleteInterview };
});
