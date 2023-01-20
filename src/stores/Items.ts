import { defineStore } from "pinia";
import type { ItemStore } from "@/types";
import * as ItemService from "@/services/itemService";
import { COLUMNS, ORDERS } from "@/constants";

export const useItemsStore = defineStore("itemsStore", {
  state: () => ({
    items: [] as ItemStore[],
    sort: { orderBy: COLUMNS.NAME, hierarchy: ORDERS.ASC },
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
    async fetchItems(setError: (detail: string) => void) {
      const result = await ItemService.read(
        this.sort.orderBy,
        this.sort.hierarchy
      );
      if (!result) {
        return setError("Failed to fetch items");
      }
      this.setItems(result.items);

      return result;
    },
    changeOrder(column: COLUMNS) {
      if (column === this.sort.orderBy) {
        this.sort.hierarchy *= -1;
      } else {
        this.sort.hierarchy = ORDERS.ASC;
      }

      this.sort.orderBy = column;
    },
  },
});
