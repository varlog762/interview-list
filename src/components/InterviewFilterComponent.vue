<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import type { InterviewStatusType, InterviewInputInterface } from 'src/models';
import { InterviewStatusEnum, FilterOptionsEnum } from 'src/enums';

defineOptions({
  name: 'InterviewFilterComponent',
});

const { interviewList } = defineProps<{
  interviewList: InterviewInputInterface[];
}>();

const emit = defineEmits<{
  (e: 'filteredInterviews', value: InterviewInputInterface[]): void;
}>();

const filterOptions = ref<string[]>(Object.values(FilterOptionsEnum));
const statusOptions = ref<InterviewStatusType[]>(
  Object.values(InterviewStatusEnum)
);
const selectedFilterType = ref<string | null>(null);
const companyNameQuery = ref<string | null>(null);
const selectedStatus = ref<InterviewStatusType | null>(null);

const filteredInterviews = computed(() => {
  let filteredList = interviewList;

  if (selectedFilterType.value === 'Company name' && companyNameQuery.value) {
    filteredList = filteredList.filter(interview =>
      interview.companyName
        .toLowerCase()
        .includes(companyNameQuery.value!.toLowerCase())
    );
  } else if (selectedFilterType.value === 'Status' && selectedStatus.value) {
    filteredList = filteredList.filter(
      interview => interview.status === selectedStatus.value
    );
  }

  return filteredList;
});

const isResetButtonDisabled = computed<boolean>(
  () => !selectedFilterType.value
);

const resetFilter = () => {
  selectedFilterType.value = null;
  companyNameQuery.value = null;
  selectedStatus.value = null;
};

watch(selectedFilterType, () => {
  companyNameQuery.value = null;
  selectedStatus.value = null;
});

watch(filteredInterviews, () => {
  emit('filteredInterviews', filteredInterviews.value);
});
</script>

<template>
  <div class="q-pb-none">
    <q-form
      class="q-px-md q-gutter-md flex justify-between"
      @reset="resetFilter">
      <div class="flex q-gutter-x-md justify-start">
        <q-select
          dense
          filled
          v-model="selectedFilterType"
          :options="filterOptions"
          label="Filter by"
          class="q-ml-none field-min-width" />
        <Transition>
          <q-input
            v-if="selectedFilterType === 'Company name'"
            dense
            filled
            v-model="companyNameQuery"
            label="Enter company name"
            class="field-min-width" />
        </Transition>

        <Transition>
          <q-select
            v-if="selectedFilterType === 'Status'"
            dense
            filled
            v-model="selectedStatus"
            :options="statusOptions"
            label="Select status"
            class="field-min-width" />
        </Transition>
      </div>

      <q-btn
        :disabled="isResetButtonDisabled"
        label="Reset filter"
        type="reset"
        color="negative"
        flat
        class="q-ml-sm reset-button" />
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.reset-button {
  max-height: 56px;
}

.field-min-width {
  min-width: 200px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}
</style>
