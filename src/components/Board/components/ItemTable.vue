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
          <ArrowUp
            :class="{
              'arrow-down':
                itemsStore.sort.hierarchy === ORDERS.DESC &&
                itemsStore.sort.orderBy === COLUMNS.NAME,
              'arrow-up':
                itemsStore.sort.hierarchy === ORDERS.ASC &&
                itemsStore.sort.orderBy === COLUMNS.NAME,
            }"
            :disabled="itemsStore.sort.orderBy === COLUMNS.NAME"
          />
        </td>
        <td
          class="items-table-cell type header-type"
          @click="changeOrder(COLUMNS.TYPE)"
        >
          Type
          <ArrowUp
            :class="{
              'arrow-down':
                itemsStore.sort.hierarchy === ORDERS.DESC &&
                itemsStore.sort.orderBy === COLUMNS.TYPE,
              'arrow-up':
                itemsStore.sort.hierarchy === ORDERS.ASC &&
                itemsStore.sort.orderBy === COLUMNS.TYPE,
            }"
            :disabled="itemsStore.sort.orderBy === COLUMNS.TYPE"
          />
        </td>
        <td
          class="items-table-cell description header-description"
          @click="changeOrder(COLUMNS.DESCRIPTION)"
        >
          Description
          <ArrowUp
            :class="{
              'arrow-down':
                itemsStore.sort.hierarchy === ORDERS.DESC &&
                itemsStore.sort.orderBy === COLUMNS.DESCRIPTION,
              'arrow-up':
                itemsStore.sort.hierarchy === ORDERS.ASC &&
                itemsStore.sort.orderBy === COLUMNS.DESCRIPTION,
            }"
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
import ArrowUp from "@/icons/ArrowIcon.vue";

import { ORDERS, COLUMNS } from "@/constants";
import { useItemsStore } from "@/stores/Items";
import * as ItemService from "@/services/itemService";

import { onMounted } from "vue";

interface Props {
  isLoading: boolean;
  setError: (detail: string) => void;
  showCreateModal(): void;
  showEditModal(id?: string): void;
}

const props = defineProps<Props>();

const itemsStore = useItemsStore();

onMounted(() => {
  itemsStore.fetchItems(
    itemsStore.sort.orderBy,
    itemsStore.sort.hierarchy,
    props.setError
  );
});

const removeItem = async (id: string | undefined): Promise<void> => {
  if (id === undefined) return;
  if (props.isLoading) return;

  await ItemService.remove(id);
  await itemsStore.fetchItems(
    itemsStore.sort.orderBy,
    itemsStore.sort.hierarchy,
    props.setError
  );
};

const changeOrder = async (column: COLUMNS) => {
  itemsStore.changeOrder(column);
  await itemsStore.fetchItems(
    itemsStore.sort.orderBy,
    itemsStore.sort.hierarchy,
    props.setError
  );
};
</script>

<style lang="scss">
@import url("@/components/Board/styles/ItemTable.scss");
</style>
