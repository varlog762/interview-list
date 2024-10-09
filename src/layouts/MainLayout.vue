<template>
  <q-layout view="lHh Lpr lFf"
    ><q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-tabs inline-label v-model="tab">
          <q-tab
            v-for="item in menuItems"
            :key="item.label"
            :name="item.path"
            :label="item.label"
            :icon="item.icon" />
        </q-tabs>
        <q-space />
        <q-btn
          @click="userStore.userId = null"
          square
          color="primary"
          icon="logout"
          class="btn btn-logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { MenuItemInterface } from 'src/models/menu-item.interface';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useUserStore } from 'stores/user-store';
import { RouteNames } from 'src/enums';

defineOptions({
  name: 'MainLayout',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const menuItems: MenuItemInterface[] = [
  { label: 'Add', icon: 'add', path: '' },
  { label: 'Interviews', icon: 'list', path: 'interviews' },
  { label: 'Statistics', icon: 'bar_chart', path: 'statistics' },
];

const tab = ref(route.path.slice(1));

watch(tab, newRoute => {
  router.push(`/${newRoute}`);
});
/**
 * Correctly change tab value on route changed manually
 */
watch(
  () => route.path,
  () => (tab.value = route.path.slice(1))
);
watch(
  () => userStore.userId,
  newUserId => {
    if (!newUserId) {
      router.push({ name: RouteNames.AUTH });
    }
  }
);
</script>
<style scoped>
.btn-logout {
  &::before {
    box-shadow: none;
  }
}
</style>
