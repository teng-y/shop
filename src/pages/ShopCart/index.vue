<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <!-- !!是将其它数据类型隐式转换成boolean类型数据的一种方式 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="!!cartInfo.isChecked"
              @change="checkCartInfoState(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 购物车商品增加数量 -->
            <a href="javascript:void(0)" @click="changeSkuNum('decrement',cartInfo)" class="mins">-</a>
            <!-- 购物车商品直接修改数量 -->
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change',cartInfo,$event)"
            />
            <!-- 购物车商品减少数量 -->
            <a href="javascript:void(0)" @click="changeSkuNum('increment',cartInfo)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice*cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="showDialogByDelOneCartInfo(cartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="showDialogByDelSelected">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{shopCartNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{shopCartMoney}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
    <!-- 自定义弹框 -->
    <Dialog :visible.sync="visible">
      <template v-slot:header>
        <span>提示</span>
      </template>
      <template>
        <p>确定要删除{{isDelOne?'这个':'选中的'}}商品吗？</p>
      </template>
      <template v-slot:footer>
        <div class="btn-footer">
          <button class="btn" @click="visible=false">取消</button>
          <button class="btn primary" @click="delShopCartInfo">确定</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
// import {
//   reqShopCartListData,
//   reqChangeShopCartInfoState,
//   reqDelOneShopCartInfo,
//   reqDelShopCartInfo,
//   reqAddOrUpdateCart
// } from "../../api/index";
import Dialog from "../../components/Dialog";
import { reg } from "../../util/reg";
export default {
  name: "ShopCart",
  components: { Dialog },
  data() {
    return {
      cartInfoList: [],
      visible: false,
      skuId: "",
      isDelOne: false,
      left: "",
      skuIdList: [], //选中商品的id
      leftCartInfoList: [] //未选中的商品
    };
  },
  async mounted() {
    const result = await this.$API.reqShopCartListData();
    if (result.code === 200) {
      // console.log(result.data);
      // 为了实现响应式，所以在当前的data中先添加一个cartInfoList
      this.cartInfoList = (result.data[0] && result.data[0].cartInfoList) || [];
    } else {
      console.log(result.message);
    }
  },
  methods: {
    async checkCartInfoState(cartInfo) {
      // let isChecked = cartInfo.isChecked == 1 ? 0 : 1;

      let isChecked = 1 - cartInfo.isChecked;
      const result = await this.$API.reqChangeShopCartInfoState(
        cartInfo.skuId,
        isChecked
      );

      if (result.code === 200) {
        // 如果成功了的话，页面
        cartInfo.isChecked = isChecked;
      } else {
        console.log(result.message);
      }
    },
    showDialogByDelOneCartInfo(skuId) {
      this.visible = true; //是否弹出自定义对话框
      this.skuId = skuId;
      this.isDelOne = true; //是否删除一个商品
    },
    async delShopCartInfo() {
      if (this.isDelOne) {
        const result = await this.$API.reqDelOneShopCartInfo(this.skuId);
        // console.log(this.skuId);
        if (result.code === 200) {
          this.visible = false;
          this.cartInfoList = this.cartInfoList.filter(
            item => item.skuId !== this.skuId
          );
        } else {
          console.log(result.message);
        }
        return;
      }

      const result = await this.$API.reqDelShopCartInfo({
        data: this.skuIdList
      });
      console.log(result);
      if (result.code === 200) {
        this.visible = false;
        this.cartInfoList = this.leftCartInfoList;
      } else {
        console.log(result.message);
      }
    },
    showDialogByDelSelected() {
      this.isDelOne = false;
      this.visible = true;
      this.cartInfoList.forEach(item => {
        if (item.isChecked) {
          this.skuIdList.push(item.skuId);
        } else {
          this.leftCartInfoList.push(item);
        }
      });
    },
    async changeSkuNum(type, cartInfo, $event) {
      let num = 0;
      switch (type) {
        case "increment":
          cartInfo.skuNum++;
          num++;
          if (cartInfo.skuNum > 200) {
            cartInfo.skuNum = 200;
            num = 0;
          }
          break;
        case "decrement":
          cartInfo.skuNum--;
          num--;
          if (cartInfo.skuNum < 1) {
            cartInfo.skuNum = 1;
            num = 0;
          }
          break;
        case "change":
          let oldSkuNum = cartInfo.skuNum;
          // console.log(oldSkuNum);
          let newSkuNum = $event.target.value;
          if (reg.test(newSkuNum)) {
            // console.log(1);
            num = newSkuNum - cartInfo.skuNum;
            cartInfo.skuNum = newSkuNum;

            if (cartInfo.skuNum > 200) {
              cartInfo.skuNum = 200;
              num = cartInfo.skuNum - oldSkuNum;
            }
          } else {
            // console.log(oldSkuNum);
            //这里使用cartInfo.skuNum不能控制input中的value
            // cartInfo.skuNum = 1;
            cartInfo.skuNum = 1;
            $event.target.value = 1;
            num = 1 - oldSkuNum;
          }
          break;
      }
      if (num === 0) return;
      const result = await this.$API.reqAddOrUpdateCart(cartInfo.skuId, num);
      console.log(result);
    }
  },
  computed: {
    checkAll: {
      get() {
        return this.cartInfoList.every(item => item.isChecked === 1);
      },
      set(newValue) {
        this.cartInfoList.forEach(item => {
          let isChecked = newValue ? 1 : 0;
          item.isChecked = isChecked;

          this.checkCartInfoState({
            skuId: item.skuId,
            isChecked: 1 - isChecked
          });
        });
      }
    },
    //购物车中选中商品个数
    shopCartNum() {
      return this.cartInfoList.filter(item => item.isChecked).length;
    },
    //购物车中选中商品总价格
    shopCartMoney() {
      // return this.cartInfoList.reduce((prev,current)=>
      //   prev + current.isChecked*current.skuPrice*current.skuNum
      // ,0)
      const arr = this.cartInfoList.filter(item => item.isChecked);
      var num = 0;
      arr.forEach(item => {
        num += item.skuPrice * item.skuNum;
      });
      return num;
    }
  },
  watch: {
    visible: {
      immediate: true, //开始就监听
      handler() {
        if (this.visible) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
  .btn-footer {
    position: absolute;
    right: 40px;
    bottom: 20px;
    .btn {
      width: 62px;
      height: 32px;
      font-size: 14px;
      margin-left: 16px;
      border-width: 1px;
      border-radius: 10%;
      cursor: pointer;
      &.primary {
        background-color: rgb(102, 177, 255);
        color: #fff;
      }
    }
  }
}
</style>