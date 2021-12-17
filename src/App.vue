<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show='!$route.meta.isHiddenFooter'></Footer>
  </div>

</template>

<script>
import Header from "./components/Header";
import Footer from './components/Footer'
export default {
  name:"App",
  components:{Header,Footer},
  mounted(){
    //typeNav发送请求
    this.$store.dispatch("home/getCategoryListDate");
  }
  
}
</script>

<style>

</style>