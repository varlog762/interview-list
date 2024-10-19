<script setup lang="ts">
import { useRoute } from 'vue-router';

defineOptions({
  name: 'InterviewPage',
});

const route = useRoute();
</script>
<template>
  <div>INTERVIEW: {{ route.params.id }}</div>
</template>
