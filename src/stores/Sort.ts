import { COLUMNS, ORDERS } from "@/constants";
import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", {
  state: () => ({ orderBy: COLUMNS.NAME, hierarchy: ORDERS.ASC }),
  getters: {},
  actions: {
    changeOrder(column: COLUMNS) {
      if (column === this.orderBy) {
        this.hierarchy *= -1;
      } else {
        this.hierarchy = ORDERS.ASC;
      }

      this.orderBy = column;
    },
  },
});
