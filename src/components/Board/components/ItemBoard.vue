<template>
  <ItemModal
    v-model="item"
    :error="error"
    :save="save"
    :visible="visible"
    :hideModal="hideModal"
    :dirty="dirty"
  />
  <div>
    <div class="board-add-item-button">
      <IconButton @click="showCreateModal" :icon="'➕'" />
    </div>
    <div class="flex--center">
      <ItemTable
        :isLoading="isLoading"
        :setError="setError"
        :showCreateModal="showCreateModal"
        :showEditModal="showEditModal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import ItemModal from "./ItemModal.vue";
import IconButton from "./IconButton.vue";
import ItemTable from "./ItemTable.vue";

import * as ItemService from "../../../services/itemService";
import type { Item, ItemError } from "../../../types";
import { useRouter } from "vue-router";

import { useItemsStore } from "@/stores/Items";
import { useLoginStore } from "@/stores/Login";

const dirty = ref<boolean>(false);
const router = useRouter();
const login = useLoginStore();
const isLoading = ref<boolean>(false);

if (login.validateLogin()) {
  router.push("/");
}

const itemsStore = useItemsStore();

onMounted(() => {
  itemsStore.fetchItems(setError);
});

const item = ref<Item>({
  name: "",
  type: "",
  description: "",
});

const visible = ref<boolean>(false);
const error = ref<ItemError>({ errorMessage: "" });

const resetFormData = () => {
  item.value = {
    name: "",
    type: "",
    description: "",
  };
};

const hideModal = () => {
  visible.value = false;
  setError("");
};

const save = async (): Promise<void> => {
  if (isLoading.value) return;

  if (itemsStore.findItemIndex(item.value.uuid) === -1) {
    await createItem();
  } else {
    await updateItem();
  }

  if (error.value.errorMessage === "") {
    resetFormData();
    hideModal();
  }
};

const showCreateModal = (): void => {
  if (isLoading.value) return;
  visible.value = true;
};

const showEditModal = (id: string): void => {
  if (isLoading.value) return;
  const objectIndex = itemsStore.findItemIndex(id);
  item.value = { ...itemsStore.items[objectIndex] };

  watch(item.value, () => {
    dirty.value = true;
  });

  visible.value = true;
};

const setError = (errorMessage: string = "Unknown error") => {
  error.value = {
    errorMessage,
  };
};

const createItem = async (): Promise<void> => {
  if (isLoading.value) return;

  await ItemService.write(item.value);
  await itemsStore.fetchItems(setError);

  hideModal();
};

const updateItem = async (): Promise<void> => {
  if (isLoading.value) return;

  if (item.value.uuid === undefined) {
    return;
  }

  await ItemService.put(item.value.uuid, {
    ...item.value,
    update_date: getCurrentDate(),
  });

  await itemsStore.fetchItems(setError);
  setError("");
  dirty.value = false;
};

const getCurrentDate = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getDay()}-${
    d.getMonth() + 1
  }T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};
</script>

<style lang="scss"></style>
