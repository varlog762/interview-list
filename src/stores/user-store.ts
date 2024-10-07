/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

import { RouteNames } from 'src/enums';

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
  const router = useRouter();
  const showToast = useQuasarNotify();
  // TODO: set default userId value to null
  const userId = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  const signUp = (authInput: AuthInputInterface): void => {
    handleAuth(authInput, firebaseSignUp);
  };

  const signIn = (authInput: AuthInputInterface): void => {
    handleAuth(authInput, firebaseSignIn);
  };

  const handleAuth = async (
    authInput: AuthInputInterface,
    authCallback: (email: string, password: string) => Promise<UserCredential>
  ): Promise<void> => {
    isLoading.value = true;

    try {
      const { email, password } = authInput;
      await authCallback(email, password);
      router.push({ name: RouteNames.ROOT });
    } catch (error) {
      catchError(error as Error);
    } finally {
      isLoading.value = false;
    }
  };

  const catchError = (error: Error): void => {
    if (error instanceof FirebaseError) {
      const errorMessage = getErrorMessage(error.code);
      showToast(ToastTypes.NEGATIVE, errorMessage);
      return;
    }

    showToast(ToastTypes.NEGATIVE, AuthErrors.UNKNOWN_ERROR);
  };
  return {
    userId,
    isLoading,
    isLoggedIn,
    signUp,
    signIn,
  };
});
