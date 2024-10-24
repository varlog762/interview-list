<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type {
  InterviewInputInterface,
  TableColumnsInterface,
} from 'src/models';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { getAllInterviews, deleteInterview } from 'src/services/firebase';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';
import ConfirmationPopupComponent from 'src/components/ConfirmationPopupComponent.vue';
import { RouteNames } from 'src/enums';

defineOptions({
  name: 'InterviewListPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();

const interviews = ref<InterviewInputInterface[]>([]);
const interviewIdToDelete = ref<string | null>(null);
const isLoading = ref<boolean>(true);
const isPopupVisible = ref<boolean>(false);

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
    align: 'left',
  },
  {
    name: 'controls',
    label: '',
    field: 'controls',
  },
];

const loadInterviews = async () => {
  try {
    interviews.value = await getAllInterviews(userStore.userId as string);
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};
const showInterviewDeletionPopup = (id: string) => {
  interviewIdToDelete.value = id;
  isPopupVisible.value = true;
};

const cancelDeletion = () => {
  interviewIdToDelete.value = null;
  isPopupVisible.value = false;
};

const confirmDeletion = async () => {
  isPopupVisible.value = false;
  isLoading.value = true;

  try {
    if (interviewIdToDelete.value && userStore.userId) {
      await deleteInterview(userStore.userId, interviewIdToDelete.value);
    }
    loadInterviews();
  } catch (error) {
    showToast(error as Error);
  } finally {
    interviewIdToDelete.value = null;
    isLoading.value = false;
  }
};

onMounted(() => {
  loadInterviews();
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
            <template #body-cell-companyName="props">
              <q-td :props="props">
                <span class="text-body2">{{ props.row.companyName }}</span>
              </q-td>
            </template>

            <template #body-cell-hrName="props">
              <q-td :props="props">
                <q-badge color="primary" class="text-body2">
                  {{ props.row.hrName }}
                </q-badge>
              </q-td>
            </template>

            <template #body-cell-vacancyLink="props">
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

            <template #body-cell-telegramUsername="props">
              <q-td :props="props">
                <a
                  :href="`https://t.me/${props.row.telegramUsername}`"
                  target="_blank">
                  {{ props.row.telegramUsername }}
                </a>
              </q-td>
            </template>

            <template #body-cell-contacts="props">
              <q-td :props="props">
                <div class="flex justify-start q-gutter-sm">
                  <a
                    v-if="props.row.telegramUsername"
                    :href="`https://t.me/${props.row.telegramUsername}`"
                    target="_blank">
                    <q-icon
                      size="sm"
                      name="fa-brands fa-telegram"
                      color="primary" />
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
                    <q-icon
                      size="sm"
                      name="fa-solid fa-phone"
                      color="secondary" />
                  </a>
                </div>
              </q-td>
            </template>

            <template #body-cell-controls="props">
              <q-td :props="props" class="flex justify-end">
                <router-link
                  :to="{
                    name: RouteNames.INTERVIEW,
                    params: { id: props.row.id },
                  }">
                  <q-btn
                    class="q-mr-sm"
                    flat
                    dense
                    color="info"
                    label="edit"
                    @click="() => {}" />
                </router-link>
                <q-btn
                  flat
                  dense
                  color="negative"
                  label="delete"
                  @click="showInterviewDeletionPopup(props.row.id)" />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </template>
    <!-- TODO: implement this component-->
    <template v-else>THERE ARE NO INTERVIEWS</template>

    <!-- Delete confirmation popup -->
    <confirmation-popup-component
      :isVisible="isPopupVisible"
      @cancel="cancelDeletion"
      @hide="cancelDeletion"
      @confirm="confirmDeletion">
      Confirm deletion of this interview?
    </confirmation-popup-component>
  </template>
</template>

<style lang="scss" scoped></style>
