<template>
  <div class="main" v-loading="loading" :element-loading-text="loadingText">
    <h1 class="title">图书排行榜</h1>
    <p class="fz14">
      <span style="color: #37a;">热门</span> / 
      <span>评分</span> / 
      <span>收藏</span>    
    </p>
    <book-item class="item" v-for="(item, index) in hotList" :key="item.bookId" :book-msg="item">
      <img class="cover" slot="cover" v-if="item.bookPic" :title="item.bookName" :src="`http://127.0.0.1:3000/uploads/${item.bookPic}`"
      />
      <img class="cover" slot="cover" v-else :title="item.bookName" src="../../assets/images/book-default-lpic.gif" />
      <div class="score place" slot="priority">#{{index + 1}}</div>
    </book-item>
    <el-pagination v-show="hotList.length !== 0" layout="prev, pager, next" :total="total" background @current-change="handleCurrentChange"
      class="pagination">
    </el-pagination>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem.vue'
  export default {
    name: 'billboard',
    components: {
      BookItem
    },
    data() {
      return {
        loading: false,
        loadingText: '正杂加载新书列表...',
        hotList: [],
        pageId: 1,
        total: 30,
      }
    },
    created() {
      this.getHotList()
    },
    methods: {
      handleCurrentChange(val) {
        this.pageId = val
        this.getHotList()
        window.scrollTo(0, 0)
      },
      getHotList() {
        this.$axios.get('/api/book/hot', {
          params: {
            pageId: this.pageId,
            limit: 10,
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.hotList = res.data.data
            if (this.hotList.length < 10) {
              this.total = this.pageId * 10
            }
          }
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
  .item {
    position: relative;
  }
  .place {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
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
