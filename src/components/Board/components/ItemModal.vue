<template>
  <div :class="{ 'modal-backdrop': visible }" @click="hideModal()"></div>
  <form>
    <Transition name="fade">
      <div class="modal-container" v-if="visible">
        <slot />
      </div>
    </Transition>
  </form>
</template>

<script lang="ts" setup>
import { Transition } from "vue";

interface Props {
  visible: boolean;
  hideModal(): void;
}
defineProps<Props>();
</script>

<style scoped lang="scss">
@import "../styles/ItemModal.scss";
</style>
