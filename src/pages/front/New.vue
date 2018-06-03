<template>
  <div class="main" v-loading="loading" :element-loading-text="loadingText">
    <book-item :show-rate="false" v-for="item in newList" :key="item.bookId" :book-msg="item">
      <img class="cover" slot="cover" v-if="item.bookPic" :title="item.bookName" :src="`http://127.0.0.1:3000/uploads/${item.bookPic}`"
      />
      <img class="cover" slot="cover" v-else :title="item.bookName" src="../../assets/images/book-default-lpic.gif" />
    </book-item>
    <el-pagination v-show="newList.length !== 0" layout="prev, pager, next" :total="total" background @current-change="handleCurrentChange"
      class="pagination">
    </el-pagination>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem.vue'
  export default {
    name: 'new',
    components: {
      BookItem
    },
    data() {
      return {
        loading: false,
        loadingText: '正杂加载新书列表...',
        newList: [],
        pageId: 1,
        total: 30,
      }
    },
    created() {
      this.getNewList()
    },
    methods: {
      handleCurrentChange(val) {
        this.pageId = val
        this.getNewList()
        window.scrollTo(0, 0)
      },
      getNewList() {
        this.$axios.get('/api/book/new', {
          params: {
            pageId: this.pageId,
            limit: 10,
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.newList = res.data.data
          }
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
  }

  .cover {
    cursor: pointer;
    width: 60px;
    height: 80px;
  }
  .pagination {
      margin-left: 20%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
</style>
