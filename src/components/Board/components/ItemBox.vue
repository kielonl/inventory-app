<template>
  <div class="item-container" @click="showEditModal(uuid)">
    <h4 class="item-type">type</h4>
    <h4 class="item-title">title</h4>
    <h3 class="item-description">
      akwjenfakwjnefkjwnkjkajwnefkjawnekjfnawkefnakwenfkawnefkwane
      akjwnefkjanwekfjnawkejnfjakwenfjknw
    </h3>
    <div class="item-bend"></div>
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
