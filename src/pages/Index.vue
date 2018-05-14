<template>
  <div>
    <f-header></f-header>
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
    data() {
      return {

      }
    },
    created() {},
    methods: {

    }
  }

</script>
<style lang="scss" scoped>

</style>
