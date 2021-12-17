<template>
  <div>
    <h1>EventTest组件</h1>
    <button @click="test1(1,$event)">dianj</button>
    <Event2 @click="test2($event)">{{msg}}</Event2>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',
    data(){
      return {
        msg:'hh'
      }
    },
    components: {
      Event1,
      Event2,
    },

    methods: {
      test1(num,event){
        console.log(num,event);
      },
      test2(event){
       console.log(event);
     }
    }
  }
</script>
