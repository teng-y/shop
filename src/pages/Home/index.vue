<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <!-- 商品分类导航 -->
    <TypeNav></TypeNav>
    <!--列表-->
    <ListContainer></ListContainer>
    <!--今日推荐-->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!--楼层-->
    <Floor></Floor>
    <Floor></Floor>
    <!--商标-->
    <Brand></Brand>
  </div>
</template>

<script>
import TypeNav from "./TypeNav/index.vue";
import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from './Brand/index.vue'
export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  }
};
</script>

<style>
</style>