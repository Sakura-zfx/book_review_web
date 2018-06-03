<template>
  <div class="main" v-loading="loading" :element-loading-text="loadingText">
    <h1 class="title">{{title}}</h1>
    <book-item v-if="bookList.length !== 0" v-for="item in bookList" :key="item.bookId" :book-msg="item">
      <img class="cover" slot="cover" v-if="item.bookPic" :title="item.bookName" :src="`http://127.0.0.1:3000/uploads/${item.bookPic}`" />
      <img class="cover" slot="cover" v-else :title="item.bookName" src="../../assets/images/book-default-lpic.gif" />
      <span slot="priority" style="font-size: 14px; white-space: no-wrap;">推荐指数：{{((item.priority) * 100 ).toFixed(0)}}</span>
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
        loadingText: '正在生成推荐...',
      }
    },
    // 页面权限验证
    beforeRouteEnter(to, from, next) {
      if (Cookie.get('userId')) {
        next()
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
            this.bookList = res.data.data ? res.data.data.list : [] 
          }
          this.loading = false          
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

  .cover {
    cursor: pointer;
    width: 60px;
    height: 80px;
  }

</style>
