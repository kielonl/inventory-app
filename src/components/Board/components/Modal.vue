<template>
  <div class="modal-container" :class="{ 'modal-hidden': styles.display }">
    <form>
      title:<input type="text" v-model="task.title" /> desc:<input
        type="text"
        v-model="task.description"
      />
    </form>
    <AddTask
      @click="
        pushTask({ title: task.title, description: task.description, id: 1 })
      "
    />
  </div>
</template>

<script lang="ts" setup>
import type { Tasks } from "@/types";
import AddTask from "./AddTask.vue";

interface Props {
  task: {
    title: string;
    description: string;
    id: number;
  };
  pushTask(task: Tasks): void;
  styles: { display: boolean };
}
const Props = defineProps<Props>();
</script>

<style scoped lang="scss">
@import "../styles/Modal.scss";
</style>
