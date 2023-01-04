<template>
  <TaskModal
    v-model="task"
    :save="save"
    :visible="visible"
    :updating="updating"
    :hideModal="hideModal"
  />
  <div class="board-container">
    <div class="board-add-task-button">
      <IconButton @click="showCreateModal()" :icon="'➕'" />
    </div>
    <div class="tasks-wrapper">
      <div v-for="task in tasks" :key="task.id" class="tasks-container">
        <TaskBox
          :title="task.title"
          :description="task.description"
          :id="task.id"
          :save="save"
          :showEditModal="showEditModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TaskBox from "./TaskBox.vue";
import TaskModal from "./TaskModal.vue";
import IconButton from "./IconButton.vue";

import type { Task } from "../../../types";

const tasks = ref<Task[]>([]);
const task = ref<Task>({
  title: "",
  description: "",
  id: Math.floor(Math.random() * 1000000) + 1,
});
const visible = ref<boolean>(false);
const updating = ref<boolean>(false);

const resetFormData = () => {
  task.value = {
    title: "",
    description: "",
    id: Math.floor(Math.random() * 1000000) + 1,
  };
};

const hideModal = () => {
  resetFormData();
  visible.value = false;
};

const save = (_updating = false): void => {
  if (!validateTask) {
    return;
  }
  updating.value = _updating;
  if (updating.value) {
    console.log("apdejt");
    console.log(task.value);
    updateTask();
    resetFormData();
    hideModal();
    return;
  }
  pushTask();
  resetFormData();
  hideModal();
  return;
};

const showCreateModal = (): void => {
  updating.value = false;
  visible.value = true;
};

const showEditModal = (taskId: number): void => {
  console.log(taskId);
  updating.value = true;
  visible.value = true;
};

const pushTask = (): void => {
  tasks.value = [...tasks.value, task.value];
  hideModal();
};

const updateTask = () => {
  const objectIndex = tasks.value.findIndex((obj) => obj.id == task.value.id);

  tasks.value[objectIndex] = {
    title: task.value.title,
    description: task.value.description,
    id: task.value.id,
  };

  hideModal();
};

const validateTask = (): boolean => {
  if (task.value.description === "" || task.value.title === "") {
    return false;
  }
  return true;
};
</script>

<style lang="scss">
@import "../styles/Board.scss";
</style>
