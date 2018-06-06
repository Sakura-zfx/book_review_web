<template>
  <div class="main">
    <div class="title">{{bookMsg.bookName}}</div>
    <div class="book-basic">
      <div class="cover">
        <img class="cover" :title="bookMsg.bookName" v-if="bookMsg.bookPic" :src="`http://127.0.0.1:3000/uploads/${bookMsg.bookPic}`"
        />
        <img class="cover" :title="bookMsg.bookName" v-else src="../../assets/images/book-default-lpic.gif" />
      </div>
      <div class="basic-intro">
        <P v-if="bookMsg.originName">原作名：{{bookMsg.originName}}</P>
        <P v-if="bookMsg.subName">副标题：{{bookMsg.subName}}</P>
        <P v-if="author(bookMsg.authorList, 1)">作者：
          <span class="link">{{author(bookMsg.authorList, 1)}}</span>
        </P>
        <p v-if="author(bookMsg.authorList, 2)">译者：
          <span class="link">{{author(bookMsg.authorList, 2)}}</span>
        </p>
        <P v-if="bookMsg.publishHouse">出版社：{{bookMsg.publishHouse}}</P>
        <P v-if="bookMsg.publishDate">出版时间：{{bookMsg.publishDate}}</P>
        <P v-if="bookMsg.pageNumber">页数：{{bookMsg.pageNumber}}</P>
        <P v-if="bookMsg.price">价格：{{bookMsg.price}}</P>
        <P v-if="bookMsg.isbn10">ISBN10：{{bookMsg.isbn10}}</P>
        <P v-if="bookMsg.isbn13">ISBN13：{{bookMsg.isbn13}}</P>
        <P v-if="bookMsg.binding">装订：{{bookMsg.binding}}</P>
      </div>
      <div class="scoreinfo">
        <p class="fz12">
          评分信息
          <span style="color: #37a; margin-left: 5px;">{{bookMsg.reviewNumbers}}人评分</span>
        </p>
        <P class="rateinfo">
          <span class="score">{{bookMsg.avg}}</span>
          <el-rate v-model="avg" disabled></el-rate>
        </P>
        <P style="display: flex; align-items: center;">
          <span style="font-size: 14px; margin-right: 10px;">5分</span>
          <el-progress :percentage="eachScore(5)"></el-progress>
        </P>
        <P style="display: flex; align-items: center;">
          <span style="font-size: 14px; margin-right: 10px;">4分</span>
          <el-progress :percentage="eachScore(4)"></el-progress>
        </P>
        <P style="display: flex; align-items: center;">
          <span style="font-size: 14px; margin-right: 10px;">3分</span>
          <el-progress :percentage="eachScore(3)"></el-progress>
        </P>
        <P style="display: flex; align-items: center;">
          <span style="font-size: 14px; margin-right: 10px;">2分</span>
          <el-progress :percentage="eachScore(2)"></el-progress>
        </P>
        <P style="display: flex; align-items: center;">
          <span style="font-size: 14px; margin-right: 10px;">1分</span>
          <el-progress :percentage="eachScore(1)"></el-progress>
        </P>
      </div>
      <div class="score-msg"></div>
    </div>
    <div class="book-collection">
      <div style="display: flex; align-items: center; margin: 15px 0;">
        <el-button @click="showPostSReview(item.name, 0)" :disabled="isCanClick(item.name)" size="mini" v-for="item in collList"
          :key="item.name">{{item.text}}</el-button>
        <span style="font-size: 14px; margin-left: 10px;">评分：</span>
        <el-rate @change="showPostSReview(interest.score, 1)" :disabled="interest.status === 'want'" v-model="interest.score" show-text></el-rate>
      </div>
      <div>
        <el-button @click="confirmLogin(1)" size="small" type="text">+短评</el-button>
        <el-button @click="confirmLogin(2)" size="small" type="text">+书评</el-button>
      </div>
    </div>
    <div class="book-intro">
      <h2 class="sub-title">内容简介</h2>
      <p class="fz14 intro" v-for="(item, index) in formatSummary(bookMsg.summary)" :key="index" v-html="item"></p>
    </div>
    <div class="book-tags">
      <h2 class="sub-title">标签</h2>
      <el-tag type="info" v-for="tag in tagList" :key="tag.id">{{tag.tagName}}</el-tag>
      <!-- <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
    </div>
    <div class="book-sreview">
      <h2 class="sub-title">短评
        <span>(共{{shortCount}}条短评)</span>        
      </h2>
      <div class="each-s" v-for="item in sReviewList" :key="item.id">
        <div style="display: flex; font-size: 14px; align-items: center;">
          <router-link :to="`/user-detail?userId=${item.fromUid}`">{{item.userName}}</router-link>
          <el-rate disabled v-model="item.interest.score"></el-rate>
          <span>{{dayjs(item.publishTime)}}</span>
          <div style="margin-left: 20px;">
            <el-button v-if="isMe(item.fromUid)" @click="delComment(item.id, 1)" type="text" size="mini">删除</el-button>
          </div>
        </div>
        <p class="content" :title="item.content">{{item.content}}</p>
      </div>
      <el-button v-if="shortCount > (10 * shortPage)" @click="watchMoreShort()" type="text" size="mini">查看更多......</el-button>      
    </div>
    <div class="book-breview">
      <h2 class="sub-title">
        书评
        <span>(共{{bCount}}条书评)</span>
      </h2>
      <div class="each-s" v-for="item in bReviewList" :key="item.id">
        <div style="display: flex; font-size: 14px; align-items: center;">
          <router-link :to="`/user-detail?userId=${item.fromUid}`">{{item.userName}}</router-link>
          <el-rate disabled v-model="item.interest.score"></el-rate>
          <span>{{dayjs(item.publishTime)}}</span>  
         <div style="margin-left: 20px;">
            <el-button @click="gotoReview(item.id)" type="text" size="mini">回应({{item.replyCount}})</el-button>        
            <el-button v-if="isMe(item.fromUid)" @click="delComment(item.id, 2)" type="text" size="mini">删除</el-button>
          </div>        
        </div>
        <p style="font-size: 14px; line-height: 1.5; margin-top: 5px;">书评题目：<span style="color: #37a;">{{item.title}}</span></p>
        <p class="content" :title="item.content">书评内容：<span style="color: #37a;">{{item.content}}</span></p>
      </div>
      <el-button v-if="bCount > (10 * bPage)" @click="watchMoreB()" type="text" size="mini">查看更多......</el-button>
    </div>
    <el-dialog title="发表短评" :visible.sync="isShowshortForm" @close="isShowshortForm = false; interest.score = score; interest.status = status; shortReview = '';"
      width="30%">
      <el-form ref="sform" :model="interest">
        <el-form-item>
          <el-button @click="changeInterest(item.name)" :disabled="isCanClick(item.name)" size="mini" v-for="item in collList" :key="item.name">{{item.text}}</el-button>
        </el-form-item>
        <el-rate :disabled="interest.status === 'want'" v-model="interest.score" show-text></el-rate>
        <el-form-item label="输入短评">
          <el-input v-model="shortReview" type="textarea" :rows="4" placeholder="短评内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isShowshortForm = false; interest.score = score; interest.status = status; shortReview = '';">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="postShortReview()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="写书评" :visible.sync="isShowbookForm" @close="isShowbookForm = false; interest.score = score; interest.status = status; bookReview = '';"
      width="30%">
      <el-form ref="sform" :model="interest">
        <el-form-item>
          <el-button @click="changeInterest(item.name)" :disabled="isCanClick(item.name)" size="mini" v-for="item in collList" :key="item.name">{{item.text}}</el-button>
        </el-form-item>
        <el-rate :disabled="interest.status === 'want'" v-model="interest.score" show-text></el-rate>
        <el-form-item label="输入短评">
          <el-input style="margin-bottom: 10px;" v-model="reviewTitle" placeholder="书评标题"></el-input>
          <el-input v-model="bookReview" type="textarea" :rows="5" placeholder="书评内容，段落前以#i#分割"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isShowbookForm = false; interest.score = score; interest.status = status; bookReview = '';">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="postBookReview()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'book-detail',
    components: {},
    data() {
      return {
        bookId: +this.$route.query.bookId,
        userId: +this.$Cookie.get('userId'),
        bookMsg: {
          bookId: 0,
          bookName: '',
          isbn10: '',
          isbn13: '',
          authorList: [],
        },
        scoreList: [],
        avg: 0,
        loading: false,
        collList: [{
          name: 'want',
          text: '想读',
        }, {
          name: 'being',
          text: '在读',
        }, {
          name: 'read',
          text: '已读'
        }],
        interest: {},
        tagList: [],
        shortCount: 0,
        shortPage: 1,
        sReviewList: [],
        bCount: 0,
        bPage: 1,
        bReviewList: [],
        shortReview: '',
        reviewTitle: '',
        bookReview: '',
        score: 0,
        status: '',
        isShowshortForm: false,
        isShowbookForm: false,
        inputVisible: false,
        inputValue: '',
      }
    },
    computed: {
    },
    created() {
      this.getBookDetail()
      this.getInterest()
      this.getBookTags()
      this.getSReview()
      this.getBReview()
    },
    watch: {
      '$route': 'freshPage'
    },
    methods: {
      watchMoreShort() {
        this.shortPage++
        this.getSReview()
      },
      watchMoreB() {
        this.bPage++
        this.getBReview()
      },
      delComment(id, type) {
        this.$axios.delete(`/api/comment/${+id}`).then(res => {
          const {code, msg} = {...res.data}
          if (code === 200) {
            if (type === 1) {
              this.sReviewList = this.sReviewList.filter(item => {
                return item.id !== id
              })
            } else {
              this.bReviewList = this.bReviewList.filter(item => {
                return item.id !== id
              })
            }

            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      gotoReview(id) {
        this.$router.push({
          path: '/review-detail',
          query: {
            commentId: +id
          },
        })
      },
      isMe(val) {
        return this.userId === +val
      },
      formatSummary(val) {
        if (val) {
          const introList = val.split('#i#')
          return introList
        } else {
          return ''
        }
      },
      dayjs(data) {
        return this.$dayjs(data).format('YYYY-MM-DD HH:mm:ss')
      },
      eachScore(data) {
        let count = 0
        for (let i of this.scoreList) {
          if (i.score === data) {
            count = i.count
            break
          }
        }
        return count === 0 ? 0 : (count / this.bookMsg.reviewNumbers).toFixed(2) * 100
      },
      isCanClick(name) {
        if (name === this.interest.status) {
          return true
        }
      },
      freshPage() {
        this.$router.go(0)
      },
      getCover(url) {
        return `http://127.0.0.1:3000/uploads/${url}`
      },
      author(data, type) {
        let authorStr = ''
        let translatorStr = ''
        data.map(item => {
          const i = item.indexOf('(译)')
          if (i >= 0) {
            translatorStr += item.slice(i + 3)
          } else {
            authorStr += item
          }
        })
        return type === 1 ? authorStr : translatorStr
      },
      // 判断登录
      confirmLogin(type) {
        if (!this.userId) {
          this.$message('请登录后再进行评论')
          this.interest.score = 0
          return
        }
        if (type === 1) {
          this.isShowshortForm = true
        } else if (type === 2) {
          this.isShowbookForm = true
        }
      },
      showPostSReview(data, type) {
        if (!this.userId) {
          this.$message('请登录后再进行评论')
          this.interest.score = 0
          return
        }
        this.isShowshortForm = true
        if (type === 0) {
          this.interest.status = data
          if (data === 'want') {
            this.interest.score = 0
          }
        }
      },
      changeInterest(data) {
        this.interest.status = data
        if (data === 'want') {
          this.interest.score = 0
        }
      },
      postInterest() {
        if (this.interest.status !== this.status || this.interest.score !== this.score) {
          // 如果原来存在，则更新
          if (this.interest.id) {
            this.$axios.put('/api/book/collection', {
              id: this.interest.id,
              status: this.interest.status,
              score: this.interest.score
            }).then(res => {
              if (res.data.code === 200) {
                this.isShowshortForm = false
                this.status = this.interest.status
                this.score = this.interest.score
                this.getBookDetail()
              }
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
            })
          } else {
            this.$axios.post('/api/book/collection', {
              ...this.interest
            }).then(res => {
              if (res.data.code === 200) {
                this.isShowshortForm = false
                this.status = this.interest.status
                this.score = this.interest.score
              }
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
            })
          }
        }
      },
      postShortReview() {
        // 更新短评
        if (this.shortReview) {
          this.loading = true          
          this.$axios.post('/api/comment', {
            topicId: 1,
            topicType: 'book',
            content: this.shortReview,
            bookId: this.bookId,
            fromUid: this.userId,
          }).then(res => {
            if (res.data.code === 200) {
              this.isShowshortForm = false
              this.shortReview = ''
              this.shortPage = 1
              this.getSReview()
            }
            this.loading = false
          }).catch(err => {
            this.loading = false
            this.$message.error(err)
          })
        } else {
          this.loading = false
        }
        // 更新评分Interest
        this.postInterest()
      },
      postBookReview() {
        if (this.bookReview && this.reviewTitle) {
          this.loading = true          
          this.$axios.post('/api/comment', {
            topicId: 2,
            topicType: 'book',
            title: this.reviewTitle,
            content: this.bookReview,
            bookId: this.bookId,
            fromUid: this.userId,
          }).then(res => {
            if (res.data.code === 200) {
              this.isShowbookForm = false
              this.bookReview = ''
              this.bPage = 1
              this.getBReview()
            }
            this.loading = false
          })
        } else {
          this.loading = false
          this.$message('请输入标题和书评内容！')
        }

        this.postInterest()
      },
      showInput() {
        if (!this.userId) {
          this.$message('请登录再添加标签！')
          return
        }
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.$axios.post('/api/tag', {
            tagName: inputValue,
            cateId: 1,
          }).then(res => {
            if (res.data.code === 200) {
              this.getBookTags()
            }
          })
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 获取当前用户对该书的评分信息
      getInterest() {
        if (!this.userId) {
          return
        }
        this.$axios.get(`/api/book/${this.bookId}/user/${this.userId}/collection`).then(res => {
          if (res.data.code === 200) {
            if (res.data.data) {
              this.interest = res.data.data
              this.score = this.interest.score
              this.status = this.interest.status
            } else {
              this.interest = {
                bookId: this.bookId,
                userId: this.userId,
                status: '',
                score: 0,
              }
            }
          }
        })
      },
      getBookDetail() {
        this.$axios.get(`/api/book/${this.bookId}`).then(res => {
          if (res.data.code === 200) {
            this.bookMsg = res.data.data
            this.avg = Number(this.bookMsg.avg)
            this.scoreList = this.bookMsg.score
          }
        }).catch(err => {
          this.$router.push({
            path: '/404',
            query: {
              url: window.location.href
            }
          })
        })
      },
      // 获取当前书籍的标签
      getBookTags() {
        this.$axios.get(`/api/book/${this.bookId}/tag`).then(res => {
          if (res.data.code === 200) {
            this.tagList = res.data.data
          }
        })
      },
      // 获取书籍下短评
      getSReview() {
        this.$axios.get(`/api/book/${this.bookId}/comment`, {
          params: {
            topicId: 1,
            pageId: this.shortPage,
            order: 'DESC',
          }
        }).then(res => {
          if (res.data.code === 200) {
            if (this.sReviewList.length > 0 && this.shortPage !== 1) {
              this.sReviewList = this.sReviewList.concat(res.data.data)
            } else {
              this.sReviewList = res.data.data
            }
            this.shortCount = res.data.count
          }
        })
      },
      // 获取书籍下书评
      getBReview() {
        this.$axios.get(`/api/book/${this.bookId}/comment`, {
          params: {
            topicId: 2,
            pageId: this.bPage,
            order: 'DESC',
          }
        }).then(res => {
          if (res.data.code === 200) {
            if (this.bReviewList.length > 0 && this.bPage !== 1) {
              this.bReviewList = this.bReviewList.concat(res.data.data)
            } else {
              this.bReviewList = res.data.data
            }
            this.bCount = res.data.count
          }
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../assets/scss/common.scss';
  .content {
    font-size: 14px; 
    line-height: 1.5; 
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .each-s {
    width: 70%;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
  }
  .el-progress--line {
    width: 120px;
  }
  .el-tag {
    color: #37a;    
  }
  .el-rate {
    margin: 0 10px;
  }
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    vertical-align: bottom;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .main {
    padding: 15px 10%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 24px;
      font-weight: 500;
      padding-bottom: 15px;
    }
    .book-tags,
    .book-sreview,
    .book-breview {
      margin: 15px 0;
    }
    .book-intro {
      margin: 15px 0;
      width: 70%;
      .intro {
        line-height: 1.5;
        padding: 0 0 10px 0;
        text-indent: 2em;
      }
    }
    .sub-title {
      font-size: 16px;
      color: #37a;
      font-weight: normal;
      margin-bottom: 10px;
    }
    .cover {
      width: 150px;
      height: 200px;
    }
    .book-basic {
      display: flex;
      .basic-intro {
        max-width: 50%;
        margin-left: 10px;
        font-size: 14px;
        line-height: 1.5;
      }
      .scoreinfo {
        margin-left: 100px;
        .rateinfo {
          display: flex;
          align-items: center;
          margin: 10px 0;
          span {
            margin-right: 10px;
          }
        }
      }
    }
    .link {
      color: #37a;
      &:hover {
        cursor: pointer;
        color: lightblue;
      }
    }
  }

</style>
