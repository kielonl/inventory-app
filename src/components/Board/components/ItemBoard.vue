<template>
  <ItemModal :visible="visible" :hideModal="hideModal"
    ><ItemForm
      :dirty="dirty"
      v-model="item"
      :save="save"
      :hideModal="hideModal"
    />
  </ItemModal>
  <div>
    <div class="board-header">
      <IconButton @click="showCreateModal" :icon="'➕'" />
      <div class="search-container">
        <InputTextField v-model="itemsStore.searchQuery" />
        <SearchIcon />
      </div>
    </div>
    <div class="flex--center">
      <ItemTable
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
import SearchIcon from "@/icons/SearchIcon.vue";
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import ItemForm from "./ItemForm.vue";

import * as ItemService from "../../../services/itemService";
import type { Item } from "../../../types";
import { useRouter } from "vue-router";
import { debounce } from "@/utils";

import { useItemsStore } from "@/stores/Items";
import { useLoginStore } from "@/stores/Login";
const dirty = ref<boolean>(false);
const router = useRouter();
const login = useLoginStore();

if (login.validateLogin()) {
  router.push("/");
}

const itemsStore = useItemsStore();

onMounted(() => {
  itemsStore.fetchItems();
});

watch(
  () => itemsStore.searchQuery,
  debounce(async () => await itemsStore.fetchItems())
);

const item = ref<Item>({
  name: "",
  type: "",
  description: "",
});

const visible = ref<boolean>(false);

const resetFormData = () => {
  item.value = {
    name: "",
    type: "",
    description: "",
  };
};

const hideModal = () => {
  visible.value = false;
  resetFormData();
  itemsStore.setError("");
};

const save = async (): Promise<void> => {
  if (itemsStore.loading) return;

  if (itemsStore.findItemIndex(item.value.uuid) === -1) {
    await createItem();
  } else {
    await updateItem();
  }

  if (itemsStore.error.details === "") {
    resetFormData();
    hideModal();
  }
};

const showCreateModal = (): void => {
  if (itemsStore.loading) return;
  visible.value = true;
};

const showEditModal = (id: string): void => {
  if (itemsStore.loading) return;
  const objectIndex = itemsStore.findItemIndex(id);
  item.value = { ...itemsStore.items[objectIndex] };

  watch(item.value, () => {
    dirty.value = true;
  });

  visible.value = true;
};

const createItem = async (): Promise<void> => {
  if (itemsStore.loading) return;

  await ItemService.write(item.value);
  await itemsStore.fetchItems();

  hideModal();
};

const updateItem = async (): Promise<void> => {
  if (itemsStore.loading) return;

  if (item.value.uuid === undefined) {
    return;
  }

  await ItemService.put(item.value.uuid, {
    ...item.value,
    update_date: getCurrentDate(),
  });

  await itemsStore.fetchItems();
  itemsStore.setError("");
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
