<template>
  <div class="item-wrapper flex--center">
    <div class="item-container box-shadow--bottom">
      <div class="item-image">
        <img :src="header" alt="header-image" />
      </div>
      <div class="right-side">
        <div class="item-author">autor</div>
        <div class="item-type">type</div>
        <div class="item-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut delectus
          aperiam quidem cupiditate eaque rem dolores ex id quo quae?
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import { readById } from "@/services/itemService";
import header from "../../../assets/cos.png";

interface Props {
  id: string;
}

const props = defineProps<Props>();
onMounted(async () => {
  //   console.log(result);
});
</script>

<style scoped lang="scss">
@import url("../styles/SingleItem.scss");
</style>
