<script setup lang="ts">
/**
 * MainLayout component serves as the primary layout for all pages accessible after user authentication.
 * It includes a header with navigation tabs and a logout button, and dynamically renders child components
 * based on the current route.
 */
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import type { MenuItemInterface } from 'src/models/menu-item.interface';
import { useUserStore } from 'stores/user-store';
import { firebaseSignOut } from 'src/services/firebase';
import { RouteNamesEnum } from 'src/enums';

// Component name for debugging and development purposes
defineOptions({
  name: 'MainLayout',
});

// Dependencies
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// Navigation menu items for the application's main sections
const menuItems: MenuItemInterface[] = [
  { label: 'Interviews', icon: 'list', path: 'interviews' },
  { label: 'Add', icon: 'add', path: 'add' },
  { label: 'Statistics', icon: 'bar_chart', path: 'statistics' },
];

// Reactive value for tracking the active tab based on the route
const tab = ref(route.path.slice(1));

/**
 * Signs out the current user.
 */
const signOut = () => {
  firebaseSignOut();
};

/**
 * Watcher to navigate to the selected tab when `tab` changes
 */
watch(tab, newRoute => {
  router.push(`/${newRoute}`);
});

/**
 * Watcher to update `tab` when the route is manually changed
 */
watch(
  () => route.path,
  () => (tab.value = route.path.slice(1))
);

/**
 * Watcher to redirect to the auth page if the user logs out
 */
watch(
  () => userStore.userId,
  newUserId => {
    if (!newUserId) {
      router.push({ name: RouteNamesEnum.AUTH });
    }
  }
);
</script>

<template>
  <!-- Main layout structure with a header and page container -->
  <q-layout view="lHh Lpr lFf">
    <!-- Header section -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- Navigation tabs for main sections -->
        <q-tabs inline-label v-model="tab">
          <q-tab
            v-for="item in menuItems"
            :key="item.label"
            :name="item.path"
            :label="item.label"
            :icon="item.icon" />
        </q-tabs>
        <!-- Spacer to separate tabs from logout button -->
        <q-space />
        <!-- Logout button -->
        <q-btn
          @click="signOut"
          square
          color="primary"
          icon="logout"
          class="btn btn-logout" />
      </q-toolbar>
    </q-header>

    <!-- Container for rendering the main content of the selected route -->
    <q-page-container>
      <div class="container">
        <!-- Router view to display the content of the current route -->
        <q-page>
          <router-view />
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.btn-logout {
  &::before {
    box-shadow: none;
  }
}
</style>
