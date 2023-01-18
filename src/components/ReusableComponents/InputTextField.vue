<template>
  <div class="form-input-wrapper">
    <label :for="name">{{ name }}</label>
    <input
      class="form-input box-shadow--bottom"
      :class="{ 'input-not-filled': isError && modelValue === '' }"
      :type="inputType"
      spellcheck="false"
      placeholder="..."
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  modelValue?: string;
  isError?: boolean;
  inputType?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});
</script>

<style>
@import url("./styles/InputTextField.scss");
</style>
