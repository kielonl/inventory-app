<script lang="ts">
import { defineComponent, ref } from "vue";
import Task from "../components/Task.vue";
import AddTask from "./AddTask.vue";
import type { Tasks } from "../../../types";

export default defineComponent({
  name: "Board",
  components: { Task, AddTask },

  setup() {
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
    return { task, tasks, pushTask, lastTask };
  },
});
</script>
<template>
  <div class="board-container">
    {{ task.title }} <br />
    {{ task.description }}
    <form @submit.prevent="">
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
  </div>
</template>

<style lang="scss">
@import "../styles/Board.scss";
</style>
