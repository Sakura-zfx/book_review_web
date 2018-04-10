<template>
  <div>
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '',
    }
  },
  created () {
    this.getLogout()
  },
  methods: {
    getLogout() {
      this.$axios.get('/api/logout/123456').then(res => {
        console.log(res)
        this.msg = res
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
