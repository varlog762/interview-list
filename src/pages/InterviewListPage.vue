<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type {
  InterviewInputInterface,
  TableColumnsInterface,
} from 'src/models';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { getAllInterviews } from 'src/services/firebase';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';

defineOptions({
  name: 'InterviewListPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();

const interviews = ref<InterviewInputInterface[]>([]);
const isLoading = ref<boolean>(true);

const columns: TableColumnsInterface[] = [
  {
    name: 'companyName',
    label: 'Company name',
    align: 'left',
    field: 'companyName',
  },
  { name: 'hrName', label: "HR's name", field: 'hrName', align: 'center' },
  {
    name: 'vacancyLink',
    label: 'Vacancy link',
    field: 'vacancyLink',
    align: 'center',
  },
  {
    name: 'contacts',
    label: 'Contacts',
    field: 'contacts',
  },
];

onMounted(async () => {
  try {
    interviews.value = await getAllInterviews(userStore.userId as string);
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <spinner-component v-if="isLoading"></spinner-component>
  <template v-else>
    <template v-if="interviews.length">
      <div class="q-pa-md q-pt-xl">
        <h2 class="title-md">Your interviews</h2>
        <div class="q-pa-md">
          <q-table :rows="interviews" :columns="columns" row-key="name">
            <!-- Custom slot for companyName -->
            <template v-slot:body-cell-companyName="props">
              <q-td :props="props">
                <strong>{{ props.row.companyName }}</strong>
              </q-td>
            </template>

            <template v-slot:body-cell-hrName="props">
              <q-td :props="props">
                <q-badge color="primary">
                  {{ props.row.hrName }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-vacancyLink="props">
              <q-td :props="props">
                <q-btn
                  flat
                  dense
                  color="primary"
                  :href="props.row.vacancyLink"
                  target="_blank">
                  Open Vacancy
                </q-btn>
              </q-td>
            </template>

            <template v-slot:body-cell-telegramUsername="props">
              <q-td :props="props">
                <a
                  :href="`https://t.me/${props.row.telegramUsername}`"
                  target="_blank">
                  {{ props.row.telegramUsername }}
                </a>
              </q-td>
            </template>
            <template v-slot:body-cell-contacts="props">
              <q-td :props="props">
                <div class="flex justify-end q-gutter-xs">
                  <a
                    v-if="props.row.telegramUsername"
                    :href="`https://t.me/${props.row.telegramUsername}`"
                    target="_blank">
                    <q-icon size="sm" name="telegram" color="primary" />
                  </a>
                  <a
                    v-if="props.row.whatsAppUsername"
                    :href="`https://wa.me/${props.row.whatsAppUsername}`"
                    target="_blank">
                    <q-icon size="sm" name="fab fa-whatsapp" color="positive" />
                  </a>
                  <a
                    v-if="props.row.hrPhoneNumber"
                    :href="`tel:${props.row.hrPhoneNumber}`"
                    target="_blank">
                    <q-icon size="sm" name="phone" color="info" />
                  </a>
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </template>
    <!-- TODO: implement this component-->
    <template v-else>THERE ARE NO INTERVIEWS</template>
  </template>
</template>

<style lang="scss" scoped></style>
