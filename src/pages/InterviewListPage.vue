<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { InterviewInputInterface } from 'src/models';
import { useUserStore } from 'src/stores/user-store';
import { getAllInterviews } from 'src/services/firebase';

defineOptions({
  name: 'InterviewListPage',
});

const userStore = useUserStore();

const interviews = ref<InterviewInputInterface[]>([]);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    interviews.value = await getAllInterviews(userStore.userId as string);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>INTERVIEWS</div>
</template>

<style lang="scss" scoped></style>
