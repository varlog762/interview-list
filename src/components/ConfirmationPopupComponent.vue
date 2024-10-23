<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({
  name: 'ConfirmationPopupComponent',
});

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const props = defineProps<{
  isVisible: boolean;
}>();

const localVisible = ref(props.isVisible);

watch(
  () => props.isVisible,
  newVal => {
    localVisible.value = newVal;
  }
);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <q-dialog v-model="localVisible" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="fa-solid fa-trash" color="primary" text-color="white" />
        <span class="q-ml-sm"><slot></slot></span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="cancel" />
        <q-btn flat label="Delete" color="negative" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
