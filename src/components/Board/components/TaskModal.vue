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
      <button
        v-if="updating"
        class="modal-update-button"
        @click="
          updateTask(props.taskId, {
            title: task.title,
            description: task.description,
          })
        "
      >
        update
      </button>
      <button class="modal-textarea-button" v-if="!updating" @click="_pushTask">
        ADD
      </button>
      <button class="modal-close-button" @click="_hideModal()">CANCEL</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from "@/types";
import { ref } from "vue";

interface Props {
  taskId: number;
  pushTask(task: Task): void;
  hideModal(): void;
  visible: boolean;
  updateTask(id: number, updatedTask: Omit<Task, "id">): void;
  updating: boolean;
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

const _hideModal = (): void => {
  props.hideModal();
  clearTask();
};

const _pushTask = (): void => {
  props.pushTask({
    title: task.value.title,
    description: task.value.description,
    id: props.taskId,
  });
  props.hideModal();
  clearTask();
};
</script>

<style scoped lang="scss">
@import "../styles/TaskModal.scss";
</style>
