<template>
  <TaskModal
    :taskId="tasks.values.length"
    :pushTask="pushTask"
    :visible="visible"
    :hideModal="hideModal"
    :updating="updating"
    :updateTask="updateTask"
  />
  <div class="board-container">
    <div class="board-add-task-button">
      <IconButton @click="showModal(false)" :icon="'➕'" />
    </div>
    <div class="tasks-wrapper">
      <div v-for="task in tasks" :key="task.id" class="tasks-container">
        <TaskBox
          :title="task.title"
          :description="task.description"
          :id="task.id"
          :showModal="showModal"
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
const visible = ref<boolean>(false);
const updating = ref<boolean>(false);

const hideModal = () => (visible.value = false);

const showModal = (_updating: boolean): void => {
  updating.value = _updating;
  visible.value = true;
};

const pushTask = (_task: Task): void => {
  if (_task.title === "" || _task.title === "") return;
  tasks.value = [...tasks.value, _task];
};

const updateTask = (id: number, updatedTask: Omit<Task, "id">) => {
  const objectIndex = tasks.value.findIndex((obj) => obj.id == id);

  tasks.value[objectIndex] = {
    title: updatedTask.title,
    description: updatedTask.description,
    id: objectIndex,
  };

  hideModal();
};
</script>

<style lang="scss">
@import "../styles/Board.scss";
</style>
