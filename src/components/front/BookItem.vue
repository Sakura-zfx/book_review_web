<template>
  <div class="book">
    <div @click="gotoBookDetail(bookMsg.bookId)">
      <slot name="cover"></slot>
    </div>
    <div class="intro">
      <div class="book-name" @click="gotoBookDetail(bookMsg.bookId)">{{bookMsg.bookName}}</div>
      <p class="author">{{author(bookMsg.authorList)}}</p>
      <p class="leave">{{leave(bookMsg)}}</p>
      <p style="display:flex;">
        <el-rate text-color="#e09015" v-model="avg" disabled>
        </el-rate>
        <span v-if="avg !== 0" style="font-size: 12px; line-height: 20px;">
          <span style="color: #e09015; margin: 0 5px;">{{avg}}</span>(共{{bookMsg.reviewNumbers}}人评分)
        </span>
        <span v-else style="font-size: 12px; color: #888; line-height: 20px;">(目前无人评价)</span>
      </p>
    </div>
    <slot name="priority"></slot>    
  </div>
</template>
<script>
  export default {
    name: 'book-item',
    props: ['bookMsg'],
    data() {
      return {
        avg: +this.bookMsg.avg
      }
    },
    methods: {
      getCover(url) {
        return `http://127.0.0.1:3000/uploads/${url}`
      },
      author(data) {
        let temp = ''
        if (data.length === 0) {
          return '暂无作者信息'
        } else {
          data.map((item, index) => {
            temp += `${item} | `
          })
          return temp
        }
      },
      leave(data) {
        let msg = ''
        const ph = data.publishHouse
        const pd = data.publishDate
        const price = data.price
        ph ? msg += `${ph} / ` : '';
        pd ? msg += `${pd} / ` : '';
        (price && +price !== 0) ? msg += price: msg += '暂无价格'
        return msg
      },
      gotoBookDetail(bookId) {
        this.$router.push({
          path: '/book-detail',
          query: {
            bookId: +bookId
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .book {
    display: flex;
    padding: 15px 0;
    .intro {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;
      .book-name {
        color: #37a;
        font-size: 14px;
        line-height: 1.5;
        &:hover {
          cursor: pointer;
          color: lightskyblue;
        }
      }
      .author {
        font-size: 12px;
        line-height: 1.5;
      }
      .leave {
        font-size: 12px;
      }
    }
  }

</style>
