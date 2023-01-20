<template>
  <table class="items-wrapper box-shadow--bottom">
    <LoadingIcon v-if="isLoading" />

    <th class="header-row">
      <thead class="items-other-cell-wrapper">
        <td
          class="items-table-cell name header-name"
          @click="changeOrder(COLUMNS.NAME)"
        >
          Name
          <ArrowUp :sort="sort" :column="COLUMNS.NAME" />
        </td>
        <td
          class="items-table-cell type header-type"
          @click="changeOrder(COLUMNS.TYPE)"
        >
          Type
          <ArrowUp :sort="sort" :column="COLUMNS.TYPE" />
        </td>
        <td
          class="items-table-cell description header-description"
          @click="changeOrder(COLUMNS.DESCRIPTION)"
        >
          Description
          <ArrowUp :sort="sort" :column="COLUMNS.DESCRIPTION" />
        </td>
      </thead>
    </th>
    <tr
      class="items-table-row"
      v-for="item in itemsStore.items"
      :key="item.uuid"
    >
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
</template>

<script setup lang="ts">
import EditIcon from "../../../icons/EditIcon.vue";
import RemoveIcon from "../../../icons/RemoveIcon.vue";
import LoadingIcon from "@/components/ReusableComponents/LoadingIcon.vue";
import ArrowUp from "@/icons/ArrowUpIcon.vue";

import { ORDERS, COLUMNS } from "@/constants";
import { useItemsStore } from "@/stores/Items";
import * as ItemService from "@/services/itemService";

import { computed, onMounted } from "vue";

interface Props {
  sort: { by: COLUMNS; order: ORDERS };
  isLoading: boolean;
  setError: (detail: string) => void;
  showCreateModal(): void;
  showEditModal(id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:sort"]);

const sort = computed({
  get: () => props.sort,
  set: (value: any) => emit("update:sort", value),
});

const itemsStore = useItemsStore();

onMounted(async () => {
  await itemsStore.fetchItems(sort.value.by, sort.value.order, props.setError);
});

const changeOrder = async (order: COLUMNS) => {
  if (order === sort.value.by) {
    sort.value.order =
      sort.value.order === ORDERS.ASC ? ORDERS.DESC : ORDERS.ASC;
  } else {
    sort.value.order = ORDERS.ASC;
  }

  sort.value.by = order;
  await itemsStore.fetchItems(sort.value.by, sort.value.order, props.setError);
};

const removeItem = async (id: string): Promise<void> => {
  if (props.isLoading) return;

  await ItemService.remove(id);
  await itemsStore.fetchItems(sort.value.by, sort.value.order, props.setError);
};
</script>

<style lang="scss">
@import url("@/components/Board/styles/ItemTable.scss");
</style>
