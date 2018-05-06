<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-if="item.to" v-for="(item, index) in breadList" :to="{path: item.to}" :key="index">
        {{item.name}}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-else>{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'b-breadcrumb',
  props: ['breadList'],
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-breadcrumb {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px 20px;
  }
</style>

