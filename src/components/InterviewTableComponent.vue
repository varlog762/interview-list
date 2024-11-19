<script setup lang="ts">
import type { InterviewInputInterface, TableColumnInterface } from 'src/models';
import StageTooltipComponent from 'src/components/StageTooltipComponent.vue';
import { RouteNamesEnum } from 'src/enums';
import { displaySalary, getStatusBadgeColor } from 'src/utils';

defineOptions({
  name: 'InterviewTableComponent',
});

const { interviewList } = defineProps<{
  interviewList: InterviewInputInterface[];
}>();

defineEmits<{ deleteInterview: [interviewId: string] }>();

const columns: TableColumnInterface[] = [
  {
    name: 'companyName',
    label: 'Company name',
    align: 'left',
    field: 'companyName',
    sortable: true,
    classes: 'text-body2',
  },
  {
    name: 'hrName',
    label: "HR's name",
    field: 'hrName',
    align: 'left',
    sortable: true,
  },
  {
    name: 'vacancyLink',
    label: 'Vacancy link',
    field: 'vacancyLink',
    align: 'left',
  },
  {
    name: 'contacts',
    label: 'Contacts',
    field: 'contacts',
    align: 'left',
  },
  {
    name: 'stages',
    label: 'Stages',
    align: 'left',
    field: 'stages',
  },
  {
    name: 'salaryRange',
    label: 'Salary range',
    align: 'left',
    field: 'maxSalary',
    sortable: true,
    sortOrder: 'da',
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true,
  },
  {
    name: 'controls',
    label: '',
    field: 'controls',
  },
];
</script>

<template>
  <div class="q-pt-md">
    <q-table
      style="max-height: 80vh"
      :rows="interviewList"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :rows-per-page-options="[0]">
      <template #body-cell-companyName="props">
        <q-td :props="props">{{ props.row.companyName }}</q-td>
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
              <q-icon size="sm" name="fa-brands fa-telegram" color="primary" />
              <q-tooltip class="bg-secondary text-body2">
                {{ props.row.telegramUsername }}
              </q-tooltip>
            </a>
            <a
              v-if="props.row.whatsAppUsername"
              :href="`https://wa.me/${props.row.whatsAppUsername}`"
              target="_blank">
              <q-icon size="sm" name="fab fa-whatsapp" color="positive" />
              <q-tooltip class="bg-secondary text-body2">
                {{ props.row.whatsAppUsername }}
              </q-tooltip>
            </a>
            <a
              v-if="props.row.hrPhoneNumber"
              :href="`tel:${props.row.hrPhoneNumber}`"
              target="_blank">
              <q-icon size="sm" name="fa-solid fa-phone" color="secondary" />
              <q-tooltip class="bg-secondary text-body2">
                {{ props.row.hrPhoneNumber }}
              </q-tooltip>
            </a>
          </div>
        </q-td>
      </template>

      <template #body-cell-stages="props">
        <q-td :props="props">
          <div class="flex justify-start q-gutter-xs">
            <q-badge
              rounded
              color="primary"
              class="text-body2 q-px-sm"
              v-for="(stage, index) in props.row.stages"
              :key="index">
              {{ index + 1 }}
              <q-tooltip>
                <StageTooltipComponent :stage="stage" />
              </q-tooltip>
            </q-badge>
          </div>
        </q-td>
      </template>

      <template #body-cell-salaryRange="props">
        <q-td :props="props">
          {{ displaySalary(props.row.minSalary, props.row.maxSalary) }}
        </q-td>
      </template>

      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge
            rounded
            class="text-body2 q-px-sm"
            :color="getStatusBadgeColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template #body-cell-controls="props">
        <q-td :props="props" class="flex justify-end">
          <router-link
            :to="{
              name: RouteNamesEnum.INTERVIEW,
              params: { id: props.row.id },
            }">
            <q-btn class="q-mr-sm" flat dense color="info" label="edit" />
          </router-link>
          <q-btn
            flat
            dense
            color="negative"
            label="delete"
            @click="$emit('deleteInterview', props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped></style>
