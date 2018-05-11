<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-tabs>
      <el-tab-pane label="全部" name="first">全部</el-tab-pane>
      <el-tab-pane label="普通用户" name="second">普通用户</el-tab-pane>
      <el-tab-pane label="管理员" name="third">管理员</el-tab-pane>
      <el-tab-pane label="被封禁用户" name="fourth">被封禁用户</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  export default {
    name: 'book-list',
    components: {
      BBreadcrumb
    },
    data() {
      return {
        breadList: [{
          name: '首页',
          to: '/admin'
        }, {
          name: '图书管理',
        }, {
          name: '图书列表',
          to: '/admin/book-list'
        }]
      }
    },
    methods: {

    }
  }

</script>
<style lang="scss" scoped>
  
</style>
