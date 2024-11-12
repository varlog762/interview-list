<script setup lang="ts">
import { RouteNamesEnum } from 'src/enums';

defineOptions({
  name: 'NoInterviewComponent',
});
</script>

<template>
  <div class="q-pa-md absolute-center no-interview">
    <div>
      <img
        src="../assets/images/desert.png"
        alt="desert"
        class="no-interview-image" />
    </div>
    <div class="absolute-center">
      <h2 class="title-md q-mb-xl">There are no interviews</h2>
      <router-link :to="{ name: RouteNamesEnum.ADD }" class="block q-mx-auto">
        <q-btn color="primary" label="Add a new one" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-interview {
  width: 50vw;

  &-image {
    height: 100%;
    width: 100%;
    opacity: 0.2;
    filter: blur(3px);
  }
}

.block {
  max-width: 138px;
  display: block;
}
</style>
