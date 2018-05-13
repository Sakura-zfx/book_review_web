<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <div class="main">
      
    </div>
  </div>
</template>
<script>
import BBreadcrumb from '../../../components/admin/BBreadcrumb'
export default {
  name: 'cate-list',
  components: {
    BBreadcrumb
  },
  data () {
    return {
      breadList: [{
        name: '首页',
        to: '/admin'
      }, {
        name: '分类管理',
      }, {
        name: '分类列表',
        to: '/admin/cate-list'
      }]
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>
