<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <TypeNav></TypeNav>
    <Main 
      :searchParams='searchParams' 
      :getCateName='getCateName' 
      :getKeyword='getKeyword'
      :getTradmark='getTradmark'
      :getNewTradmark='getNewTradmark'
      :getAttr='getAttr'
      :getNewProp='getNewProp'
      ></Main>
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
        order: "2:asc",
        pageNo: 1,
        pageSize: 2
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
        Object.assign(this.searchParams,this.$route.query,this.$route.params)

        this.$store.dispatch('search/getSearchGoodsData',this.searchParams)
      }
    }
  },
  methods:{
    //删除路径中的CateName
    getCateName(value){
      this.searchParams = value
  
      let location = {
        name:'search'
      }
      location.params = this.$route.params
      this.$router.push(location)

    },
    getKeyword(value){
      this.searchParams=value

      let location = {
        name:'search',
        params:{
          keyword:undefined
        }
      }
      location.query = this.$route.query
      this.$router.push(location)
    },
    getTradmark(trad){
      // console.log('trad',trad);
      this.searchParams.trademark = `${trad.tmId}:${trad.tmName}`
      // console.log( this.searchParams);
      this.$store.dispatch('search/getSearchGoodsData',this.searchParams)
    },
    getNewTradmark(){
      this.$store.dispatch('search/getSearchGoodsData',this.searchParams)
    },
    getAttr(attrValue,attr){
      let {attrId,attrName}=attr
      
      const prop = `${attrId}:${attrValue}:${attrName}`
     
      if (this.searchParams.props.indexOf(prop) == -1) {
        // 如果没有这个属性的话，才需要往里添加 如果已经有了，就不需要再添加了
        this.searchParams.props.push(prop);

        // 重新发送请求
        this.$store.dispatch('search/getSearchGoodsData',this.searchParams)
    }},
    getNewProp(index){
      this.searchParams.props.splice(index,1)
      this.$store.dispatch('search/getSearchGoodsData',this.searchParams)
    }
  }
};
</script>

<style>
</style>