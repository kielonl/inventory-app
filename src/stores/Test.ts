import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTestStore = defineStore("testStore", () => {
  const obj = ref({ pozdrawiam: "Huberta Dziude" });
  const getObj = computed(() => "Pozdrawiam " + obj.value.pozdrawiam);

  const changeObj = (name: string) => {
    obj.value.pozdrawiam = name;
  };

  return { obj, getObj, changeObj };
});
