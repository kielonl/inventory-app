<template>
  <div class="task-container" @click="showEditModal(uuid)">
    <h3 class="task-title">{{ type }}</h3>
    <h3 class="task-description">{{ name }}</h3>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  type: string;
  name: string;
  uuid?: string;
  save(updating: boolean): void;
  showEditModal(uuid?: string): void;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
