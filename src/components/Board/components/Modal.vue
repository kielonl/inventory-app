<template>
  <div :class="{ 'modal-backdrop': !styles.display }"></div>
  <div class="modal-container" :class="{ 'modal-hidden': styles.display }">
    <label for="title">Title</label>
    <input
      class="modal-title"
      spellcheck="false"
      placeholder="..."
      name="title"
      v-model="task.title"
    />
    <label for="description">Description</label>
    <textarea
      rows="4"
      cols="40"
      class="modal-description-textarea"
      type="text"
      v-model="task.description"
      placeholder="..."
      name="description"
    />
    <div class="modal-buttons">
      <button
        class="modal-textarea-button"
        @click="
          pushTask({
            title: task.title,
            description: task.description,
            id: task.id,
          })
        "
      >
        ADD
      </button>
      <button class="modal-close-button" @click="closeModal()">CANCEL</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tasks } from "@/types";

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

  Props.task.title = "";
  Props.task.description = "";
};
</script>

<style scoped lang="scss">
@import "../styles/Modal.scss";
</style>
