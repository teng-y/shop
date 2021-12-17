<template>
  <div class="dialog" v-show="visible">
    <div class="dialog-wrap">
      <div class="dialog-header">
        <slot name="header"></slot>
        <button @click="close">❌</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialogfooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props:{
    visible:{
        type:Boolean, //数据类型
        required:true  
    }
  },
  methods:{
    close(){
        this.$emit('update:visible',false)
    }
  }
};
</script>

<style lang="less" scoped>
.dialog {
  // 最外层
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

// 内层水平垂直居中
.dialog-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 460px;
  height: 130px;
  box-sizing: border-box; // 内减模式
  padding: 12px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  .dialog-header {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    .dialog-header-close {
      border: none; // 去掉边框
      outline: none; // 去掉环绕线
      background-color: transparent; // 透明色
      cursor: pointer;
    }
  }
  // 中间
  .dialog-body {
    text-align: center;
    font-size: 16px;
    padding: 10px;
  }
}
</style>