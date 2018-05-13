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
  name: 'basic',
  components: {
    BBreadcrumb
  },
  data () {
    return {
      breadList: [{
        name: '首页',
        to: '/admin'
      }, {
        name: '通用管理',
      }, {
        name: '个人资料修改',
        to: '/admin/setting-basic'
      }]
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>
