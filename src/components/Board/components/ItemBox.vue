<template>
  <div class="item-container" @click="showEditModal(uuid)">
    <h3 class="item-title">{{ type }}</h3>
    <h3 class="item-description">{{ name }}</h3>
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
@import "../styles/ItemBox.scss";
</style>
