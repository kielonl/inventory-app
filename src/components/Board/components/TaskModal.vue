<template>
  <div :class="{ 'modal-backdrop': visible }"></div>
  <Transition name="fade">
    <div class="modal-container" v-if="visible">
      <label for="title">Title</label>

      <input
        class="modal-title"
        spellcheck="false"
        placeholder="..."
        name="title"
        v-model="task.type"
      />
      <label for="description">Description</label>
      <textarea
        rows="4"
        cols="40"
        class="modal-description-textarea"
        type="text"
        v-model="task.name"
        placeholder="..."
        name="description"
      />
      <div class="modal-buttons">
        <button
          class="modal-update-button"
          v-if="task.uuid !== undefined"
          @click="updateTask()"
        >
          update
        </button>
        <button
          class="modal-add-button"
          v-if="task.uuid === undefined"
          @click="_pushTask()"
        >
          ADD
        </button>
        <button class="modal-close-button" @click="_hideModal()">CANCEL</button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { Task } from "@/types";
import { computed } from "vue";

interface Props {
  modelValue: Task;
  save(): void;
  visible: boolean;
  hideModal(): void;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const task = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});

const clearTask = (): void => {
  task.value = {
    type: "",
    name: "",
    uuid: task.value.uuid,
  };
};

const _hideModal = (): void => {
  props.hideModal();
  clearTask();
};

const _pushTask = (): void => {
  props.save();
  clearTask();
};

const updateTask = (): void => {
  props.save();
  clearTask();
};
</script>

<style scoped lang="scss">
@import "../styles/TaskModal.scss";
</style>
