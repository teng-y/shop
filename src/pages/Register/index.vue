<template>
  <!-- 项目的最外层 -->
	<div class="outer">
    <RegisterMain></RegisterMain>
    <Copyright></Copyright>
  </div>
</template>

<script>
import RegisterMain from './RegisterMain/index.vue'
import Copyright from './Copyright/index.vue'
export default {
    name:'Register',
    components:{
      RegisterMain,
      Copyright
    }
}
</script>

<style>

</style>