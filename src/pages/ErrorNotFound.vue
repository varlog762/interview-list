<script setup lang="ts">
/**
 * ErrorNotFound component displays a simple 404 error page when a requested route is not found.
 */

// Component name for debugging and development purposes
defineOptions({
  name: 'ErrorNotFound',
});
</script>

<template>
  <!-- Fullscreen container for 404 error page -->
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <!-- Large 404 error code -->
      <div style="font-size: 30vh">404</div>

      <!-- Subtitle explaining the error -->
      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <!-- Button to navigate back to the home page -->
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps />
    </div>
  </div>
</template>
