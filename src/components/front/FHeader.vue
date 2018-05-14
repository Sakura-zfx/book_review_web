<template>
  <div class="admin__header">
    <router-link to="/">
      <h3 class="link">book</h3>
    </router-link>
    <el-menu mode="horizontal" :default-active="activeIndex" class="el-menu" background-color="#2e323f" text-color="#ffffff"
      active-text-color="#3080fe" :router="true">
      <el-menu-item index="/admin">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">
          首页
        </span>
      </el-menu-item>
      <el-menu-item index="/admin/fankui">
        <i class="iconfont icon-zhuzhanicon13"></i>
        <span slot="title">
          反馈
        </span>
      </el-menu-item>
      <el-menu-item index="/admin/help">
        <i class="iconfont icon-bangzhu"></i>
        <span slot="title">
          帮助
        </span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <span>{{userName}}</span>
        </template>
        <el-menu-item index="">个人主页</el-menu-item>
        <el-menu-item index="">账号管理</el-menu-item>
        <el-menu-item index="" @click.native="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'f-header',
    data() {
      return {
        userName: 'zzz'
      }
    },
    methods: {
      logout() {
        this.$Cookie.remove('userId')
        this.$Cookie.remove('userName')
        this.$Cookie.remove('expires')
        localStore.remove('jwt_token')
      }
    }
  }

</script>
<style lang="scss" scoped>


</style>
