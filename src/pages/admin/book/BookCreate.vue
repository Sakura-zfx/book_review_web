<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <div class="book__main">
      
    </div>
  </div>
</template>
<script>
import BBreadcrumb from '../../../components/admin/BBreadcrumb'
export default {
  name: 'book-create',
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
        name: '添加图书',
        to: '/admin/book-create'
      }]
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>
