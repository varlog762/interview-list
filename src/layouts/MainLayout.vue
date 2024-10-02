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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { MenuItemInterface } from 'src/models/menu-item.interface';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useUserStore } from 'stores/user-store';

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

watch(tab, newValue => {
  router.push(`/${newValue}`);
});
watch(route, () => {
  tab.value = route.path.slice(1);
});
watch(userStore, () => {
  if (!userStore.userId) {
    router.push('/auth');
  }
});
</script>
<style scoped>
.btn-logout {
  &::before {
    box-shadow: none;
  }
}
</style>
