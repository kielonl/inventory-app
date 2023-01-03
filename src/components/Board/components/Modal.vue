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
      <IconButton @click="closeModal()" :icon="'❌'" class="modal-close" />
      <IconButton
        @click="
          pushTask({ title: task.title, description: task.description, id: 1 })
        "
        :icon="'➕'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tasks } from "@/types";
import IconButton from "./IconButton.vue";

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

let disabled = false;

const warnDisabled = () => {
  console.log("a");
  disabled = true;
  setTimeout(() => {
    disabled = false;
  }, 1500);
};

const closeModal = () => {
  Props.styles.display = !Props.styles.display;
};
</script>

<style scoped lang="scss">
@import "../styles/Modal.scss";
</style>
