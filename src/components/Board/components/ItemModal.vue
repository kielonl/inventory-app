<template>
  <div :class="{ 'modal-backdrop': visible }"></div>
  <Transition name="fade">
    <div class="modal-container" v-if="visible">
      <FormInput :name="'title'" v-model="item.type" />
      <FormTextArea :name="'description'" v-model="item.name" />
      <ErrorBox
        v-if="error.errorMessage !== ''"
        :message="error.errorMessage"
      />
      <div class="modal-buttons">
        <button
          class="modal-update-button"
          v-if="item.uuid !== undefined"
          @click="updateItem()"
          :disabled="validateItem()"
        >
          UPDATE
        </button>
        <button
          class="modal-add-button"
          v-if="item.uuid === undefined"
          @click="_pushItem()"
          :disabled="validateItem()"
        >
          ADD
        </button>
        <button class="modal-close-button" @click="_hideModal()">CANCEL</button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { Item, ItemError } from "@/types";
import { computed } from "vue";
import ErrorBox from "./ErrorBox.vue";
import FormInput from "@/components/ReusableComponents/FormInput.vue";
import FormTextArea from "@/components/ReusableComponents/FormTextArea.vue";

interface Props {
  modelValue: Item;
  error: ItemError;
  save(): void;
  visible: boolean;
  hideModal(): void;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "update:error"]);

const item = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});

const validateItem = (): boolean => {
  return (
    item.value.name === "" ||
    item.value.type === "" ||
    item.value.name.length > 80 ||
    item.value.type.length > 16
  );
};

const clearItem = (): void => {
  item.value = {
    type: "",
    name: "",
    uuid: item.value.uuid,
  };
};

const _hideModal = (): void => {
  props.hideModal();
  clearItem();
};

const _pushItem = (): void => {
  props.save();
};

const updateItem = (): void => {
  props.save();
};
</script>

<style scoped lang="scss">
@import "../styles/ItemModal.scss";
</style>
