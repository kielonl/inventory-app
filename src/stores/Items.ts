import { defineStore } from "pinia";
import type { ItemStore } from "@/types";
import * as ItemService from "@/services/itemService";
import { COLUMNS, ORDERS } from "@/constants";
import { useSortStore } from "./Sort";

const sort = useSortStore();

export const useItemsStore = defineStore("itemsStore", {
  state: () => ({
    items: [] as ItemStore[],
  }),
  getters: {},
  actions: {
    setItems(value: any[]): void {
      this.items = [...value];
    },
    removeItem(itemIndex: number): void {
      this.items.splice(itemIndex, 1);
    },
    findItemIndex(id: string | undefined): number {
      return this.items.findIndex((obj: any) => obj.uuid === id);
    },
    async fetchItems(
      sortBy: COLUMNS,
      sortOrder: ORDERS,
      setError: (detail: string) => void
    ) {
      const result = await ItemService.read(sortBy, sortOrder);
      if (!result) {
        return setError("Failed to fetch items");
      }
      this.setItems(result.items);

      return result;
    },
    changeOrder(column: COLUMNS) {
      if (column === sort.orderBy) {
        sort.hierarchy *= -1;
      } else {
        sort.hierarchy = ORDERS.ASC;
      }

      sort.orderBy = column;
    },
  },
});
