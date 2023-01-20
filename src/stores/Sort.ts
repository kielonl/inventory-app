import { COLUMNS, ORDERS } from "@/constants";
import { defineStore } from "pinia";

export const useSortStore = defineStore("sortStore", {
  state: () => ({ orderBy: COLUMNS.NAME, hierarchy: ORDERS.ASC }),
  getters: {},
  actions: {},
});
