<template>
  <!--list-content-->
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-show="searchParams.categoryName">
            {{searchParams.categoryName}}
            <i @click="delCateName">×</i>
          </li>
          <li class="with-x" v-show="searchParams.keyword">
            {{searchParams.keyword}}
            <i @click="delKeyword">×</i>
          </li>
          <li class="with-x" v-show="searchParams.trademark">
            {{trademarkName}}
            <i @click="delTrademark">×</i>
          </li>
          <li class="with-x" v-for="(prop,index) in searchParams.props" :key="prop">
            {{`${prop.split(':')[2]}:${prop.split(':')[1]}`}}
            <i @click="delProp(index)">×</i>
          </li>
        </ul>
      </div>
      <!--selector-->
      <div class="clearfix selector">
        <div class="type-wrap logo">
          <div class="fl key brand">品牌</div>
          <div class="value logos">
            <ul class="logo-list">
              <li
                v-for="trad in trademarkList"
                :key="trad.tmId"
                @click="handleTrademark(trad)"
              >{{trad.tmName}}</li>
            </ul>
          </div>
        </div>
        <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
          <div class="fl key">{{attr.attrName}}</div>
          <div class="fl value">
            <ul class="type-list">
              <li v-for="attrValue in attr.attrValueList" :key="attrValue">
                <a @click="handleAttr(attrValue,attr)">{{attrValue}}</a>
              </li>
            </ul>
          </div>
          <div class="fl ext"></div>
        </div>
      </div>
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <!-- 综合高亮 -->
              <li :class="{active:!isPrice}" @click="changeOrder(1)">
                <a>
                  综合
                  <span
                    class="iconfont icon-shangfan"
                    :class="{'icon-shangfan':isUp,'icon-xiafan':!isUp}"
                    v-show="!isPrice"
                  ></span>
                </a>
              </li>
              <!-- 价格高亮 -->
              <li :class="{active:isPrice}" @click="changeOrder(2)">
                <a>
                  价格
                  <span
                    class="iconfont icon-shangfan"
                    :class="{'icon-shangfan':isUp,'icon-xiafan':!isUp}"
                    v-show="isPrice"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="`/detail/${good.id}`">
                    <img v-lazy="good.defaultImg" />
                  </router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥&nbsp;&nbsp;</em>
                    <i>{{good.price}}</i>
                  </strong>
                </div>
                <div class="attr">
                  <router-link :to="`/detail/${good.id}`" :title="good.title">{{good.title}}</router-link>
                </div>
                <div class="commit">
                  <i class="command">
                    已有
                    <span>2000</span>人评价
                  </i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                  >加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器 -->
        <Pagination
          :total="total"
          :pageSize="searchParams.pageSize"
          :continues="4"
          :pageNo="searchParams.pageNo"
          @changePageNo="changePageNo"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Main",
  props: [
    "searchParams",
    "getCateName",
    "getKeyword",
    "getTradmark",
    "getNewTradmark",
    "getAttr",
    "getNewProp"
  ],
  computed: {
    ...mapGetters("search", [
      "trademarkList",
      "attrsList",
      "goodsList",
      "total"
    ]),
    trademarkName() {
      const { trademark } = this.searchParams;
      return trademark ? trademark.split(":")[1] : "";
    },
    //判断排序方式
    isUp() {
      // console.log(this.searchParams.order);
      return this.searchParams.order.split(":")[1] === "asc";
    },
    //判断"综合"和"价格"谁高亮
    isPrice() {
      return this.searchParams.order.split(":")[0] === "2";
    }
  },
  methods: {
    delCateName() {
      this.searchParams.categoryName = "";
      this.getCateName(this.searchParams);
    },
    delKeyword() {
      this.searchParams.keyword = "";
      this.getKeyword(this.searchParams);
    },
    //点击品牌调用getTradmark
    handleTrademark(trad) {
      // console.log(trad);
      this.getTradmark(trad);
    },
    //点击品牌面包屑的删除按钮，将searchParams中的trademark设置为空，然后调用点击品牌调用getNewTradmark
    delTrademark() {
      this.searchParams.trademark = undefined;
      this.getNewTradmark();
      // let value = this.searchParams;
      // this.getTradmark(value);
      // console.log(this.searchParams);
    },
    handleAttr(attrValue, attr) {
      // console.log(attrValue);
      this.getAttr(attrValue, attr);
    },
    delProp(index) {
      this.getNewProp(index);
    },
    //得到当前页数发送请求
    changePageNo(currentPage) {
      this.searchParams.pageNo = currentPage;

      this.$store.dispatch("search/getSearchGoodsData", this.searchParams);
    },
    //排序
    changeOrder(newNum) {
      let [oldNum, oldType] = this.searchParams.order.split(":");
      if (oldNum == newNum) {
        this.searchParams.order = `${oldNum}:${
          oldType == "asc" ? "desc" : "asc"
        }`;
      } else {
        this.searchParams.order = `${newNum}:'asc'`;
      }
      this.$store.dispatch("search/getSearchGoodsData", this.searchParams);
    }
  }
};
</script>

<style lang='less' scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;
      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;
        .key {
          padding-bottom: 87px !important;
        }
      }
      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;
        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }
        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;
          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;
              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }
          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;
              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }
        .ext {
          position: absolute;
          top: 10px;
          right: 10px;
          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }
          a {
            color: #666;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>