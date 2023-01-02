<template>
  <div :class="{ 'modal-backdrop': !styles.display }"></div>
  <div class="modal-container" :class="{ 'modal-hidden': styles.display }">
    <form>
      title:<input type="text" v-model="task.title" /> desc:<input
        type="text"
        v-model="task.description"
      />
    </form>
    <div class="modal-buttons">
      <AddTask
        @click="
          pushTask({ title: task.title, description: task.description, id: 1 })
        "
      />
      <button class="modal-close" @click="closeModal()">ANULUJ</button>
    </div>
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

const closeModal = () => {
  Props.styles.display = !Props.styles.display;
};
</script>

<style scoped lang="scss">
@import "../styles/Modal.scss";
</style>
