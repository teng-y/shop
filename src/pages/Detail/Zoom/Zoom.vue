<template>
  <div class="spec-preview">
    <img ref="img1" :src="skuInfo.skuDefaultImg" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img ref="img2" :src="skuInfo.skuDefaultImg"  :style="{top:-top*2+'px',left:-left*2+'px'}"/>
    </div>
    <div class="mask" :style="{top:top+'px',left:left+'px'}"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuInfo"],
  data() {
    return {
      left: 0,
      top: 0
    };
  },
  methods: {
    move(e) {
      // console.log(e);
      let x = e.offsetX - 100;
      if (x < 0) x = 0;
      if (x > 200) x = 200;
      this.left = x;

      let y = e.offsetY - 100;
      if (y < 0) y = 0;
      if (y > 200) y = 200;
      this.top = y;
    }
  },
  mounted(){
    this.$bus.$on('getImg',img=>{
      this.$nextTick(()=>{
        this.$refs.img1.src=img
        this.$refs.img2.src=img
      })
    })
  }
};
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>