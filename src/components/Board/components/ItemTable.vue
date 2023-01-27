<template>
  <table class="items-wrapper box-shadow--bottom">
    <thead class="header-row">
      <tr class="items-other-cell-wrapper">
        <th
          class="items-table-cell name header-name"
          @click="itemsStore.changeOrder(COLUMN.NAME)"
        >
          Name
          <ArrowIcon
            :rotated="arrowDirection(COLUMN.NAME)"
            :disabled="itemsStore.orderBy === COLUMN.NAME"
          />
        </th>
        <th
          class="items-table-cell type header-type"
          @click="itemsStore.changeOrder(COLUMN.TYPE)"
        >
          Type
          <ArrowIcon
            :rotated="arrowDirection(COLUMN.TYPE)"
            :disabled="itemsStore.orderBy === COLUMN.TYPE"
          />
        </th>
        <th
          class="items-table-cell description header-description"
          @click="itemsStore.changeOrder(COLUMN.DESCRIPTION)"
        >
          Description
          <ArrowIcon
            :rotated="arrowDirection(COLUMN.DESCRIPTION)"
            :disabled="itemsStore.orderBy === COLUMN.DESCRIPTION"
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
          <LookUpIcon :onClick="() => lookUpItem(item.uuid)" />
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
import LookUpIcon from "@/icons/LookUpIcon.vue";

import { COLUMN } from "@/constants";
import { useItemsStore } from "@/stores/Items";

import { useRouter } from "vue-router";

interface Props {
  showCreateModal(): void;
  showEditModal(id?: string): void;
}

defineProps<Props>();
const itemsStore = useItemsStore();
const router = useRouter();

const arrowDirection = (type: COLUMN): boolean => {
  if (itemsStore.orderHierarchy > 0) return false;
  return itemsStore.orderBy === type;
};

const lookUpItem = (id?: string) => {
  if (!id) return;

  router.push(`/item/${id}`);
};
</script>

<style lang="scss">
@import url("@/components/Board/styles/ItemTable.scss");
</style>
