<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
  </div>
</template>
<script>
import BBreadcrumb from '../../../components/admin/BBreadcrumb'
export default {
  name: 'book-list',
  components: {
    BBreadcrumb
  },
  data () {
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
