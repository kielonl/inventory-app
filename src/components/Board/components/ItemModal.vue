<template>
  <div :class="{ 'modal-backdrop': visible }"></div>
  <form @submit.prevent="validateItem()">
    <Transition name="fade">
      <div class="modal-container" v-if="visible">
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
          <button
            type="button"
            class="button button--red"
            @click="_hideModal()"
          >
            CANCEL
          </button>
        </div>
      </div>
    </Transition>
  </form>
</template>

<script lang="ts" setup>
import type { Item } from "@/types";
import { Transition, computed, ref } from "vue";
import ErrorBox from "@/components/ReusableComponents/ErrorBox.vue";
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import InputTextArea from "@/components/ReusableComponents/InputTextArea.vue";
import { useItemsStore } from "@/stores/Items";

interface Props {
  modelValue: Item;
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

const isError = ref<{ name: boolean; type: boolean; description: boolean }>({
  name: false,
  type: false,
  description: false,
});

const itemsStore = useItemsStore();

const validateItem = (): void => {
  if (item.value.uuid !== undefined) !props.dirty;

  const name = item.value.name.trim();
  const type = item.value.type.trim();
  const description = item.value.description.trim();

  isError.value = {
    name: name.length < 3,
    type: type.length < 3,
    description: description.length < 3,
  };

  if (name.length > 3 && type.length > 3 && description.length > 3) {
    props.save();
  }
};

const clearItem = (): void => {
  item.value = {
    name: "",
    type: "",
    description: "",
    uuid: undefined,
  };
};

const _hideModal = (): void => {
  props.hideModal();
  isError.value = {
    name: false,
    type: false,
    description: false,
  };
  clearItem();
};
</script>

<style scoped lang="scss">
@import "../styles/ItemModal.scss";
</style>
