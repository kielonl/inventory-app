<template>
  <form @submit.prevent="validateItem()">
    <InputTextField
      :name="'Name'"
      v-model="item.name"
      :isError="isError.name"
    />
    <InputTextField
      :name="'Type'"
      v-model="item.type"
      :isError="isError.type"
    />
    <InputTextArea
      :name="'Description'"
      v-model="item.description"
      :isError="isError.description"
    />
    <ErrorBox
      v-if="itemsStore.error.details !== ''"
      :message="itemsStore.error.details"
    />
    <div class="modal-buttons">
      <input
        type="submit"
        :class="{
          'button button--green': item.uuid,
          'button button--blue': !item.uuid,
        }"
        :value="item.uuid !== undefined ? 'UPDATE' : 'ADD'"
        :disabled="item.uuid !== undefined && !dirty"
      />
      <button type="button" class="button button--red" @click="hideModal()">
        CANCEL
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import ErrorBox from "@/components/ReusableComponents/ErrorBox.vue";
import InputTextArea from "@/components/ReusableComponents/InputTextArea.vue";

import { computed, ref } from "vue";

import { useItemsStore } from "@/stores/Items";

import type { Item } from "@/types";

interface Props {
  modelValue: Item;
  dirty: boolean;
  save(): void;
  hideModal(): void;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "update:error"]);

const item = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});

const itemsStore = useItemsStore();

const isError = ref<{ name: boolean; type: boolean; description: boolean }>({
  name: false,
  type: false,
  description: false,
});

const validateItem = (): void => {
  if (item.value.uuid !== undefined) !props.dirty;

  isError.value = {
    name: item.value.name === "",
    type: item.value.type === "",
    description: item.value.description === "",
  };

  if (
    item.value.name !== "" &&
    item.value.type !== "" &&
    item.value.description !== ""
  ) {
    props.save();
  }
};
</script>

<style scoped lang="scss">
@import url("../styles/ItemForm.scss");
</style>
