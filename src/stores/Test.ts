import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTestStore = defineStore("testStore", () => {
  const obj = ref({});

  return { obj };
});
