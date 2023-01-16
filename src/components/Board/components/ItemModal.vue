<template>
  <div :class="{ 'modal-backdrop': visible }"></div>
  <form @submit.prevent="saveItem()">
    <Transition name="fade">
      <div class="modal-container" v-if="visible">
        <InputTextField :name="'Name'" v-model="item.name" />
        <InputTextField :name="'Type'" v-model="item.type" />
        <InputTextArea :name="'Description'" v-model="item.description" />
        <ErrorBox
          v-if="error.errorMessage !== ''"
          :message="error.errorMessage"
        />
        <div class="modal-buttons">
          <button
            :class="{
              'button button--green': item.uuid,
              'button button--blue': !item.uuid,
            }"
            :disabled="validateItem()"
          >
            {{ item.uuid !== undefined ? "UPDATE" : "ADD" }}
          </button>
          <button class="button button--red" @click="_hideModal()">
            CANCEL
          </button>
        </div>
      </div>
    </Transition>
  </form>
</template>

<script lang="ts" setup>
import type { Item, ItemError } from "@/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Transition, computed } from "vue";
import ErrorBox from "./ErrorBox.vue";
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import InputTextArea from "@/components/ReusableComponents/InputTextArea.vue";

interface Props {
  modelValue: Item;
  error: ItemError;
  save(): void;
  visible: boolean;
  hideModal(): void;
  dirty: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "update:error"]);

const item = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});

const validateItem = (): boolean => {
  if (item.value.uuid !== undefined) return !props.dirty;
  else
    return (
      item.value.name === "" ||
      item.value.type === "" ||
      item.value.description === "" ||
      item.value.name.length > 16 ||
      item.value.type.length > 16 ||
      item.value.description.length > 80
    );
};

const clearItem = (): void => {
  item.value = {
    name: "",
    type: "",
    description: "",
    uuid: item.value.uuid,
  };
};

const _hideModal = (): void => {
  props.hideModal();
  clearItem();
};

const saveItem = (): void => {
  props.save();
};
</script>

<style scoped lang="scss">
@import "../styles/ItemModal.scss";
</style>
