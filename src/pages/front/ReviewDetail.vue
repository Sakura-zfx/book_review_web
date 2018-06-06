<template>
  <div class="main">
    <div class="left">
      <h1 class="title">{{commentMsg.title}}</h1>
      <p class="fz14 intro">
        <router-link :to="`/user-detail?userId=${commentMsg.fromUid}`">{{commentMsg.fromUser}}</router-link>
        <span class="tt">评论</span>
        <router-link :to="`/book-detail?bookId=${commentMsg.bookId}`">{{ commentMsg.book ? commentMsg.book.bookName : ''}}</router-link>
        <el-rate v-model="commentMsg.score" disabled></el-rate>
        <span class="tt">{{dayjs(commentMsg.publishTime)}}</span>
      </p>
      <p class="fz14 content" v-for="(item, index) in formatText(commentMsg.content)" :key="index" v-html="item"></p>
      <p class="fz12 author">© 本文版权归作者  {{commentMsg.fromUser}}  所有，任何形式转载请联系作者。</p>
      <div class="reply-container">
        <el-button @click="reply(commentMsg, 'comment')" type="text" size="normal">>我也来说一句</el-button>
        <div class="each-reply fz14" v-for="item in replies" :key="item.id">
          <img v-if="item.fromUser.picture" class="little-avatar" :src="`http://127.0.01:3000/uploads/${item.fromUser.picture}`" />
          <div v-else class="little-avatar fz14">{{(item.fromUser.nickName && item.fromUser.nickName.length > 3) ? item.fromUser.nickName.slice(-3) : item.fromUser.nickName}}</div>
          <div class="detail">
            <router-link :to="`/user-detail?userId=${item.fromUid}`">{{item.fromUser.nickName}}</router-link>
            <span v-if="item.toUid !== commentMsg.fromUid">回复
              <router-link :to="`/user-detail?userId=${item.toUid}`">{{item.toUser.nickName}}</router-link>
            </span>
            <span>{{dayjs(item.publishTime)}}</span>
            <el-button v-if="!isMe(item.fromUid)" @click="reply(item, 'comment')" type="text" size="mini">回复</el-button>
            <el-button @click="delReply(item.id)" v-if="isMe(item.fromUid)" type="text" size="mini">删除</el-button>            
            <p>{{item.content}}</p>            
          </div>
        </div>
        <!-- <p class="fz14 more">加载更多......</p> -->
      </div>
    </div>
    <div class="right">
      <h1 class="title">
        <router-link :to="`/book-detail?bookId=${commentMsg.bookId}`">{{ commentMsg.book ? commentMsg.book.bookName : ''}}</router-link>
      </h1>
      <div>
        <img class="cover" :title="commentMsg.book ? commentMsg.book.bookName : ''" v-if="commentMsg.book && commentMsg.book.bookPic" :src="`http://127.0.0.1:3000/uploads/${commentMsg.book.bookPic}`"
        />
        <img class="cover" :title="commentMsg.book ? commentMsg.book.bookName : ''" v-else src="../../assets/images/book-default-lpic.gif" />
      </div>
      <p>作者：{{ commentMsg.book ? commentMsg.book.authorList : ''}}</P>
      <p>出版社：{{ commentMsg.book ? commentMsg.book.publishHouse : ''}}</P>
      <p>价格：{{ commentMsg.book ? commentMsg.book.price : ''}}</P>
      <p>装订：{{ commentMsg.book ? commentMsg.book.binding : ''}}</P>
      <p>页数：{{ commentMsg.book ? commentMsg.book.pageNumber : ''}}</P>
      <p>出版时间：{{ commentMsg.book ? commentMsg.book.publishDate : ''}}</P>
    </div>
    <el-dialog :visible.sync="showForm" @close="showForm = false;"
      width="30%">
      <p slot="title">回复</p>
      <el-input v-model="replyMsg.content" type="textarea" :rows="4" placeholder="请输入回复内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showForm = false;">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'review-detail',
    data() {
      return {
        commentId: +this.$route.query.commentId,
        commentMsg: {},
        replies: [],
        fromUserName: '',
        pageId: 1,
        showForm: false,
        replyMsg: {
          commentId: +this.$route.query.commentId,
          replyId: 0,
          replyType: 'comment',
          content: '',
          fromUid: +this.$Cookie.get('userId'),
          toUid: 0,
        },
        replyType: '',
        loading: false,
      }
    },
    created() {
      this.getCDetail()
      this.getReplies()
    },
    methods: {
      isMe(val) {
        return val === +this.$Cookie.get('userId')
      },
      reply(item, type) {
        if (!this.$Cookie.get('userId')) {
          this.$message('请登录后再进行回复')
          return
        }
        this.showForm = true
        if (type === 'comment') {
          this.replyMsg.replyId = this.commentId
          this.replyMsg.replyType = 'comment'          
          this.replyMsg.toUid = item.fromUid
        } else {
          this.replyMsg.replyId = item.id
          this.replyMsg.replyType = 'reply'
          this.replyMsg.toUid = item.fromUid          
        }
      },
      submit() {
        this.loading = true
        this.$axios.post('/api/reply', this.replyMsg).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          if (code === 200) {
            this.showForm = false
            this.replyMsg = {
              commentId: +this.$route.query.commentId,
              replyId: 0,
              replyType: 'comment',
              content: '',
              fromUid: +this.$Cookie.get('userId'),
              toUid: 0,
            }
            this.getReplies()
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err)
        })
      },
      delReply(id) {
        this.$axios.delete(`/api/reply/${id}`).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          if (code === 200) {
            this.replies = this.replies.filter(item => {
              return item.id !== id
            })
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      formatText(val) {
        if (val) {
          const introList = val.split('#i#')
          return introList
        } else {
          return ''
        }
      },
      dayjs(val, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.$dayjs(val).format(format)
      },
      // 获取书评信息
      getCDetail() {
        this.$axios.get(`/api/comment/${this.commentId}`).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          if (code === 200) {
            this.commentMsg = res.data.data
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      // 获取该书评下的回复
      getReplies() {
        this.$axios.get(`/api/comment/${this.commentId}/reply`, {
          params: {
            pageId: this.pageId
          }
        }).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          if (code === 200) {
            this.replies = res.data.data
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
  .cover {
    width: 120px;
    height: 150px;
    margin-top: 15px;
  }
  a {
    color: #37a;
    &:hover {
      color: lightblue;
    }
  }
  .each-reply {
    margin: 10px 0 20px 0;
    display: flex;
    .little-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: lightblue;
      text-align: center;
      line-height: 50px;
    }
    .detail {
      margin-left: 20px;
      flex: 1;
      p {
        line-height: 1.5;
        margin-top: 10px;
      }
    }
  }
  .el-rate {
    margin-right: 20px;
  }
  .content {
    line-height: 1.8;
    text-indent: 2em;
  }
  .main {
    padding: 15px 10%;
    min-height: 500px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 24px;
      font-weight: 500;
      margin: 15px 0;
    }
    .left {
      width: 65%;
      .intro {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        * {
          padding: 0 5px;
        }
        a {
          color: #37a;
          &:hover {
            color: lightblue;
          }
        }
      }
      .author {
        margin: 15px 0;
        color: #cccccc;
      }
    }
    .right {
      width: 30%;
      p {
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
  .reply-container {
    border-top: 1px dashed #ccc;
    padding: 15px 10px;
    .more {
      margin-top: 15px;      
      color: #37a;
      &:hover {
        cursor: pointer;
        color: lightblue;
      }
    }
  }
</style>
