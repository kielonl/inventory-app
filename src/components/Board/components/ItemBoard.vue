<template>
  <ItemModal
    v-model="item"
    :error="error"
    :save="save"
    :visible="visible"
    :hideModal="hideModal"
  />
  <div>
    <div class="board-add-item-button">
      <IconButton @click="showCreateModal()" :icon="'➕'" />
    </div>
    <div class="flex-center">
      <table class="items-wrapper box-shadow--bottom">
        <thead class="header-row">
          <th class="items-table-cell items-cell-lp">Lp.</th>
          <tbody class="items-other-cell-wrapper">
            <td class="items-table-cell name">Name</td>
            <td class="items-table-cell type">Type</td>
            <td class="items-table-cell description">Description</td>
          </tbody>
        </thead>
        <tr class="items-table-row" v-for="(item, index) in state.items">
          <td class="items-table-cell items-cell-lp">{{ index + 1 }}</td>
          <tbody class="items-other-cell-wrapper">
            <td class="items-table-cell name">{{ item.name }}</td>
            <td class="items-table-cell type">{{ item.type }}</td>
            <td class="items-table-cell description cut-text">
              {{ item.description }}
            </td>
            <td class="items-table-cell edit-remove">
              <EditIcon :showEditModal="showEditModal" :uuid="item.uuid"/>
              <RemoveIcon :removeItem="removeItem" :uuid="item.uuid" />
            </td>
          </tbody>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, inject } from "vue";

import ItemModal from "./ItemModal.vue";
import IconButton from "./IconButton.vue";
import EditIcon from "../../../icons/EditIcon.vue"
import RemoveIcon from "../../../icons/RemoveIcon.vue";

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
  console.log(result)
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

const removeItem = async(id:string):Promise<void> =>{
  console.log(id)
  if (item.value.uuid === undefined) {
    return;
  }

  const itemIndex = findItemIndex(id);

  const result = await ItemService.remove(id);

  console.log(result)
}

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
