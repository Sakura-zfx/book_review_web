<template>
  <div class="main">
    <div class="book-basic">
      <div class="cover"></div>
      <div class="score-msg"></div>
    </div>
    <div class="book-intro"></div>
    <div class="book-sreview"></div>
    <div class="book-breview"></div>
  </div>
</template>
<script>
  export default {
    name: 'book-detail',
    components: {
    },
    data() {
      return {
        bookId: +this.$route.query.bookId,
        bookMsg: null,
        loading: false,
      }
    },
    created() {
      this.getBookDetail()
    },
    methods: {
      getCover(url) {
        return `http://127.0.0.1:3000/uploads/${url}`
      },
      getBookDetail() {
        this.$axios.get(`/api/book/${this.bookId}`).then(res => {
          if (res.data.code === 200) {
            this.bookMsg = res.data.data
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .main {
    padding: 15px 10%;
    display: flex;
    flex-direction: column;
  }
</style>
