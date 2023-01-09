<template>
  <TaskModal
    v-model="task"
    v-model:error="error"
    :save="save"
    :visible="visible"
    :hideModal="hideModal"
  />
  <div class="board-container">
    <div class="board-add-task-button">
      <IconButton @click="showCreateModal()" :icon="'➕'" />
    </div>

    <div class="tasks-wrapper">
      <div v-if="state.tasks.length === 0" class="no-tasks">
        No tasks received
      </div>
      <div
        v-if="state.tasks.length !== 0"
        v-for="task in state.tasks"
        :key="task.uuid"
        class="tasks-container"
      >
        <TaskBox
          :type="task.type"
          :name="task.name"
          :uuid="task.uuid"
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

import * as TaskService from "../../../services/taskService";
import type { Task, Error } from "../../../types";

const state = reactive<any>({
  tasks: [],
});

onMounted(async () => {
  state.tasks = await TaskService.read();
});

// const tasks = ref<Task[]>([]);
const task = ref<Task>({
  type: "",
  name: "",
});
const visible = ref<boolean>(false);
const error = ref<Error>({
  isError: false,
  errorMessage: "Unknown error",
});

const resetFormData = () => {
  task.value = {
    type: "",
    name: "",
  };
};

const hideModal = () => {
  visible.value = false;
};

const save = async (): Promise<void> => {
  if (validateTask()) {
    setError(true, "Task fields cannot be empty");
    return;
  }
  if (findTaskIndex(task.value.uuid) === -1) {
    createTask();
  } else {
    await updateTask();
  }

  if (error.value.isError === false) {
    resetFormData();
    hideModal();
    return;
  }
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

const setError = (isError = true, errorMessage: string = "Unknown error") => {
  error.value = {
    isError,
    errorMessage,
  };
};

const findTaskIndex = (taskId: string | undefined): number => {
  return state.tasks.findIndex((obj: any) => obj.uuid == taskId);
};

const createTask = async (): Promise<void> => {
  const result = await TaskService.write({
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
  if (compareTasks(state.tasks[findTaskIndex(task.value.uuid)], task.value)) {
    return setError(true, "zmien co");
  }

  const result = await TaskService.put(task.value.uuid, {
    type: task.value.type,
    name: task.value.name,
  });

  if (result === undefined) {
    return setError();
  }

  state.tasks[findTaskIndex(task.value.uuid)] = {
    type: result.type,
    name: result.name,
    uuid: task.value.uuid,
  };
  setError(false);
};

const compareTasks = (localTask: Task, apiTask: Task): boolean => {
  return (
    localTask.name === apiTask.name &&
    localTask.type === apiTask.type &&
    apiTask.uuid === apiTask.uuid
  );
};

const validateTask = (): boolean => {
  return task.value.name === "" || task.value.type === "";
};
</script>

<style lang="scss">
@import "../styles/TaskBoard.scss";
</style>
