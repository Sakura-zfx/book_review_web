<template>
  <div class="container">
    <div class="left">
      <div class="new-book">
        <h1 class="title">
          新书速递
          <span @click="linkMore('new')" class="link-more">查看更多...</span>
        </h1>
        <el-carousel @change="freshNew" height="430px" trigger="click" :autoplay="false" indicator-position="outside">
          <el-carousel-item class="new-container" v-for="pageId in 3" :key="pageId">
            <div class="each-new" v-for="item in newList" :key="item.bookId">
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.bookName" v-if="item.bookPic" :src="`http://127.0.0.1:3000/uploads/${item.bookPic}`"
              />
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.bookName" v-else src="../../assets/images/book-default-lpic.gif"
              />
              <p @click="gotoBookDetail(item.bookId)" class="name" :title="item.bookName">{{item.bookName}}</p>
              <p>{{item.authorList ? item.authorList : '佚名'}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hot-book">
        <h1 class="title">
          最热图书
          <span @click="linkMore('hot')" class="link-more">查看更多...</span>
        </h1>
        <div class="hot-list">
          <div style="height: 200px" v-if="hotList.length === 0">暂无数据</div>        
          <el-card v-else v-for="item in hotList" :key="item.bookId" shadow="never" :body-style="{padding: '0', marginRight: '20px'}">
            <book-item :book-msg="item">
              <img class="cover" slot="cover" v-if="item.bookPic" :title="item.bookName" :src="`http://127.0.0.1:3000/uploads/${item.bookPic}`"
              />
              <img class="cover" slot="cover" v-else :title="item.bookName" src="../../assets/images/book-default-lpic.gif" />
            </book-item>
            <p :title="item.summary" class="summary">简介：{{item.summary ? item.summary : '暂无简介'}}</p>
          </el-card>
        </div>
      </div>
      <div class="hot-review">
        
      </div>
    </div>
    <div class="right">
      <div class="tag-list">
        <h1 class="title">
          热门标签
          <span @click="linkMore('tag')" class="link-more">所有标签...</span>          
        </h1>
        <div style="height: 200px" v-if="tagList.length === 0">暂无数据</div>                
        <div class="each-tag" v-else v-for="item in tagList" :key="item.cateId">
          <p style="font-size: 14px;">{{item.cateName}}</p>
          <el-tag type="info" size="small" v-for="tag in item.tags" :key="tag.id">
            {{tag.tagName}}
            <router-link v-if="tag.count" to="/">({{tag.count}})</router-link>                      
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem.vue'
  export default {
    name: 'default-page',
    components: {
      BookItem,
    },
    data() {
      return {
        newList: [],
        hotList: [],
        tagList: [],
      }
    },
    created() {
      this.getHotList()
      this.getTagList()
    },
    methods: {
      getNewList(pageId) {
        this.$axios.get('/api/book/new', {
          params: {
            pageId: pageId,
            limit: 10,
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.newList = res.data.data
          }
        })
      },
      getHotList() {
        this.$axios.get('/api/book/hot').then(res => {
          if (res.data.code === 200) {
            this.hotList = res.data.data
          }
        })
      },
      getTagList() {
        this.$axios.get('/api/tag').then(res => {
          if (res.data.code === 200) {
            this.tagList = res.data.data
          }
        })
      },
      freshNew(item) {
        this.getNewList(item + 1)
      },
      linkMore(data) {
        if (data === 'new') {
          this.$router.push('/new')
        } else if (data === 'hot') {
          this.$router.push('/billboard')
        } else if (data === 'tag') {
          this.$router.push('/tag-search')
        }
      },
      gotoBookDetail(bookId) {
        this.$router.push({
          path: '/book-detail',
          query: {
            bookId: bookId
          }
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
  .el-card {
    width: 50%;
    border: 0;
  }
  .el-tag {
    margin: 5px 5px 5px 0;
    color: #37a;
  }
  .each-tag {
    padding-top: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .cover {
    width: 90px;
    height: 130px;
  }

  .hot-list {
    display: flex;
    flex-wrap: wrap;
    .summary {
      font-size: 14px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .container {
    padding: 15px 10%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 65%;
    }
    .right {
      width: 30%;
    }
  }

  .new-container {
    display: flex;
    flex-wrap: wrap;
    .each-new {
      width: 20%;
      margin-bottom: 15px;
      img {
        width: 120px;
        height: 160px;
        &:hover {
          cursor: pointer;
        }
      }
      p {
        width: 120px;
        font-size: 14px;
        line-height: 1.5;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.name {
          color: #37a;
          &:hover {
            cursor: pointer;
            color: lightblue;
          }
        }
      }
    }
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 5px;
    .link-more {
      margin-left: 5px;
      font-size: 14px;
      font-weight: 400;
      color: #37a;
      &:hover {
        cursor: pointer;
        color: lightskyblue;
      }
    }
  }

</style>
