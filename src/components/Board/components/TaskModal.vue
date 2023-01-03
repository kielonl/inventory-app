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
      <button class="modal-textarea-button" @click="_pushTask">ADD</button>
      <button class="modal-close-button" @click="toggleModal()">CANCEL</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from "@/types";
import { ref } from "vue";

interface Props {
  taskId: number;
  pushTask(task: Task): void;
  setVisible(): void;
  visible: boolean;
}

const props = defineProps<Props>();

const task = ref<Task>({
  title: "",
  description: "",
  id: props.taskId,
});

const clearTask = (): void => {
  task.value = { title: "", description: "", id: props.taskId };
};

const toggleModal = (): void => {
  props.setVisible();
  clearTask();
};

const _pushTask = (): void => {
  props.pushTask({
    title: task.value.title,
    description: task.value.description,
    id: props.taskId,
  });
  toggleModal();
};
</script>

<style scoped lang="scss">
@import "../styles/TaskModal.scss";
</style>
