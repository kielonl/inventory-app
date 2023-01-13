<template>
  <ItemModal
    v-model="item"
    :error="error"
    :save="save"
    :visible="visible"
    :hideModal="hideModal"
  />
  <div class="board-container box-shadow--bottom">
    <div class="board-add-item-button">
      <IconButton @click="showCreateModal()" :icon="'➕'" />
    </div>

    <div class="items-wrapper">
      <div v-if="state.items.length === 0" class="no-items">
        No items received
      </div>
      <div
        v-if="state.items.length"
        v-for="item in state.items"
        :key="item.uuid"
        class="items-container"
      >
        <ItemBox
          :type="item.type"
          :name="item.name"
          :uuid="item.uuid"
          :save="save"
          :showEditModal="showEditModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, inject } from "vue";

import ItemBox from "./ItemBox.vue";
import ItemModal from "./ItemModal.vue";
import IconButton from "./IconButton.vue";

import * as ItemService from "../../../services/itemService";
import type { InjectLogin, Item, ItemError } from "../../../types";
import { useRouter } from "vue-router";
import { useTestStore } from "@/stores/Test";

const router = useRouter();
const login = inject("login") as InjectLogin;
validateLogin(login.login.value.password, login.login.value.username);

const state = reactive<any>({
  items: [],
});

onMounted(async () => {
  const result = await ItemService.read();
  if (!result) {
    return setError("Unknown error");
  }
  state.items = result;
});

const item = ref<Item>({
  type: "",
  name: "",
});
const visible = ref<boolean>(false);
const error = ref<ItemError>({ errorMessage: "" });

function validateLogin(username: string, password: string) {
  if (username == "" || password == "") {
    return router.push("/");
  }
}

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
