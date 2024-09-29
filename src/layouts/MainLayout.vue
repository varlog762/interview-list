<template>
  <q-layout view="lHh Lpr lFf"
    ><q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
        <q-tabs inline-label v-model="tab">
          <q-tab
            v-for="item in menuItems"
            :key="item.name"
            :name="item.name"
            :label="item.label"
            :icon="item.icon" />
        </q-tabs>
        <q-space />
        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

defineOptions({
  name: 'MainLayout',
});

const router = useRouter();
const route = useRoute();

const menuItems = [
  { label: 'Add', icon: 'add', name: '' },
  { label: 'Interviews', icon: 'list', name: 'interviews' },
  { label: 'Statistics', icon: 'bar_chart', name: 'statistics' },
];

const tab = ref(route.path.slice(1));

watch(tab, newValue => {
  router.push(`/${newValue}`);
});
</script>
<style scoped></style>
