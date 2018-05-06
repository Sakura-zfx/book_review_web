<template>
  <el-container class="admin__page">
    <el-header>
      <b-header></b-header>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <b-aside></b-aside>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>
      <b-footer></b-footer>
    </el-footer>
  </el-container>
</template>
<script>
  import BHeader from '../../components/admin/BHeader'
  import BFooter from '../../components/admin/BFooter'
  import BAside from '../../components/admin/BAside'
  export default {
    name: 'admin',
    components: {
      BHeader,
      BFooter,
      BAside
    }
  }

</script>
<style lang="scss" scoped>
  .admin__page {
    position: relative;
    min-height: 100vh;
    .el-aside {
      padding-left: 20px;
    }
    .el-main {
      padding: 0 20px;
    }
  }

</style>
