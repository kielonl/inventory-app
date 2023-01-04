<template>
  <div
    class="task-container"
    @click="
      showModal(true, {
        title: props.title,
        description: props.description,
        id: props.id,
      })
    "
  >
    <h3 class="task-title">{{ title }}</h3>
    <h3 class="task-description">{{ description }}</h3>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from "../../../types";
interface Props {
  title: string;
  description: string;
  id: number;
  showModal(updating: boolean, task: Task): void;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
