<script setup lang="ts">
// This layout component is used for authentication and registration pages.
// It provides a consistent structure with a header and a page container for child routes.
</script>

<template>
  <!-- Main layout structure with a specific view configuration -->
  <q-layout view="hHh lpR fFf">
    <!-- Header section -->
    <q-header elevated class="bg-primary text-white">
      <!-- Toolbar within the header -->
      <q-toolbar class="q-pa-md">
        <!-- Application title with a logo avatar -->
        <q-toolbar-title class="text-weight-bold">
          <q-avatar rounded>
            <!-- Application logo -->
            <img src="/logo.png" />
          </q-avatar>
          INTERVIEW LIST
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Container for the main page content -->
    <q-page-container>
      <div class="container">
        <!-- Router view for rendering child routes -->
        <q-page>
          <router-view />
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>
