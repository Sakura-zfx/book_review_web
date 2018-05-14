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
<style lang="scss">
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }

  .admin__page {
    position: relative;
    background-color: #2e323f;    
    min-height: 100vh;
    .el-aside {
      padding-left: 20px;
    }
    .el-main {
      padding: 0 20px;
    }
    .el-tabs {
      padding: 15px 20px;
      background-color: #fff;
      border-radius: 5px;
      .el-pagination {
        text-align: center;
      }
    }
    .el-table {
      text-align: left;
      .warning-row {
        background: oldlace;
      }
    }
    .el-dialog__header {
      text-align: left;
    }
  }

</style>
