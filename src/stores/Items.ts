import { defineStore } from "pinia";
import type { ItemStore } from "@/types";
import * as ItemService from "@/services/itemService";
import { COLUMN, ORDER } from "@/constants";

export const useItemsStore = defineStore("itemsStore", {
  state: () => ({
    items: [] as ItemStore[],
    orderBy: COLUMN.NAME,
    orderHierarchy: ORDER.ASC,
    loading: false,
    error: { details: "" },
    searchQuery: "",
  }),
  getters: {},
  actions: {
    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    },

    setError(details: string) {
      this.error.details = details;
    },

    setItems(value: any[]): void {
      this.items = [...value];
    },

    async removeItem(id: string | undefined): Promise<void> {
      if (id === undefined) return;
      if (this.loading) return;

      await ItemService.remove(id);
      await this.fetchItems();
    },

    findItemIndex(id: string | undefined): number {
      return this.items.findIndex((obj: any) => obj.uuid === id);
    },

    async fetchItems() {
      this.showLoading();
      const result = await ItemService.read(
        this.orderBy,
        this.orderHierarchy,
        this.searchQuery
      );
      if (!result) {
        return this.setError("Failed to fetch items");
      }
      this.setItems(result.items);

      this.hideLoading();
      return result;
    },

    async changeOrder(column: COLUMN) {
      if (column === this.orderBy) {
        this.orderHierarchy *= -1;
      } else {
        this.orderHierarchy = ORDER.ASC;
      }

      this.orderBy = column;
      await this.fetchItems();
    },
  },
});
