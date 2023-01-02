<template>
  <div class="board-container">
    {{ task.title }} <br />
    {{ task.description }}
    <form>
      title:<input type="text" v-model="task.title" /> desc:<input
        type="text"
        v-model="task.description"
      />
    </form>
    <div v-for="task in tasks" v-bind:key="task.id">
      <Task :title="task.title" :description="task.description" :id="task.id" />
    </div>

    <AddTask
      @click="
        pushTask({
          title: task.title,
          description: task.description,
          id: lastTask,
        })
      "
    />
    <Modal :task="task" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Task from "../components/Task.vue";
import AddTask from "./AddTask.vue";
import Modal from "./Modal.vue";
import type { Tasks } from "../../../types";

let tasks = ref<Tasks[]>([]);
const task = ref({ title: "", description: "" });

const pushTask = (_task: Tasks): void => {
  if (task.value.title === "" || task.value.description === "") return;

  if (!tasks.value.length) {
    tasks.value = [_task];
    task.value = { title: "", description: "" };
    return;
  }
  tasks.value = [...tasks.value, _task];
  task.value = { title: "", description: "" };
  return;
};

const lastTask = tasks.value.length === 0 ? 0 : tasks.value.length - 1;
</script>

<style lang="scss">
@import "../styles/Board.scss";
</style>
