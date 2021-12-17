<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="handlerLeave">
        <h2 class="all" @mouseenter="isShowNav=true">全部商品分类</h2>
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="btnSearch">
            <div class="item" v-for="c1 in categoryList.slice(0,-2)" :key="c1.categoryId">
              <h3>
                <a :data-id1="c1.categoryId" :data-name="c1.categoryName">{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a :data-id2="c2.categoryId" :data-name="c2.categoryName">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-id3="c3.categoryId"
                          :data-name="c3.categoryName"
                        >{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isShowNav: true
    };
  },
  mounted() {
    //相当于是全局形式的派发
    // this.$store.dispatch('getCategoryListDate')
    //使用模块化的方式进行派发
    // this.$store.dispatch("home/getCategoryListDate");
    // 发请求在app组件中发，可以优化代码
    if (!this.$route.meta.isShowTypeNav) {
      this.isShowNav = false;
    }
  },
  computed: {
    //使用mapState时，第一项应该指定模块名称
    ...mapState("home", ["categoryList"])
  },
  methods: {
    btnSearch(e) {
      let { id1, id2, id3, name } = e.target.dataset;
      if (!name) return; //判断点击的是否为空白地方，是就结束代码执行

      let location = {
        name: "search"
      };
      let query = {
        categoryName: name
      };
      if (id1) {
        query.category1Id = id1;
      } else if (id2) {
        query.category2Id = id2;
      } else {
        query.category3Id = id3;
      }

      location.query = query;

      // 判断之前有没有params参数，合并参数
      location.params = this.$route.params;
      this.$router.push(location);
    },
    handlerLeave() {
      if (!this.$route.meta.isShowTypeNav) {
        this.isShowNav = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            background-color: rgb(255, 180, 192);
            cursor: pointer;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>