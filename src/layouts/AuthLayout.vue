<script setup lang="ts"></script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-weight-bold">
          <q-avatar rounded>
            <img src="/src/assets/images/logo.png" />
          </q-avatar>
          INTERVIEW LIST
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
