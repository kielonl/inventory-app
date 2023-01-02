<template>
  <Modal :task="task" :pushTask="pushTask" :styles="styles" />
  <div class="board-container">
    <div v-for="task in tasks" v-bind:key="task.id">
      <Task :title="task.title" :description="task.description" :id="task.id" />
    </div>

    <AddTask @click="styles.display = !styles.display" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Task from "../components/Task.vue";
import Modal from "./Modal.vue";
import AddTask from "./AddTask.vue";
import type { Tasks } from "../../../types";

let tasks = ref<Tasks[]>([]);
const styles = ref({ display: true });

const lastTask = tasks.value.length === 0 ? 0 : tasks.value.length - 1;
const task = ref({ title: "", description: "", id: lastTask });

const pushTask = (_task: Tasks): void => {
  if (task.value.title === "" || task.value.description === "") return;

  if (!tasks.value.length) {
    tasks.value = [_task];
    task.value = { title: "", description: "", id: lastTask + 1 };
    styles.value.display = !styles.value.display;
    return;
  }
  tasks.value = [...tasks.value, _task];
  task.value = { title: "", description: "", id: lastTask + 1 };
  styles.value.display = !styles.value.display;
  return;
};
</script>

<style lang="scss">
@import "../styles/Board.scss";
</style>
