<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            {{userInfo.name}}
            <button @click="logout">退出登录</button>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/Login">登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" v-model="keyword" class="input-error input-xxlarge" />
          <button class="sui-btn btn-xlarge btn-danger" @click="btnSearch" type="button">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
// import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: ""
    };
  },
  computed:{
    ...mapState('user',['userInfo'])
  },
  methods: {
    //搜索框跳转
    btnSearch() {
      // let {query} = this.$route
      // console.log(query);
      // console.log(this.keyword);
      // this.$router.push({
      //   name: "search",
      //   query: {
      //     ...query,
      //     keyword: this.keyword,
      //   }
      // });
      let location = {
        name:'search'
      }
      let params = {keyword:this.keyword || undefined}
      location.params = params
      // console.log(this.$route.query);
      location.query = this.$route.query
      // console.log(location);
      this.$router.push(location)
    },
    //退出登录
    async logout(){
      try {
        await this.$store.dispatch('user/userLogout')
        this.$router.push('/')
      } catch (error) {
        alert('退出登录失败')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>