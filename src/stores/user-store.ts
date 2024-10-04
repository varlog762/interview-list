/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { FirebaseError } from 'firebase/app';

import { firebaseSignUp } from 'src/services/firebase';
import { getErrorMessage } from 'src/utils';
import { AuthInputInterface } from 'src/models/auth-input.interface';
import { AuthErrors } from 'src/enums';

export const useUserStore = defineStore('user', () => {
  // TODO: set default userId value to null
  const userId = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  const signUp = async ({
    email,
    password,
  }: AuthInputInterface): Promise<boolean> => {
    try {
      isLoading.value = true;
      errorMessage.value = null;
      const userCredential = await firebaseSignUp(email, password);
      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;

      if (error instanceof FirebaseError) {
        errorMessage.value = getErrorMessage(error.code);
        return false;
      }

      errorMessage.value = AuthErrors.UNKNOWN_ERROR;
      return false;
    }
  };
  return {
    userId,
    isLoading,
    errorMessage,
    isLoggedIn,
    signUp,
  };
});
