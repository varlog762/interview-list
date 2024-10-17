<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { InterviewInputInterface } from 'src/models';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { getAllInterviews } from 'src/services/firebase';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';

defineOptions({
  name: 'InterviewListPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();

const interviews = ref<InterviewInputInterface[]>([]);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    interviews.value = await getAllInterviews(userStore.userId as string);
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <spinner-component v-if="isLoading"></spinner-component>
  <template v-else>
    <template v-if="interviews.length"></template>
    <!-- TODO: implement this -->
    <template v-else>THERE ARE NO INTERVIEWS</template>
  </template>
</template>

<style lang="scss" scoped></style>
