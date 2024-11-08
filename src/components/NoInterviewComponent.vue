<script setup lang="ts">
import { RouteNames } from 'src/enums';

defineOptions({
  name: 'NoInterviewComponent',
});
</script>

<template>
  <div class="q-pa-md absolute-center">
    <h2 class="title-md q-mb-xl">There are no interviews</h2>
    <router-link :to="{ name: RouteNames.ADD }" class="block q-mx-auto">
      <q-btn color="primary" label="Add a new one" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.block {
  max-width: 138px;
  display: block;
}
</style>
