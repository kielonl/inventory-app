<template>
  <ItemModal
    v-model="item"
    :error="error"
    :save="save"
    :visible="visible"
    :hideModal="hideModal"
  />
  <div class="board-container">
    <div class="board-add-item-button">
      <IconButton @click="showCreateModal()" :icon="'➕'" />
    </div>
    <div class="table-center">
      <div class="items-wrapper">
        <div class="header-row">
          <div class="items-table-cell items-cell-lp">Lp.</div>
          <div class="items-other-cell-wrapper">
            <div class="items-table-cell name">Name</div>
            <div class="items-table-cell type">Type</div>
            <div class="items-table-cell description">Description</div>
          </div>
        </div>
        <div class="items-table-row" v-for="(item, index) in state.items">
          <div class="items-table-cell items-cell-lp">{{ index }}</div>
          <div class="items-other-cell-wrapper">
            <div class="items-table-cell name">{{ item.name }}</div>
            <div class="items-table-cell type">{{ item.type }}</div>
            <div class="items-table-cell description cut-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit id
              quam maiores animi inventore nisi quis. Eos laborum harum corrupti
              consequatur quod aliquid quis incidunt tenetur impedit eaque
              ducimus, ad vero nulla repellendus maiores rem fugit minima odio
              architecto illum rerum? Fugit provident totam, minima neque eos
              dolorum enim consequatur.
            </div>
            <div class="items-table-cell edit-remove">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import ItemModal from "./ItemModal.vue";
import IconButton from "./IconButton.vue";

import * as ItemService from "../../../services/itemService";
import type { Item, ItemError } from "../../../types";

const state = reactive<any>({
  items: [
    {
      type: "jeden",
      name: "halo",
      uuid: "1",
    },
    {
      type: "jeden",
      name: "halo",
      uuid: "1",
    },
    {
      type: "trzy",
      name: "halo",
      uuid: "1",
    },
    {
      type: "cztery",
      name: "halo",
      uuid: "1",
    },
    {
      type: "pienc",
      name: "halo",
      uuid: "1",
    },
  ],
});

// onMounted(async () => {
//   const result = await ItemService.read();
//   if (!result) {
//     return setError("Unknown error");
//   }
//   state.items = result;
// });

const item = ref<Item>({
  type: "",
  name: "",
});
const visible = ref<boolean>(false);
const error = ref<ItemError>({ errorMessage: "" });

const resetFormData = () => {
  item.value = {
    type: "",
    name: "",
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
  if (findItemIndex(item.value.uuid) === -1) {
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
  const objectIndex = findItemIndex(id);

  item.value = {
    type: state.items[objectIndex].type,
    name: state.items[objectIndex].name,
    uuid: state.items[objectIndex].uuid,
  };

  visible.value = true;
};

const setError = (errorMessage: string = "Unknown error") => {
  error.value = {
    errorMessage,
  };
};

const findItemIndex = (id: string | undefined): number => {
  return state.items.findIndex((obj: any) => obj.uuid == id);
};

const createItem = async (): Promise<void> => {
  const result = await ItemService.write({
    type: item.value.type,
    name: item.value.name,
    description: "kurwa",
    create_date: getCurrentDate(),
    update_date: getCurrentDate(),
    enabled: true,
  });

  state.items = [...state.items, result];

  hideModal();
};

const getCurrentDate = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getDay()}-${
    d.getMonth() + 1
  }T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

const updateItem = async (): Promise<void> => {
  if (item.value.uuid === undefined) {
    return;
  }

  const itemIndex = findItemIndex(item.value.uuid);

  //check if user edited item. If not return an error
  if (compareItems(state.items[itemIndex], item.value)) {
    return setError("You have to change something");
  }

  const result = await ItemService.put(item.value.uuid, {
    type: item.value.type,
    name: item.value.name,
    description: "wefkwjkfwajkefnjk",
    uuid: item.value.uuid,
    //change this later
    create_date: getCurrentDate(),
    update_date: getCurrentDate(),
    enabled: true,
  });

  if (result === undefined) {
    return setError();
  }

  state.items[itemIndex] = {
    type: result.type,
    name: result.name,
    uuid: item.value.uuid,
  };
  setError("");
};

const compareItems = (localItem: Item, apiItem: Item): boolean => {
  return (
    localItem.name === apiItem.name &&
    localItem.type === apiItem.type &&
    apiItem.uuid === apiItem.uuid
  );
};

const validateItem = (): boolean => {
  return item.value.name === "" || item.value.type === "";
};
</script>

<style lang="scss">
@import "../styles/ItemBoard.scss";
</style>
