<template>
  <Modal
    :taskId="tasks.values.length"
    :pushTask="pushTask"
    :visible="visible"
    :setVisible="setVisible"
  />
  <div class="board-container">
    <div class="board-add-task-button">
      <IconButton @click="setVisible()" :icon="'➕'" />
    </div>
    <div class="tasks-wrapper">
      <div v-for="task in tasks" v-bind:key="task.id" class="tasks-container">
        <TaskVue
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
import TaskVue from "../components/Task.vue";
import Modal from "./TaskModal.vue";
import IconButton from "./IconButton.vue";

import type { Task } from "../../../types";

const tasks = ref<Task[]>([]);
const visible = ref<boolean>(false);

const setVisible = () => (visible.value = !visible.value);

const pushTask = (_task: Task): void => {
  if (_task.title === "" || _task.title === "") return;
  tasks.value = [...tasks.value, _task];
};
</script>

<style lang="scss">
@import "../styles/Board.scss";
</style>
