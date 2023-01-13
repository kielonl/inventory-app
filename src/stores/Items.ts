import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useItemsStore = defineStore("itemsStore", {
  state: () => ({ items: [] }),
  getters: {},
  actions: {
    setItems(value: any[]) {
      this.items = [...value];
    },
  },
});
