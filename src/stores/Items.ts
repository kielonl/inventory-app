import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ItemsStore } from "@/src/types";

export const useItemsStore = defineStore<ItemsStore>("itemsStore", {
  state: () => ({ items: [] }),
  getters: {},
  actions: {
    setItems(value: any[]): void {
      this.items = [...value];
    },
    removeItem(itemIndex: number) {
      return this.items.splice(itemIndex, 1);
    },
    findItemIndex(id: string | undefined): number {
      return this.items.findIndex((obj: any) => obj.uuid === id);
    },
    validateItem(): boolean {
      return (
        this.items.name === "" ||
        this.items.type === "" ||
        this.items.description === ""
      );
    },
  },
});
