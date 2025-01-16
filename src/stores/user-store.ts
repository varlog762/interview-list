import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth';

import { firebaseSignUp, firebaseSignIn } from 'src/services/firebase';
import type { AuthInputInterface } from 'src/models/auth-input.interface';
import { RoutePathsEnum } from 'src/enums';
import useQuasarNotify from 'src/composables/useQuasarNotify';

/**
 * User store
 */
export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const showToast = useQuasarNotify();

  /**
   * User ID
   */
  const userId = ref<string | null>(null);

  /**
   * Whether the auth state is ready
   */
  const authReady = ref<boolean>(false);

  /**
   * Whether the user is logged in
   */
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  /**
   * Whether the store is currently handling an authentication request
   */
  const isLoading = ref<boolean>(false);

  /**
   * Initialize the auth state
   */
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

  /**
   * Sign up a user
   * @param authInput The user's authentication input
   */
  const signUp = (authInput: AuthInputInterface): void => {
    handleAuth(authInput, firebaseSignUp);
  };

  /**
   * Sign in a user
   * @param authInput The user's authentication input
   */
  const signIn = (authInput: AuthInputInterface): void => {
    handleAuth(authInput, firebaseSignIn);
  };

  /**
   * Handle an authentication request
   * @param authInput The user's authentication input
   * @param authCallback The authentication callback
   */
  const handleAuth = async (
    authInput: AuthInputInterface,
    authCallback: (email: string, password: string) => Promise<UserCredential>
  ): Promise<void> => {
    try {
      isLoading.value = true;
      const { email, password } = authInput;
      await authCallback(email, password);
      router.replace({
        path: `${RoutePathsEnum.ROOT}${RoutePathsEnum.INTERVIEWS}`,
      });
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
