<template>
  <div :class="{ 'modal-backdrop': !styles.display }"></div>
  <div class="modal-container" :class="{ 'modal-hidden': styles.display }">
    <h2
      class="modal-title"
      ref="titleElement"
      contenteditable
      spellcheck="false"
      @focusout="validate"
    >
      {{ task.title }}
      <sup
        ><svg
          v-if="task.title === 'Task'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
          /></svg
      ></sup>
    </h2>
    <div class="modal-textarea-wrapper">
      <textarea
        rows="4"
        cols="40"
        class="modal-description-textarea"
        type="text"
        v-model="task.description"
        placeholder="..."
      />
    </div>
    <div class="modal-buttons">
      <button
        class="modal-textarea-button"
        @click="
          pushTask({ title: task.title, description: task.description, id: 1 })
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
import { ref } from "vue";
import IconButton from "./IconButton.vue";

const titleElement = ref(null);

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

const validate = (event: Event) => {
  (event.target as HTMLInputElement).blur();
  //@ts-ignore
  Props.task.title = titleElement.value.innerText.trim();
};

defineExpose({ titleElement });

const closeModal = () => {
  Props.styles.display = !Props.styles.display;
};
</script>

<style scoped lang="scss">
@import "../styles/Modal.scss";
</style>
