<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <TypeNav></TypeNav>
    <Main></Main>
  </div>
</template>

<script>
import TypeNav from './TypeNav/index.vue'
import Main from "./Main/index.vue";
export default {
  name: "Search",
  components: {
    TypeNav,
    Main
  }
};
</script>

<style>

</style>