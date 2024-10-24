/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth';

import { firebaseSignUp, firebaseSignIn } from 'src/services/firebase';
import type { AuthInputInterface } from 'src/models/auth-input.interface';
import { RoutePaths } from 'src/enums';
import useQuasarNotify from 'src/composables/useQuasarNotify';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const showToast = useQuasarNotify();

  const userId = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const authReady = ref<boolean>(false);
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  const initAuth = async (): Promise<void> => {
    const auth = getAuth();
    return new Promise<void>(resolve => {
      onAuthStateChanged(auth, user => {
        userId.value = user?.uid ?? null;
        authReady.value = true;
        resolve();
      });
    });
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
      router.replace({ path: `${RoutePaths.ROOT}${RoutePaths.INTERVIEWS}` });
    } catch (error) {
      showToast(error as Error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    userId,
    authReady,
    isLoading,
    isLoggedIn,
    initAuth,
    signUp,
    signIn,
  };
});
