/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

import {
  firebaseSignUp,
  firebaseSignIn,
  firebaseSignOut,
} from 'src/services/firebase';
import { getErrorMessage } from 'src/utils';
import { AuthInputInterface } from 'src/models/auth-input.interface';
import { AuthErrors } from 'src/enums';
import { AuthMessages } from 'src/enums';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { ToastTypes } from 'src/enums';

export const useUserStore = defineStore('user', () => {
  const showToast = useQuasarNotify();
  // TODO: set default userId value to null
  const userId = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  const signUp = (authInput: AuthInputInterface): void => {
    handlePostData(authInput, AuthMessages.SIGN_UP_SUCCESS, firebaseSignUp);
  };

  const signIn = (authInput: AuthInputInterface): void => {
    handlePostData(authInput, AuthMessages.SIGN_IN_SUCCESS, firebaseSignIn);
  };

  const handlePostData = async (
    authInput: AuthInputInterface,
    positiveMessage: string,
    cb: (email: string, password: string) => Promise<UserCredential>
  ) => {
    const { email, password } = authInput;
    try {
      isLoading.value = true;
      const userCredential = await cb(email, password);
      console.dir(userCredential);
      showToast(ToastTypes.POSITIVE, positiveMessage);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;

      if (error instanceof FirebaseError) {
        const errorMessage = getErrorMessage(error.code);
        showToast(ToastTypes.NEGATIVE, errorMessage);
        return;
      }

      showToast(ToastTypes.NEGATIVE, AuthErrors.UNKNOWN_ERROR);
    }
  };
  return {
    userId,
    isLoading,
    isLoggedIn,
    signUp,
    signIn,
  };
});
