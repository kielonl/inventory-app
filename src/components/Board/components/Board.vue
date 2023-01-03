<template>
  <Modal
    :task="task"
    :pushTask="pushTask"
    :toggleModal="toggleModal"
    :styles="styles"
  />
  <div class="board-container">
    <div class="board-add-task-button">
      <IconButton @click="toggleModal()" :icon="'➕'" />
    </div>
    <div class="tasks-wrapper">
      <div v-for="task in tasks" v-bind:key="task.id" class="tasks-container">
        <Task
          :title="task.title"
          :description="task.description"
          :id="task.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Task from "../components/Task.vue";
import Modal from "./Modal.vue";
import IconButton from "./IconButton.vue";

import type { Tasks } from "../../../types";

let tasks = ref<Tasks[]>([]);
const styles = ref<{ display: boolean }>({ display: true });
const task = ref<Tasks>({
  title: "",
  description: "",
  id: tasks.value.length,
});

const clearTasks = (): void => {
  task.value = { title: "", description: "", id: tasks.value.length };
};

const toggleModal = (): void => {
  styles.value.display = !styles.value.display;
  clearTasks();
};

const pushTask = (_task: Tasks): void => {
  if (task.value.title === "" || task.value.description === "") return;

  if (!tasks.value.length) {
    tasks.value = [_task];
    clearTasks();
    toggleModal();
    return;
  }
  tasks.value = [...tasks.value, _task];
  clearTasks();
  toggleModal();
  return;
};
</script>

<style lang="scss">
@import "../styles/Board.scss";
</style>
