import { defineStore } from "pinia";
import type { ItemStore } from "@/types";
import * as ItemService from "@/services/itemService";
import { COLUMNS, ORDERS } from "@/constants";

export const useItemsStore = defineStore("itemsStore", {
  state: () => ({
    items: [] as ItemStore[],
    sort: { orderBy: COLUMNS.NAME, orderHierarchy: ORDERS.ASC },
    loading: false,
  }),
  getters: {},
  actions: {
    async showLoading() {
      this.loading = true;
    },
    async hideLoading() {
      this.loading = false;
    },
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
      await this.showLoading();
      const result = await ItemService.read(
        this.sort.orderBy,
        this.sort.orderHierarchy
      );
      if (!result) {
        return setError("Failed to fetch items");
      }
      this.setItems(result.items);

      await this.hideLoading();
      return result;
    },
    changeOrder(column: COLUMNS) {
      if (column === this.sort.orderBy) {
        this.sort.orderHierarchy *= -1;
      } else {
        this.sort.orderHierarchy = ORDERS.ASC;
      }

      this.sort.orderBy = column;
    },
  },
});
