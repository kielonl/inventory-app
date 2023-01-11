<template>
  <TaskModal
    v-model="task"
    :error="error"
    :save="save"
    :visible="visible"
    :hideModal="hideModal"
  />
  <div class="board-container">
    <div class="board-add-task-button">
      <IconButton @click="showCreateModal()" :icon="'➕'" />
    </div>
    <div class="tasks-wrapper">
      <div class="tasks-container" v-for="task in state.tasks">
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
import type { Task, TaskError } from "../../../types";

const state = reactive<any>({
  tasks: [],
});

onMounted(async () => {
  const result = await TaskService.read();
  if (!result) {
    return setError("Unknown error");
  }
  state.tasks = result;
});

const task = ref<Task>({
  type: "",
  name: "",
});
const visible = ref<boolean>(false);
const error = ref<TaskError>({ errorMessage: "" });

const resetFormData = () => {
  task.value = {
    type: "",
    name: "",
  };
};

const hideModal = () => {
  visible.value = false;
  setError("");
};

const save = async (): Promise<void> => {
  if (findTaskIndex(task.value.uuid) === -1) {
    await createTask();
  } else {
    await updateTask();
  }

  if (error.value.errorMessage === "") {
    resetFormData();
    hideModal();
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

const setError = (errorMessage: string = "Unknown error") => {
  error.value = {
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

  const taskIndex = findTaskIndex(task.value.uuid);

  //check if user edited task. If not return an error
  if (compareTasks(state.tasks[taskIndex], task.value)) {
    return setError("You have to change something");
  }

  const result = await TaskService.put(task.value.uuid, {
    type: task.value.type,
    name: task.value.name,
  });

  if (result === undefined) {
    return setError();
  }

  state.tasks[taskIndex] = {
    type: result.type,
    name: result.name,
    uuid: task.value.uuid,
  };
  setError("");
};

const compareTasks = (localTask: Task, apiTask: Task): boolean => {
  return (
    localTask.name === apiTask.name &&
    localTask.type === apiTask.type &&
    apiTask.uuid === apiTask.uuid
  );
};
</script>

<style lang="scss">
@import "../styles/TaskBoard.scss";
</style>
