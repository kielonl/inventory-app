import { defineStore } from "pinia";
import type { ItemStore } from "@/types";

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
  },
});
