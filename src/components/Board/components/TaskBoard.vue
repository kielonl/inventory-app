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
      <div v-for="task in state.tasks" :key="task.uuid" class="tasks-container">
        <TaskBox
          :type="task.type"
          :name="task.name"
          :id="task.uuid"
          :save="save"
          :showEditModal="showEditModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import TaskBox from "./TaskBox.vue";
import TaskModal from "./TaskModal.vue";
import IconButton from "./IconButton.vue";

import * as api from "../../../services/taskService";
import type { Task } from "../../../types";

const state = reactive<any>({
  tasks: [],
});

onMounted(async () => {
  state.tasks = await api.read();
});

// const tasks = ref<Task[]>([]);
const task = ref<Task>({
  type: "",
  name: "",
});
const visible = ref<boolean>(false);

const resetFormData = () => {
  task.value = {
    type: "",
    name: "",
  };
};

const hideModal = () => {
  visible.value = false;
};

const save = (): void => {
  if (validateTask()) {
    return;
  }

  if (findTaskIndex(task.value.uuid) === -1) {
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

const showEditModal = (taskId: string): void => {
  const objectIndex = findTaskIndex(taskId);

  task.value = {
    type: state.tasks[objectIndex].type,
    name: state.tasks[objectIndex].name,
    uuid: state.tasks[objectIndex].uuid,
  };

  visible.value = true;
};

const findTaskIndex = (TaskId: string | undefined): number => {
  return state.tasks.findIndex((obj: any) => obj.uuid == TaskId);
};

const pushTask = async (): Promise<void> => {
  const result = await api.write({
    type: task.value.type,
    name: task.value.name,
  });

  state.tasks = [...state.tasks, result];

  hideModal();
};

const updateTask = async (): Promise<void> => {
  if (task.value.uuid === undefined) {
    return;
  }

  const result = await api.put(task.value.uuid, {
    type: task.value.type,
    name: task.value.name,
  });

  state.tasks[findTaskIndex(task.value.uuid)] = {
    type: result.type,
    name: result.name,
    uuid: task.value.uuid,
  };

  hideModal();
};

const validateTask = (): boolean => {
  return task.value.name === "" || task.value.type === "";
};
</script>

<style lang="scss">
@import "../styles/TaskBoard.scss";
</style>
