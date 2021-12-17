<template>
  <div class="pagination">
    <button @click="$emit('changePageNo',pageNo-1)" :disabled="pageNo<=1">上一页</button>
    <button v-show="startAndEnd.start > 1" @click="$emit('changePageNo',1)">1</button>
    <button v-show="startAndEnd.start > 2">...</button>
    <button 
      v-for="(_, index) in startAndEnd.end - startAndEnd.start + 1" 
      :key="_" 
      :class="{active:pageNo === index+startAndEnd.start}"
      @click="$emit('changePageNo',index + startAndEnd.start)">{{index + startAndEnd.start}}</button>
    <button v-show="startAndEnd.end < totalPage - 1">···</button>
    <button v-show="startAndEnd.end <totalPage" @click="$emit('changePageNo',totalPage)">{{totalPage}}</button>
    <button @click="$emit('changePageNo',pageNo+1)" :disabled="pageNo>=totalPage">下一页</button>
    <span>共{{total}}条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageNo", "pageSize", "continues"],
  computed: {
    //计算总页码数
    totalPage() {
      let { total, pageSize } = this;
      // console.log(total);
      return Math.ceil(total / pageSize); //向上取整
    },
    //计算起始结束页
    startAndEnd() {
      let { pageNo, continues, totalPage } = this;
      // console.log(pageNo,continues,totalPage);
      let start, end;
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      if(start<1){
        start = 1
        end = continues
      }
      if(end > totalPage){
        end = totalPage;
        start = totalPage - continues +1
      }
      return { start, end };
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }
  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>