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
    <div class="flex-center">
      <table class="items-wrapper box-shadow--bottom">
        <th class="header-row">
          <thead class="items-table-cell items-cell-lp">
            Lp.
          </thead>
          <tbody class="items-other-cell-wrapper">
            <td class="items-table-cell name">Name</td>
            <td class="items-table-cell type">Type</td>
            <td class="items-table-cell description">Description</td>
          </tbody>
        </th>
        <tr
          class="items-table-row"
          v-for="(item, index) in itemsStore.items"
          :key="item.uuid"
        >
          <td class="items-table-cell items-cell-lp">
            {{ Number(index) + 1 }}
          </td>
          <tbody class="items-other-cell-wrapper">
            <td class="items-table-cell name">{{ item.name }}</td>
            <td class="items-table-cell type">{{ item.type }}</td>
            <td class="items-table-cell description cut-text">
              {{ item.description }}
            </td>
            <td class="items-table-cell edit-remove">
              <EditIcon :showEditModal="showEditModal" :uuid="item.uuid" />
              <RemoveIcon :removeItem="removeItem" :uuid="item.uuid" />
            </td>
          </tbody>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

import ItemModal from "./ItemModal.vue";
import IconButton from "./IconButton.vue";
import EditIcon from "../../../icons/EditIcon.vue";
import RemoveIcon from "../../../icons/RemoveIcon.vue";

import * as ItemService from "../../../services/itemService";
import type { Item, ItemError } from "../../../types";
import { useRouter } from "vue-router";

import { useItemsStore } from "@/stores/Items";
import { useLoginStore } from "@/stores/Login";

const dirty = ref<boolean>(false);
const router = useRouter();
const login = useLoginStore();
if (login.validateLogin()) {
  router.push("/");
}

const itemsStore = useItemsStore();

onMounted(async () => {
  await fetchItems();
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
  if (validateItem()) {
    return setError("Item fields cannot be empty");
  }
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
  visible.value = true;
};

const showEditModal = (id: string): void => {
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
  await ItemService.write(item.value);
  await fetchItems();
  hideModal();
};

const removeItem = async (id: string): Promise<void> => {
  await ItemService.remove(id);
  await fetchItems();
};

const updateItem = async (): Promise<void> => {
  if (item.value.uuid === undefined) {
    return;
  }

  //check if user edited item. If not return an error
  await ItemService.put(item.value.uuid, {
    ...item.value,
    update_date: getCurrentDate(),
  });

  await fetchItems();
  setError("");
  dirty.value = false;
};

const fetchItems = async () => {
  const result = await ItemService.read();
  if (!result) {
    return setError("Failed to fetch items");
  }
  itemsStore.setItems([...result.items]);

  return result;
};

const getCurrentDate = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getDay()}-${
    d.getMonth() + 1
  }T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

const validateItem = (): boolean => {
  return (
    item.value.name === "" ||
    item.value.type === "" ||
    item.value.description === ""
  );
};
</script>

<style lang="scss">
@import "../styles/ItemBoard.scss";
</style>
