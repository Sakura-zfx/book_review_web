<template>
  <div>
    <f-header :active-index="activeIndex"></f-header>
    <router-view />
  </div>
</template>
<script>
  import FHeader from '../components/front/FHeader'
  export default {
    name: 'index',
    components: {
      FHeader,
    },
    created() {
      this.activeIndex = this.$route.path
    },
    watch: {
      $route(to, from) {
        if (this.$route.matched.length === 0) {
          this.$router.push({
            path: '/404',
            query: {
              url: window.location.href
            }
          })
        }
        this.activeIndex = to.path
        if (+this.$Cookie.get('userRole') !== 1) {
          this.$Cookie.remove('userId')
          this.$Cookie.remove('userName')
          this.$Cookie.remove('expires')
          this.$Cookie.remove('userRole')
          this.$localStore.remove('jwt_token')
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }

</script>
<style lang="scss">
  .el-rate__icon {
    font-size: 16px;
    margin-right: 1px;
  }

  .el-rate__text {
    margin-left: 5px;
  }

</style>
