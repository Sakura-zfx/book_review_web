<template>
  <div class="main" v-loading="loading" :element-loading-text="loadingText">
    <h1 class="title">{{title}}</h1>
    <book-item v-for="item in bookList" :key="item.bookId" :book-msg="item">
    </book-item>
    <el-pagination
      v-show="bookList.length !== 0"
      layout="prev, pager, next"
      :total="total"
      background
      @current-change="handleCurrentChange"
      class="pagination"
      >
    </el-pagination>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem.vue'
  export default {
    name: 'search',
    components: {
      BookItem,
    },
    data() {
      return {
        bookList: [],
        userId: +this.$Cookie.get('userId'),
        loading: false,
        loadingText: '正在搜索图书...',
        total: 0,
        pageId: 1,
      }
    },
    computed: {
      title() {
        if (this.loading) {
          return ''
        } else if (this.bookList.length !== 0) {
          return `搜索 ${this.searchMsg} (共${this.total}条数据)`
        } else {
          return `暂无与 ${this.searchMsg} 相关的图书`
        }
      },
      searchMsg() {
        return this.$route.query.searchMsg
      }
    },
    watch: {
      $route() {
        this.pageId = 1
        this.getBookList()
      }
    },
    created() {
      this.getBookList()
    },
    methods: {
      handleCurrentChange(val) {
        this.pageId = val
        this.getBookList()
        window.scrollTo(0, 0)
      },
      getBookList() {
        if (!this.searchMsg || this.loading) {
          return
        }
        this.loading = true
        this.$axios.get('/api/book/search', {
          params: {
            searchMsg: this.searchMsg,
            pageId: this.pageId,
          }
        }).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }

          if (code === 200) {
            this.bookList = res.data.data
            this.total = res.data.count
          }
          this.loading = false
        }).catch(error => {
          this.$message.error(error)
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .main {
    padding: 15px 10%;
    min-height: 500px;
    .title {
      font-size: 24px;
      font-weight: 500;
    }
    .pagination {
      margin-left: 20%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

</style>
