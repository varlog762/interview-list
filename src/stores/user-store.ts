/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth';

import {} from 'src/enums';
import {
  firebaseSignUp,
  firebaseSignIn,
  firebaseSignOut,
} from 'src/services/firebase';
import { getErrorMessage } from 'src/utils';
import type { AuthInputInterface } from 'src/models/auth-input.interface';
import { RouteNames, ToastTypes } from 'src/enums';
import useQuasarNotify from 'src/composables/useQuasarNotify';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const showToast = useQuasarNotify();

  const userId = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  const initAuth = (): void => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => (userId.value = user?.uid ?? null));
  };
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
    try {
      isLoading.value = true;
      const { email, password } = authInput;
      await authCallback(email, password);
      router.push({ name: RouteNames.ROOT });
    } catch (error) {
      const errorMessage = getErrorMessage(error as Error);
      showToast(ToastTypes.NEGATIVE, errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    userId,
    isLoading,
    isLoggedIn,
    initAuth,
    signUp,
    signIn,
  };
});
