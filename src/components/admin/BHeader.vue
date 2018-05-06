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
          <img class="user__avatar" src="../../assets/icons/TB1tlVMcgmTBuNjy1XbXXaMrVXa-140-140.png" />
          <span>{{userMsg.userName}}</span>
        </template>
        <el-menu-item index="/admin/modify-password">密码修改</el-menu-item>
        <el-menu-item index="/admin/setting-basic">个人资料修改</el-menu-item>
        <el-menu-item index="/login">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import BLogo from './BLogo'
import localStore from '../../utils/localStorage'
  export default {
    name: 'b-header',
    components: {
      BLogo
    },
    data() {
      return {
        userMsg: {},
      }
    },
    computed: {
      activeIndex() {
        return this.$route.path
      }
    },
    mounted() {
      this.getUserMsg()
    },
    methods: {
      getUserMsg() {
        localStore.set('jwt_token', {userName: 'ssddadsa'})
        const token = localStore.get('jwt_token')

        this.userMsg = token
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
        width: 30px;
        height: 30px;
      }
    }
  }
</style>

