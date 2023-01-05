<template>
  <TaskModal
    v-model="task"
    :save="save"
    :visible="visible"
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
import TaskBox from "./TaskBox.vue";
import TaskModal from "./TaskModal.vue";
import IconButton from "./IconButton.vue";

import { ref, reactive, onMounted } from "vue";
import * as api from "../../../services/axiosApiCall";
import type { Task } from "../../../types";

const state = reactive<any>({
  tasks: [],
});

onMounted(async () => {
  state.tasks = await api.read();
});

const tasks = ref<Task[]>([]);
const task = ref<Task>({
  title: "",
  description: "",
});
const visible = ref<boolean>(false);

const resetFormData = () => {
  task.value = {
    title: "",
    description: "",
  };
};

const hideModal = () => {
  visible.value = false;
};

const save = (): void => {
  if (validateTask()) {
    return;
  }

  if (findTaskIndex(task.value.id) === -1) {
    pushTask();
  } else {
    updateTask();
  }

  resetFormData();
  hideModal();
  return;
};

const showCreateModal = (): void => {
  visible.value = true;
};

const showEditModal = (taskId: number): void => {
  const objectIndex = findTaskIndex(taskId);

  task.value = {
    title: tasks.value[objectIndex].title,
    description: tasks.value[objectIndex].description,
    id: tasks.value[objectIndex].id,
  };

  visible.value = true;
};

const findTaskIndex = (id: number | undefined): number => {
  return tasks.value.findIndex((obj) => obj.id == id);
};

const pushTask = (): void => {
  tasks.value = [
    ...tasks.value,
    {
      title: task.value.title,
      description: task.value.description,
      id: Math.floor(Math.random() * 1000000) + 1,
    },
  ];
  hideModal();
};

const updateTask = () => {
  if (task.value.id === undefined) {
    return;
  }

  tasks.value[findTaskIndex(task.value.id)] = {
    title: task.value.title,
    description: task.value.description,
    id: task.value.id,
  };

  hideModal();
};

const validateTask = (): boolean => {
  return task.value.description === "" || task.value.title === "";
};
</script>

<style lang="scss">
@import "../styles/TaskBoard.scss";
</style>
