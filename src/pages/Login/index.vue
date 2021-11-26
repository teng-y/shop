<template>
  <!-- 项目的最外层 -->
		<div class="outer">
      <!-- 登录 -->
      <LoginWrap></LoginWrap>
      <!-- 底部 -->
      <Copyright></Copyright>
    </div>
</template>

<script>
import LoginWrap from './LoginWrap/index.vue'
import Copyright from './Copyright/index.vue'
export default {
    name:'Login',
    components:{
      LoginWrap,
      Copyright
    }
}
</script>

<style>

</style>