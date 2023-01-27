<template>
  <div class="card">
    <div @click="backToItems" class="upper-bar">
      <LeftArrowIcon />BACK TO ALL ITEMS
    </div>
    <div class="item-image">
      <img :src="header" alt="header-image" />
    </div>
    <div class="item-description">
      <h2 class="item-author">{{ item?.name }}</h2>
      <p class="item-uuid">{{ item?.uuid }}</p>
      <h4 class="item-type">{{ item?.type }}</h4>
      <p class="item-description">
        {{ item?.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { readById } from "@/services/itemService";
import header from "../../../assets/halinowpetla.png";
import type { Item } from "@/types";
import LeftArrowIcon from "@/icons/LeftArrowIcon.vue";

import { useRouter } from "vue-router";

interface Props {
  id: string;
}
const props = defineProps<Props>();
const router = useRouter();

const item = ref<Item>();

onMounted(async () => {
  const result = await readById(props.id);
  item.value = result;
});

const backToItems = () => {
  router.push("/home");
};
</script>

<style scoped lang="scss">
@import url("../styles/SingleItem.scss");
</style>
