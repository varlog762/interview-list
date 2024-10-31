<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import type { InterviewInputInterface } from 'src/models';
import InterviewStatusComponent from 'src/components/InterviewStatusComponent.vue';
import { RouteNames } from 'src/enums';
import { getDocumentById, updateInterview } from 'src/services/firebase';
import { useUserStore } from 'src/stores/user-store';
import useQuasarNotify from 'src/composables/useQuasarNotify';
import { validateRequiredInput, toggleDatePicker } from 'src/utils';
import SpinnerComponent from 'src/components/SpinnerComponent.vue';

defineOptions({
  name: 'InterviewPage',
});

const userStore = useUserStore();
const showToast = useQuasarNotify();
const route = useRoute();
const router = useRouter();

const interviewId = route.params.id as string;
const isLoading = ref<boolean>(true);
const interview = ref<InterviewInputInterface | null>(null);

const reversedStages = computed(() => {
  if (!interview.value?.stages) return [];

  return [...interview.value?.stages].reverse();
});

const isFormInvalid = computed<boolean>(() => {
  return !(
    interview.value?.companyName &&
    interview.value?.vacancyLink &&
    interview.value?.hrName
  );
});

const loadInterview = async (): Promise<void> => {
  isLoading.value = true;
  try {
    if (!interviewId || !userStore.userId) return;

    interview.value = await getDocumentById(userStore.userId, interviewId);

    if (interview.value.stages && interview.value.stages.length) {
      interview.value.stages.map(stage => ({
        ...stage,
        isDatePickerVisible: false,
      }));
    }
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};

const addStage = (): void => {
  if (!interview.value) return;

  const newStageId = uuidv4();

  interview.value.stages ??= [];

  interview.value.stages.push({
    interviewStageId: newStageId,
    interviewStageName: '',
    interviewStageDate: '(Click to select date and time)',
    interviewStageComment: '',
    isDatePickerVisible: false,
  });
};

const removeStageById = (stageId: string): void => {
  if (interview.value?.stages) {
    interview.value.stages = interview.value.stages.filter(
      stage => stage.interviewStageId !== stageId
    );
  }
};

const saveInterview = async () => {
  isLoading.value = true;

  try {
    if (!interviewId || !userStore.userId || !interview.value) return;

    if (interview.value.stages && interview.value.stages.length) {
      interview.value.stages = interview.value.stages.map(stage => ({
        interviewStageId: stage.interviewStageId,
        interviewStageName: stage.interviewStageName,
        interviewStageDate: stage.interviewStageDate,
        interviewStageComment: stage.interviewStageComment,
      }));
    }

    await updateInterview(userStore.userId, interviewId, interview.value!);
    router.push({ name: RouteNames.INTERVIEWS });
  } catch (error) {
    showToast(error as Error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadInterview();
});

watch(
  () => interview.value?.minSalary,
  newMinSalary => {
    if (!interview.value) return;

    if (
      newMinSalary != null &&
      interview.value.maxSalary != null &&
      newMinSalary > interview.value.maxSalary
    ) {
      interview.value.maxSalary = newMinSalary;
    }
  }
);
</script>
<template>
  <!-- spinner -->
  <spinner-component v-if="isLoading"></spinner-component>
  <!-- page content-->
  <template v-else>
    <template v-if="interview">
      <div class="q-pt-xl q-pa-md q-mx-auto max-w-700 q-pb-xl">
        <h2 class="title-md">Interview to {{ interview.companyName }}</h2>
        <q-form @submit="saveInterview" class="q-gutter-md">
          <div class="required-tip">* - required fields</div>
          <q-input
            class="first-field field"
            filled
            type="text"
            label="Company name *"
            v-model="interview.companyName"
            lazy-rules
            :rules="[validateRequiredInput]" />

          <q-input
            class="field"
            filled
            type="text"
            v-model="interview.vacancyLink"
            label="Job listing link *"
            lazy-rules
            :rules="[validateRequiredInput]" />

          <q-input
            class="field"
            filled
            type="text"
            v-model="interview.hrName"
            label="HR name *"
            lazy-rules
            :rules="[validateRequiredInput]" />

          <q-input
            class="field"
            filled
            type="text"
            v-model="interview.telegramUsername"
            label="Telegram username" />

          <q-input
            class="field"
            filled
            type="text"
            v-model="interview.whatsAppUsername"
            label="WhatsApp username" />

          <q-input
            class="field"
            filled
            type="text"
            v-model="interview.hrPhoneNumber"
            label="Phone number" />

          <div class="flex q-col-gutter-sm ml-8">
            <q-input
              class="col pt-0"
              filled
              type="number"
              v-model.number="interview.minSalary"
              :min="0"
              label="Minimum salary">
            </q-input>

            <q-input
              class="col pt-0"
              filled
              type="number"
              v-model.number="interview.maxSalary"
              :min="0"
              label="Maximum salary" />
          </div>

          <q-btn
            @click="addStage"
            class="q-mb-md"
            icon="fa-solid fa-plus"
            label="add stage"
            type="button"
            color="info" />

          <template v-if="interview?.stages">
            <TransitionGroup>
              <div
                class="interview-stage-container"
                v-for="stage in reversedStages"
                :key="stage.interviewStageId">
                <q-input
                  class="q-mb-sm field"
                  color="info"
                  filled
                  type="text"
                  v-model="stage.interviewStageName"
                  label="Stage name *"
                  lazy-rules
                  :rules="[validateRequiredInput]" />

                <div class="q-gutter-sm q-mb-md q-pb-sm">
                  <q-badge
                    color="info"
                    class="text-subtitle1 cursor-pointer"
                    @click="toggleDatePicker(stage)">
                    Date & time:
                    {{ stage.interviewStageDate }}
                  </q-badge>
                </div>

                <Transition>
                  <div
                    class="q-gutter-md row items-start justify-center q-mb-md"
                    v-show="stage.isDatePickerVisible">
                    <q-date
                      dense
                      v-model="stage.interviewStageDate"
                      mask="YYYY-MM-DD HH:mm"
                      color="info" />
                    <q-time
                      v-model="stage.interviewStageDate"
                      mask="YYYY-MM-DD HH:mm"
                      color="info" />
                  </div>
                </Transition>

                <q-input
                  color="info"
                  placeholder="Add comment"
                  v-model="stage.interviewStageComment"
                  autogrow
                  filled
                  min-height="5rem"
                  type="textarea"
                  class="q-mb-md" />
                <q-btn
                  @click="removeStageById(stage.interviewStageId)"
                  icon="fa-solid fa-trash"
                  label="delete stage"
                  type="button"
                  color="negative" />
              </div>
            </TransitionGroup>
          </template>

          <interview-status-component
            v-if="interview.status"
            v-model:status="interview.status">
          </interview-status-component>

          <q-btn
            icon="fa-regular fa-floppy-disk"
            label="save interview"
            type="submit"
            color="primary"
            :disable="isFormInvalid"
            :loading="isLoading" />
        </q-form>
      </div>
    </template>
    <!-- TODO: add error component -->
    <template v-else>Oops! Something went wrong...</template>
  </template>
</template>

<style lang="scss" scoped>
.ml-8 {
  margin-left: 8px;
}

.mt-0 {
  margin-top: 0;
}

.pt-0 {
  padding-top: 0;
}

.title-md {
  margin-bottom: 30px;
  text-align: left;
}

.required-tip {
  color: $gray;
  letter-spacing: 0.1em;
}

.field {
  padding-bottom: 20px;
}

.first-field {
  margin-top: 0px;
}

.interview-stage-container {
  margin-bottom: 20px;
  padding: 15px;
  border: 2px solid $light-gray;
  border-radius: 5px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
