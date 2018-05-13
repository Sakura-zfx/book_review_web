<template>
  <div class="aside__container">
    <el-menu :default-active="defaultActive" mode="vertical" class="el-menu-vertical" background-color="#2e323f" active-text-color="#ffffff"
      :router="true">
      <el-menu-item v-if="!item.children" v-for="(item, index) in menuList" :key="index" :index="item.to">
        <i :class="`iconfont ${item.icon}`"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.name">
        <template slot="title">
          <div class="sl">
            <i :class="`iconfont ${item.icon}`"></i>
            <span slot="title">{{item.name}}</span>
          </div>
        </template>
        <el-menu-item v-for="child in item.children" :index="child.to" :key="child.to">
          <!-- <i :class="`iconfont ${item.icon}`"></i> -->
          <span slot="title">{{child.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'b-aside',
    data() {
      return {
        menuList: [{
            name: 'Dashboard',
            to: '/admin',
            icon: 'icon-shouye',
          },
          {
            name: '图书管理',
            icon: 'icon-tushuguanlixitong',
            children: [{
              name: '图书列表',
              to: '/admin/book-list',
            }, {
              name: '添加图书',
              to: '/admin/book-create',
            }]
          },
          {
            name: '评论管理',
            to: '/admin/comment-list',
            icon: 'icon-pinglunguanli',
          },
          {
            name: '分类管理',
            icon: 'icon-fenleiguanli',
            children: [{
              name: '分类列表',
              to: '/admin/cate-list',
            }, {
              name: '添加分类',
              to: '/admin/cate-create'
            }]
          },
          {
            name: '标签管理',
            icon: 'icon-biaoqianguanli',
            children: [{
              name: '标签列表',
              to: '/admin/tag-list',
            }, {
              name: '添加标签',
              to: '/admin/tag-create',
            }]
          },
          {
            name: '用户管理',
            icon: 'icon-yonghuguanli',
            children: [{
              name: '用户列表',
              to: '/admin/user-list',
            }, {
              name: '添加用户',
              to: '/admin/user-create',
            }]
          },
          {
            name: '通用管理',
            icon: 'icon-shezhi',
            children: [{
              name: '修改个人资料',
              to: '/admin/setting-basic',
            }, {
              name: '修改密码',
              to: '/admin/modify-password',
            }, {
              name: '菜单设置',
              to: '/admin/setting-navigation',
            }]
          }
        ]
      }
    },
    computed: {
      defaultActive() {
        return this.$route.path
      }
    }
  }

</script>
<style lang="scss" scoped>
  .iconfont {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    color: #ffffff;
  } 
  .el-menu-vertical {
    &:not(.el-menu--collapse) {
      width: 200px;
    }
    border: 0;
    overflow: hidden;
    .el-menu-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 5px;
      margin-bottom: 1px;
      height: 40px;
      color: #ffffff;
      &:hover,
      &.is-active {
        background-color: #3080fe !important;
      }
      .el-tooltip {
              display: flex;
      justify-content: flex-start;
      align-items: center;
      }
    }
  }

  .el-submenu {
    .el-menu-item {
      span {
        padding-left: 9px;
        color: #999999;
      }
      &:hover,
      &.is-active {
        span {
          color: #ffffff;
        }
      }
    }
  }

  .sl {
    display: flex;
    align-items: center;
    color: #ffffff;
  }

</style>
