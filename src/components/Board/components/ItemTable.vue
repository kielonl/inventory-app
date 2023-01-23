<template>
  <table class="items-wrapper box-shadow--bottom">
    <LoadingIcon v-if="itemsStore.loading" />

    <thead class="header-row">
      <tr class="items-other-cell-wrapper">
        <th
          class="items-table-cell name header-name"
          @click="itemsStore.changeOrder(COLUMNS.NAME)"
        >
          Name
          <ArrowIcon
            :rotated="arrowDirection(COLUMNS.NAME)"
            :disabled="itemsStore.orderBy === COLUMNS.NAME"
          />
        </th>
        <th
          class="items-table-cell type header-type"
          @click="itemsStore.changeOrder(COLUMNS.TYPE)"
        >
          Type
          <ArrowIcon
            :rotated="arrowDirection(COLUMNS.TYPE)"
            :disabled="itemsStore.orderBy === COLUMNS.TYPE"
          />
        </th>
        <th
          class="items-table-cell description header-description"
          @click="itemsStore.changeOrder(COLUMNS.DESCRIPTION)"
        >
          Description
          <ArrowIcon
            :rotated="arrowDirection(COLUMNS.DESCRIPTION)"
            :disabled="itemsStore.orderBy === COLUMNS.DESCRIPTION"
          />
        </th>
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
          <EditIcon :onClick="() => showEditModal(item.uuid)" />
          <RemoveIcon :onClick="() => itemsStore.removeItem(item.uuid)" />
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

interface Props {
  showCreateModal(): void;
  showEditModal(id?: string): void;
}

defineProps<Props>();
const itemsStore = useItemsStore();

const arrowDirection = (type: COLUMNS): boolean => {
  if (itemsStore.orderHierarchy > 0) return false;
  return itemsStore.orderBy === type;
};
</script>

<style lang="scss">
@import url("@/components/Board/styles/ItemTable.scss");
</style>
