<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <TypeNav></TypeNav>
    <Main></Main>
  </div>
</template>

<script>
import Main from "./Main/index.vue";
export default {
  name: "Search",
  components: {
    Main
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "",
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  watch: {
    $route: {
      immediate: true, //开局监控
      handler() {
        Object.assign(this.searchParams, {
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
          categoryName: undefined,
          keyword:undefined
        });
        Object.assign(this.searchParams,this.$route.query)

        this.$store.dispatch('search/getSearchGoodsData',this.searchParams)
      }
    }
  }
};
</script>

<style>
</style>