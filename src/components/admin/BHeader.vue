<template>
  <div class="admin__header">
    <b-logo class="el__logo" name="图书管理后台"></b-logo>
    <el-menu mode="horizontal" :default-active="activeIndex" class="el-menu" background-color="#2e323f"
      text-color="#ffffff" active-text-color="#3080fe" :router="true">
      <el-menu-item index="/admin">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">
          首页
        </span>
      </el-menu-item>
      <el-menu-item index="/admin?index=1">
        <i class="iconfont icon-zhuzhanicon13"></i>
        <span slot="title">
          反馈
        </span>
      </el-menu-item>
      <el-menu-item index="/admin?index=2">
        <i class="iconfont icon-bangzhu"></i>
        <span slot="title">
          帮助
        </span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <div class="user__avatar" :style="noAvatar ? `background-color: #2dc888` : ''">
            <span v-if="noAvatar" style="font-size: 12px;">{{userName.slice(-2)}}</span>           
            <img v-else class="img" @error="handleImgError" :src="imgUrl"/>            
          </div>
          <span>{{userName}}</span>
        </template>
        <el-menu-item index="/admin/modify-password">密码修改</el-menu-item>
        <!-- <el-menu-item index="/admin/setting-basic">个人资料修改</el-menu-item> -->
        <el-menu-item index="/admin/login" @click.native="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import BLogo from './BLogo'
import localStore from '../../utils/localStorage'
import Cookie from '../../mixins/cookie'
  export default {
    name: 'b-header',
    mixins: [Cookie],
    components: {
      BLogo,
    },
    data() {
      return {
        noAvatar: false,
        imgUrl: '',
      }
    },
    computed: {
      activeIndex() {
        return this.$route.path
      },
    },
    methods: {
      handleImgError() {
        this.noAvatar = true
      },
      logout() {
        this.$Cookie.remove('userId')
        this.$Cookie.remove('userName')
        this.$Cookie.remove('expires')
        this.$Cookie.remove('userRole')
        localStore.remove('jwt_token')
      }
    }
  }

</script>
<style lang="scss" scoped>
  .admin__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e323f;
    .el__logo {
      flex-basis: 200px;
    }
    .el-menu {
      flex-grow: 1;
      border: 0;
      display: flex;
      justify-content: flex-end;
      .el-menu-item {
        border: 0;
        &:hover {
          background-color: inherit !important;
          color: #3080fe !important;
          .iconfont {
          color: #3080fe !important;            
          }
        }
        &.is-active {
          border: 0;
        }
        span {
          font-size: 14px;
        }
      }
      .user__avatar {
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        .img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        } 
      }
    }
  }
</style>

