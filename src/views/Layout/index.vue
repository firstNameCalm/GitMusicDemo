<template>
  <div>
    <van-nav-bar :title="activeTitle" fixed/>
    <!-- 二级路由挂载点 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar  route >
      <van-tabbar-item icon="home-o" replace to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/layout/search">搜索页</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title,
    };
  },
  // 路由切换 -侦听$route 对象改变
  watch:{
    $route(){
      this.activeTitle = this.$route.meta.title
    }
  }
}
</script>

<style scoped>

/* 标题 */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>