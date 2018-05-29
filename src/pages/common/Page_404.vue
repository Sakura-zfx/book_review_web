<template>
  <div style="text-align: center; padding-top: 50px;">
    <p>网页 {{url}} 未找到，将在三秒后返回首页...</p>
  </div>
</template>
<script>
export default {
  name: 'page-404',
  data () {
    return {
      url: this.$route.query.url
    }
  },
  created() {
    this.gotoFirst()
  },
  methods: {
    gotoFirst() {
      setTimeout(() => {
        this.$router.replace('/')
      }, 3000)
    }
  }
}
</script>
<style>
  
</style>

