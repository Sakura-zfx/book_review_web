<template>
  <div>
  </div>
</template>
<script>
  export default {
    name: 'user-detail',
    components: {
    },
    data() {
      return {
        userMsg: {},
      }
    },
    watch: {
      '$route': 'post'
    },
    mounted() {
      
    },
    methods: {
      post() {
this.$axios.get(`/api/user/${this.$route.query.userId}`).then(res => {
        this.userMsg = {name: 'xxx'}
      })
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>
