<template>
  <div>
    <h2>深入v-model</h2>

    <!-- <input type="text" v-model="msg" /> -->
    <!-- <input type="text" :value='msg' @input="msg = $event.target.value"/> -->
    <!-- <CustomInput v-model="msg"></CustomInput> -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <span>我是{{msg}}</span>
    <br />
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  components: {
    CustomInput
  },
  data() {
    return {
      msg: "芜湖大司马"
    };
  }
};
</script>
