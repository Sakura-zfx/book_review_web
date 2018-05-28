<template>
  <div class="main" v-loading="loading" :element-loading-text="loadingText">
    <h1 class="title">{{title}}</h1>
    <book-item v-for="item in bookList" :key="item.bookId" :book-msg="item">
      <span slot="priority" style="font-size: 14px; white-space: no-wrap;">推荐指数：{{(item.priority) * 100}}</span>
    </book-item>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem'
  import Cookie from 'js-cookie'
  export default {
    name: 'recommendation',
    components: {
      BookItem,
    },
    data() {
      return {
        bookList: [],
        userId: +this.$Cookie.get('userId'),
        loading: false,
        loadingText: '正在生成推荐...'
      }
    },
    // 页面权限验证
    beforeRouteEnter(to, from, next) {
      if (Cookie.get('userId')) {
        next(true)
      } else {
        next('/')
      }
    },
    computed: {
      title() {
        if (this.loading) {
          return ''
        } else {
          if (this.bookList.length !== 0) {
            return '基于您的爱好为您推荐'
          } else {
            return '暂无可用推荐，请好评图书后再启用该服务'
          }
        }
      }
    },
    created() {
      this.getRec()
    },
    methods: {
      getRec() {
        this.loading = true
        this.$axios.get(`/api/book/user/${this.userId}/recommendation`).then(res => {
          if (res.data.code === 200) {
            this.loading = false            
            this.bookList = res.data.data.list
          } else if (res.data.code === -2000) {
            setTimeout(() => {
              this.loading = true
              this.loadingText = '正在生成首次推荐...'
              // 初始化后重新获取推荐
              this.$axios.get(`/api/book/user/${this.userId}/recommendation`).then(res1 => {
                if (res1.data.code === 200) {
                  this.bookList = res1.data.data.list
                }
                this.loading = false
              }).catch(err => {
                this.loading = false
                this.$message.error(err)
              })
            }, 500)
          }
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      },
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
  }

</style>
