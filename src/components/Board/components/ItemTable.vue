<template>
  <table class="items-wrapper box-shadow--bottom">
    <thead class="header-row">
      <tr
        class="items-other-cell-wrapper"
        v-for="(column, index) in columns"
        :key="index"
      >
        <th
          class="items-table-cell header"
          :class="column"
          @click="itemsStore.changeOrder(column)"
        >
          {{ column }}
          <ArrowIcon
            :rotated="arrowDirection(column)"
            :disabled="itemsStore.orderBy === column"
          />
        </th>
      </tr>
    </thead>
    <tbody class="items-table-row" v-for="item in items" :key="item.uuid">
      <tr class="items-other-cell-wrapper">
        <td
          v-for="(column, index) in columns"
          :key="index"
          class="items-table-cell"
          :class="column"
        >
          {{ item[column] }}
        </td>
        <td class="items-table-cell edit-remove">
          <EditIcon :onClick="() => showEditModal(item.uuid)" />
          <RemoveIcon :onClick="() => itemsStore.removeItem(item.uuid)" />
        </td>
      </tr>
    </tbody>
  </table>
  <LoadingIcon v-if="itemsStore.loading" />
</template>

<script setup lang="ts">
import EditIcon from "../../../icons/EditIcon.vue";
import RemoveIcon from "../../../icons/RemoveIcon.vue";
import LoadingIcon from "@/components/ReusableComponents/LoadingIcon.vue";
import ArrowIcon from "@/icons/ArrowIcon.vue";

import { COLUMN } from "@/constants";
import { useItemsStore } from "@/stores/Items";

interface Props {
  showCreateModal(): void;
  showEditModal(id?: string): void;
  items: any[];
  columns: string[];
}

defineProps<Props>();
const itemsStore = useItemsStore();

const arrowDirection = (type: string): boolean => {
  if (itemsStore.orderHierarchy > 0) return false;
  return itemsStore.orderBy === type;
};
</script>

<style lang="scss">
@import url("@/components/Board/styles/ItemTable.scss");
</style>
