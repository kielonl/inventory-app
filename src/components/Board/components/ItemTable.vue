<template>
  <table class="items-wrapper box-shadow--bottom">
    <LoadingIcon v-if="isLoading" />

    <thead class="header-row">
      <tr class="items-other-cell-wrapper">
        <td
          class="items-table-cell name header-name"
          @click="changeOrder(COLUMNS.NAME)"
        >
          Name
          <ArrowIcon
            :rotated="rotateArrow(COLUMNS.NAME)"
            :disabled="itemsStore.sort.orderBy === COLUMNS.NAME"
          />
        </td>
        <td
          class="items-table-cell type header-type"
          @click="changeOrder(COLUMNS.TYPE)"
        >
          Type
          <ArrowIcon
            :rotated="rotateArrow(COLUMNS.TYPE)"
            :disabled="itemsStore.sort.orderBy === COLUMNS.TYPE"
          />
        </td>
        <td
          class="items-table-cell description header-description"
          @click="changeOrder(COLUMNS.DESCRIPTION)"
        >
          Description
          <ArrowIcon
            :rotated="rotateArrow(COLUMNS.DESCRIPTION)"
            :disabled="itemsStore.sort.orderBy === COLUMNS.DESCRIPTION"
          />
        </td>
      </tr>
    </thead>
    <tbody
      class="items-table-row"
      v-for="item in itemsStore.items"
      :key="item.uuid"
    >
      <tr class="items-other-cell-wrapper">
        <td class="items-table-cell name">{{ item.name }}</td>
        <td class="items-table-cell type">{{ item.type }}</td>
        <td class="items-table-cell description cut-text">
          {{ item.description }}
        </td>
        <td class="items-table-cell edit-remove">
          <EditIcon :showEditModal="() => showEditModal(item.uuid)" />
          <RemoveIcon :removeItem="() => removeItem(item.uuid)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import EditIcon from "../../../icons/EditIcon.vue";
import RemoveIcon from "../../../icons/RemoveIcon.vue";
import LoadingIcon from "@/components/ReusableComponents/LoadingIcon.vue";
import ArrowIcon from "@/icons/ArrowIcon.vue";

import { COLUMNS } from "@/constants";
import { useItemsStore } from "@/stores/Items";
import * as ItemService from "@/services/itemService";

interface Props {
  isLoading: boolean;
  showCreateModal(): void;
  showEditModal(id?: string): void;
}

const props = defineProps<Props>();
const itemsStore = useItemsStore();

const rotateArrow = (type: COLUMNS): boolean => {
  if (itemsStore.sort.orderHierarchy > 0) return false;
  return itemsStore.sort.orderBy === type;
};

const removeItem = async (id: string | undefined): Promise<void> => {
  if (id === undefined) return;
  if (props.isLoading) return;

  await ItemService.remove(id);
  await itemsStore.fetchItems();
};

const changeOrder = async (column: COLUMNS) => {
  itemsStore.changeOrder(column);
  await itemsStore.fetchItems();
};
</script>

<style lang="scss">
@import url("@/components/Board/styles/ItemTable.scss");
</style>
