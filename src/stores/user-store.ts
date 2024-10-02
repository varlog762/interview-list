/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // TODO: set default userId value to null
  const userId = ref<string | null>('null');
  const isLoggedIn = computed<boolean>(() => !!userId.value);

  return { userId, isLoggedIn };
});
