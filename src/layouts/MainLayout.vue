<template>
  <q-layout view="lHh Lpr lFf"
    ><q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
        <q-tabs v-model="tab">
          <q-tab name="add" label="Добавить" />
          <q-tab name="interviews" label="Список собеседований" />
          <q-tab name="statistics" label="Статистика" />
        </q-tabs>
        <!-- <q-btn flat round dense icon="whatshot" /> -->
      </q-toolbar>
    </q-header></q-layout
  >
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const tab = ref('add');
</script>
