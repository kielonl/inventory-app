import { COLUMNS, ORDERS } from "@/constants";
import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", {
  state: () => ({ orderBy: COLUMNS.NAME, order: ORDERS.ASC }),
  getters: {},
  actions: {
    changeOrder(column: COLUMNS) {
      if (column === this.orderBy) {
        this.order *= -1;
      } else {
        this.order = ORDERS.ASC;
      }

      this.orderBy = column;
    },
  },
});
