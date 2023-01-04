<template>
  <div :class="{ 'modal-backdrop': visible }"></div>
  <div class="modal-container" :class="{ 'modal-hidden': !visible }">
    <label for="title">Title</label>

    <input
      class="modal-title"
      spellcheck="false"
      placeholder="..."
      name="title"
      v-model="task.title"
    />
    <label for="description">Description</label>
    <textarea
      rows="4"
      cols="40"
      class="modal-description-textarea"
      type="text"
      v-model="task.description"
      placeholder="..."
      name="description"
    />
    <div class="modal-buttons">
      <button class="modal-update-button" @click="updateTask()" v-if="updating">
        update
      </button>
      <button v-if="!updating" class="modal-add-button" @click="_pushTask()">
        ADD
      </button>
      <button class="modal-close-button" @click="_hideModal()">CANCEL</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from "@/types";
import { computed } from "vue";

interface Props {
  modelValue: Task;
  save(updating: boolean): void;
  visible: boolean;
  updating: boolean;
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
    title: "",
    description: "",
    id: Math.floor(Math.random() * 1000000) + 1,
  };
};

const _hideModal = (): void => {
  props.hideModal();
  clearTask();
};

const _pushTask = (): void => {
  props.save(false);
  clearTask();
};

const updateTask = (): void => {
  props.save(true);
  clearTask();
};
</script>

<style scoped lang="scss">
@import "../styles/TaskModal.scss";
</style>
