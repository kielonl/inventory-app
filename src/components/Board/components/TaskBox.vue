<template>
  <div class="task-container" @click="showEditModal(uuid)">
    <h4 class="task-type">type</h4>
    <h4 class="task-title">title</h4>
    <h3 class="task-description">
      akwjenfakwjnefkjwnkjkajwnefkjawnekjfnawkefnakwenfkawnefkwane
      akjwnefkjanwekfjnawkejnfjakwenfjknw
    </h3>
    <div class="task-bend"></div>
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
