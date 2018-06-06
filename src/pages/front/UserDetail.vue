<template>
  <div class="main">
    <div class="left">
      <div class="title">
        <img v-if="userMsg.picture" class="little-avatar" :src="`http://127.0.01:3000/uploads/${userMsg.picture}`" />
        <div v-else class="little-avatar fz14">{{(userMsg.nickName && userMsg.nickName.length > 3) ? userMsg.nickName.slice(-3) : userMsg.nickName}}</div>
        <div style="margin-left: 10px;">
          <p>
            <span style="color: #37a;">{{userMsg.nickName}}</span>的个人主页</p>
          <el-radio-group v-model="radio">
            <el-radio label="first">主页</el-radio>
            <el-radio label="review">评论</el-radio>
            <el-radio label="want">想读</el-radio>
            <el-radio label="being">在读</el-radio>
            <el-radio label="read">已读</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="radio === 'first'" class="first">
        <div class="interest">
          <div class="sub-title">
            在读的书
            <span class="more" @click="radio = 'being'">全部 ({{beingCount}})...</span>
          </div>
          <div class="list">
            <div class="each-book" v-for="item in beingList" :key="item.id">
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.book.bookName" v-if="item.book.bookPic" :src="`http://127.0.0.1:3000/uploads/${item.book.bookPic}`"
              />
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.book.bookName" v-else src="../../assets/images/book-default-lpic.gif"
              />
              <p @click="gotoBookDetail(item.bookId)" class="name" :title="item.book.bookName">{{item.book.bookName}}</p>
              <p :title="item.book.authorList">{{item.book.authorList ? item.book.authorList : '佚名'}}</p>
            </div>
          </div>
        </div>
        <div class="interest">
          <div class="sub-title">
            读过的书
            <span class="more" @click="radio = 'read'">全部 ({{readCount}})...</span>
          </div>
          <div class="list">
            <div class="each-book" v-for="item in readList" :key="item.id">
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.book.bookName" v-if="item.book.bookPic" :src="`http://127.0.0.1:3000/uploads/${item.book.bookPic}`"
              />
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.book.bookName" v-else src="../../assets/images/book-default-lpic.gif"
              />
              <p @click="gotoBookDetail(item.bookId)" class="name" :title="item.book.bookName">{{item.book.bookName}}</p>
              <p :title="item.book.authorList">{{item.book.authorList ? item.book.authorList : '佚名'}}</p>
            </div>
          </div>
        </div>
        <div class="interest">
          <div class="sub-title">
            想读的书
            <span class="more" @click="radio = 'want'">全部 ({{wantCount}})...</span>
          </div>
          <div class="list">
            <div class="each-book" v-for="item in wantList" :key="item.id">
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.book.bookName" v-if="item.book.bookPic" :src="`http://127.0.0.1:3000/uploads/${item.book.bookPic}`"
              />
              <img @click="gotoBookDetail(item.bookId)" class="cover" :title="item.book.bookName" v-else src="../../assets/images/book-default-lpic.gif"
              />
              <p @click="gotoBookDetail(item.bookId)" class="name" :title="item.book.bookName">{{item.book.bookName}}</p>
              <p :title="item.book.authorList">{{item.book.authorList ? item.book.authorList : '佚名'}}</p>
            </div>
          </div>
        </div>
        <div class="review">
          <div class="sub-title">
            {{userMsg.nickName}}的评论
            <span class="more" @click="radio = 'review'">全部 ({{reviewTotal}})...</span>
          </div>
          <div class="review-outer">
            <div class="each-review" v-for="item in reviewList" :key="item.id">
              <p style="margin-bottom: 5px;" class="fz14">
                {{item.topicId === 1 ? '短评' : '书评:'}}
                <router-link :to="`/review-detail?commentId=${item.id}`">{{item.title}}</router-link>
              </p>
              <div class="review-inner">
                <router-link :to="`/user-detail?userId=${item.fromUid}`">{{item.userName}}</router-link>
                <span>评论书籍：</span>
                <router-link :to="`/book-detail?bookId=${item.bookId}`">{{item.bookName}}</router-link>
                <el-rate v-if="item.interest" disabled v-model="item.interest.score"></el-rate>
                <span v-else>还未进行评分</span>
                <span>{{dayjs(item.publishTime, 'YYYY-MM-DD HH:mm:ss')}}</span>
              </div>
              <p class="content" :title="item.content" style="font-size: 14px; line-height: 1.5; margin-top: 5px;">{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-loading="loading" v-else-if="radio === 'review'" class="comment">
        <p>评论......</p>
        <div class="each-review" v-for="item in reviewList" :key="item.id">
          <p style="margin-bottom: 5px;" class="fz14">
            {{item.topicId === 1 ? '短评' : '书评:'}}
            <router-link :to="`/review-detail?commentId=${item.id}`">{{item.title}}</router-link>
          </p>
          <div class="review-inner">
            <router-link :to="`/user-detail?userId=${item.fromUid}`">{{item.userName}}</router-link>
            <span>评论书籍：</span>
            <router-link :to="`/book-detail?bookId=${item.bookId}`">{{item.bookName}}</router-link>
            <el-rate v-if="item.interest" disabled v-model="item.interest.score"></el-rate>
            <span v-else>还未进行评分</span>
            <span>{{dayjs(item.publishTime, 'YYYY-MM-DD HH:mm:ss')}}</span>
            <el-button type="text" size="mini" v-if="isMe" @click="delReview(item.id)">删除</el-button>
          </div>
          <p class="content" style="font-size: 14px; line-height: 1.5; margin-top: 5px;">{{item.content}}</p>
        </div>
        <p style="margin-top: 20px;">回复......</p>
        <div class="each-review" v-for="item in replyList" :key="item.id">
          <div class="review-inner">
            <router-link :to="`/user-detail?userId=${item.fromUid}`">{{item.fromUser}}</router-link>
            <span>回复：</span>
            <router-link :to="`/user-detail?userId=${item.toUid}`">{{item.toUser}}</router-link>  
            <span>{{dayjs(item.publishTime, 'YYYY-MM-DD HH:mm:ss')}}</span>
            <el-button type="text" size="mini" v-if="isMe" @click="delReply(item.id)">删除</el-button>            
          </div>
          <p style="font-size: 14px; line-height: 1.5; margin-top: 5px;">{{item.content}}</p>                  
        </div>
      </div>
      <div v-else-if="radio === 'want'" class="want">
        <p v-if="wantCount === 0">该用户暂无标记为想读的图书</p>        
        <book-item v-for="item in wantList" :key="item.bookId" :book-msg="item.book" :show-rate="false">
          <img class="little-cover" slot="cover" v-if="item.book.bookPic" :title="item.book.bookName" :src="`http://127.0.0.1:3000/uploads/${item.book.bookPic}`"
          />
          <img class="little-cover" slot="cover" v-else :title="item.book.bookName" src="../../assets/images/book-default-lpic.gif"
          />
          <div slot="other">
            <p class="fz12" style="line-height: 12px;">{{dayjs(item.time)}}想读</p>
            <span class="fz12">该用户还未进行评分</span>
          </div>
        </book-item>
        <el-pagination v-show="wantCount !== 0" layout="prev, pager, next" :total="wantCount" background @current-change="handleCurrentChange"
          class="pagination">
        </el-pagination>
      </div>
      <div v-else-if="radio === 'being'" class="being">
        <p v-if="beingCount === 0">该用户暂无标记为在读的图书</p>        
        <book-item v-for="item in beingList" :key="item.bookId" :book-msg="item.book" :show-rate="false">
          <img class="little-cover" slot="cover" v-if="item.book.bookPic" :title="item.book.bookName" :src="`http://127.0.0.1:3000/uploads/${item.book.bookPic}`"
          />
          <img class="little-cover" slot="cover" v-else :title="item.book.bookName" src="../../assets/images/book-default-lpic.gif"
          />
          <div slot="other">
            <p class="fz12" style="line-height: 12px;">{{dayjs(item.time)}}在读</p>
            <el-rate v-if="item.score !== 0" text-color="#e09015" v-model="item.score" disabled>
            </el-rate>
            <span class="fz12" v-else>该用户还未进行评分</span>
          </div>
        </book-item>
        <el-pagination v-show="beingCount !== 0" layout="prev, pager, next" :total="beingCount" background @current-change="handleCurrentChange"
          class="pagination">
        </el-pagination>
      </div>
      <div v-else-if="radio === 'read'" class="read">
        <p v-if="readCount === 0">该用户暂无标记为已读的图书</p>
        <book-item v-for="item in readList" :key="item.bookId" :book-msg="item.book" :show-rate="false">
          <img class="little-cover" slot="cover" v-if="item.book.bookPic" :title="item.book.bookName" :src="`http://127.0.0.1:3000/uploads/${item.book.bookPic}`"
          />
          <img class="little-cover" slot="cover" v-else :title="item.book.bookName" src="../../assets/images/book-default-lpic.gif"
          />
          <div slot="other">
            <p class="fz12" style="line-height: 12px;">{{dayjs(item.time)}}读完</p>
            <el-rate v-if="item.score !== 0" text-color="#e09015" v-model="item.score" disabled>
            </el-rate>
            <span class="fz12" v-else>该用户还未进行评分</span>
          </div>
        </book-item>
        <el-pagination v-show="readCount !== 0" layout="prev, pager, next" :total="readCount" background @current-change="handleCurrentChange"
          class="pagination">
        </el-pagination>
      </div>
    </div>
    <div class="right">
      <el-row :gutter="10">
        <el-col :span="12">
          <div v-if="!userMsg.picture" class="no-avatar">暂无头像</div>
          <img v-else class="avatar" :src="`http://127.0.0.1:3000/uploads/${userMsg.picture}`">
        </el-col>
        <el-col :span="12" class="fz14 intro">
          <p>昵称：{{userMsg.nickName}}</p>
          <p>性别：{{userMsg.userGender === 'male' ? '男' : userMsg.userGender === 'female' ? '女' : '保密'}}</p>
          <p>生日：{{userMsg.birth ? dayjs(new Date(userMsg.birth), 'YYYY年MM月DD日') : '无'}}</p>
          <p>地址：{{userMsg.address ? userMsg.address : '无'}}</p>
          <p>注册时间：{{dayjs(userMsg.registerDate, 'YYYY-MM-DD')}}</p>
          <el-button v-if="isMe" @click="modUser()" type="text" size="mini">修改个人资料>></el-button>
          <br/>
          <el-button v-if="isMe" @click="modPassword()" type="text" size="mini">修改密码>></el-button>
        </el-col>
      </el-row>
      <el-row>
        <p class="fz14">个人简介：</p>
        <p class="presentation fz14" v-for="(item, index) in formatPresentation(userMsg.presentation)" v-html="item" :key="index"></p>
      </el-row>
    </div>
    <el-dialog title="修改个人资料" @close="showModUser === false; userMsg = modUserMsg" :visible.sync="showModUser">
      <el-form :model="userMsg" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="昵称" prop="nickName" required>
              <el-input type="text" v-model="userMsg.nickName" placeholder="nickName">
              </el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="trueName">
              <el-input type="text" v-model="userMsg.trueName" placeholder="trueName">
              </el-input>
            </el-form-item>

            <el-form-item label="性别" prop="userGender" style="width: 300px">
              <el-select v-model="userMsg.userGender" placeholder="用户性别">
                <el-option label="保密" value="secret"></el-option>
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日" prop="userGender" style="width: 300px">
              <el-date-picker v-model="userMsg.birth" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p style="margin-bottom: 15px; text-align: left">用户头像：</p>
            <el-upload class="avatar-uploader" :action="`/api/upload?mark=user${userMsg.userId}`" :headers="headers" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-form-item label="地址" prop="address">
          <el-input type="text" v-model="userMsg.address">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="userMsg.email" placeholder="邮箱号码">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="userMsg.phone" placeholder="手机号码">
          </el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="presentation">
          <el-input type="textarea" v-model="userMsg.presentation" placeholder="个人资料介绍，段落前以#i#区分">
          </el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" :loading="loading" @click="submitUser">确认修改</el-button>
          <el-button type="text" @click="resetUser">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="showModPassword">
      <el-form :model="passMsg" status-icon ref="passForm" :rules="rules" label-width="80px">
        <p style="margin-bottom: 15px;">您正在进行
          <span style="color: red;">修改密码</span>的操作，修改后将会
          <span style="color: red;">退出登录</span>，然后请使用
          <span style="color: red;">新密码重新登录</span>。</p>
        <el-form-item label="用户名">
          <el-input disabled v-model="userMsg.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="credential" required>
          <el-input type="password" v-model="passMsg.credential" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input type="password" v-model="passMsg.checkPass" placeholder="再次输入密码确认"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" :loading="loading" @click="submitPass">确认修改</el-button>
          <el-button type="text" @click="resetPass">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem.vue'
  import localStore from '../../utils/localStorage.js'
  export default {
    name: 'user-detail',
    components: {
      BookItem
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
          if (this.passMsg.checkPass !== '') {
            this.$refs.passForm.validateField('checkPass')
          }
          if (reg.test(this.passMsg.credential) === false) {
            callback(new Error('8-16字母和数字组成，不能是纯数字或纯英文'))
          }
        }
        callback()
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.passMsg.credential) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        userId: +this.$route.query.userId,
        userMsg: {},
        modUserMsg: {},
        passMsg: {
          credential: '',
          checkPass: ''
        },
        wantCount: 0,
        beingCount: 0,
        readCount: 0,
        wantList: [],
        beingList: [],
        readList: [],
        radio: 'first',
        reviewList: [],
        reviewTotal: 0,
        replyList: [],
        replyTotal: 0,
        pageId: 1,
        showModUser: false,
        showModPassword: false,
        showAvatar: true,
        headers: {
          Authorization: `bearer ${localStore.get('jwt_token').token}`
        },
        rules: {
          credential: [{
            validator: validatePass
          }],
          checkPass: [{
            validator: validatePass2
          }]
        },
        loading: false,
      }
    },
    computed: {
      isMe() {
        return this.userId === +this.$Cookie.get('userId')
      },
      imageUrl() {
        if (this.userMsg.picture) {
          return `http://127.0.0.1:3000/uploads/${this.userMsg.picture}`
        } else {
          return ''
        }
      },
    },
    watch: {
      '$route': 'freshPage',
      radio() {
        this.pageId = 1
        this.getInterest()
      }
    },
    created() {
      if (!this.userId) {
        this.$router.push('/')
      } else {
        this.getUserMsg()
        this.getInterest()
        this.getReview()
      }
    },
    methods: {
      delReview(id) {
        this.loading = true
        this.$axios.delete(`/api/comment/${id}`).then(res => {
          if (res.data.code === 200) {
            this.getReview()
            this.$message.success('删除评论成功')
          } else {
            this.$message.error('删除评论失败')            
          }

          this.loading = false
        })
      },
      delReply(id) {
        this.loading = true
        this.$axios.delete(`/api/reply/${id}`).then(res => {
          if (res.data.code === 200) {
            this.getReview()
            this.$message.success('删除回复成功')
          } else {
            this.$message.error('删除回复失败')
          }

          this.loading = false
        })
      },
      // 头像上传
      handleAvatarSuccess(res, file) {
        this.showAvatar = true
        this.userMsg.picture = res.filename
      },
      beforeAvatarUpload(file) {
        const IMG_LIST = ['jpg', 'png', 'image', 'gif', 'jpeg']
        let isIMG = IMG_LIST.some(img => {
          return file.type.toLowerCase().indexOf(img) >= 0
        })
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isIMG) {
          this.$message.error('a')
        }
        if (!isLt2M) {
          this.$message.error('b')
        }
        return isIMG && isLt2M
      },
      submitUser() {
        this.loading = true
        this.$axios.put(`/api/user`, this.userMsg).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          this.loading = false
          if (code === 200) {
            this.showModUser = false
            this.modUserMsg = {
              ...this.userMsg
            }
            this.$Cookie.set('userName', this.userMsg.nickName)
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      resetUser() {
        this.userMsg = {
          ...this.modUserMsg
        }
      },
      submitPass() {
        this.$refs.passForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$axios.post('/api/resetPassword', {
              userId: +this.userId,
              credential: this.$md5(this.passMsg.credential)
            }).then(res => {
              this.loading = false
              const {
                code,
                msg
              } = { ...res.data
              }

              if (code === 200) {
                this.$message.success(msg)

                this.$Cookie.remove('userId')
                this.$Cookie.remove('userName')
                this.$Cookie.remove('expires')
                this.$Cookie.remove('userRole')
                localStore.remove('jwt_token')
                this.$router.push('/')
              } else {
                this.$message.error('重置密码失败')
              }
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
            })
          }
        })

      },
      resetPass() {
        this.passMsg = {
          credential: '',
          checkPass: ''
        }
        this.$refs.passForm.resetFields()
      },
      handleCurrentChange(val) {
        this.pageId = val
        this.getInterest()
      },
      gotoBookDetail(bookId) {
        this.$router.push({
          path: '/book-detail',
          query: {
            bookId: +bookId
          }
        })
      },
      formatPresentation(val) {
        if (val) {
          const introList = val.split('#i#')
          return introList
        } else {
          return ''
        }
      },
      dayjs(val, format = 'YYYY-MM-DD') {
        return this.$dayjs(val).format(format)
      },
      freshPage() {
        if (this.$route.query.userId) {
          this.$router.go(0)
        } else {
          this.$router.push('/')
        }
      },
      modUser() {
        this.showModUser = true
        this.modUserMsg = {
          ...this.userMsg
        }
      },
      modPassword() {
        this.showModPassword = true
      },
      // 获取用户信息（区分是否本人）
      getUserMsg() {
        if (this.userId !== +this.$Cookie.get('userId')) {
          this.$axios.get(`/api/user/other/${this.userId}`).then(res => {
            if (res.data.code === 200) {
              if (!res.data.data) {
                this.$router.push({
                  path: '/404',
                  query: {
                    url: window.location.href
                  }
                })
              }
              this.userMsg = res.data.data
            }
          })
        } else {
          this.$axios.get(`/api/user/${this.userId}`).then(res => {
            if (res.data.code === 200) {
              this.userMsg = res.data.data
            }
          })
        }
      },
      // 获取用户的Interest
      getInterest() {
        this.$axios.get(`/api/book/user/${this.userId}/collection`, {
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
            this.wantCount = res.data.want.count
            this.wantList = res.data.want.rows

            this.beingCount = res.data.being.count
            this.beingList = res.data.being.rows

            this.readCount = res.data.read.count
            this.readList = res.data.read.rows

          }
        })
      },
      // 获取用户的评论
      getReview() {
        this.$axios.get(`/api/user/${this.userId}/comment`, {
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
            this.reviewList = res.data.data.cData
            this.replyList = res.data.data.rData
            this.replyTotal = res.data.rTotal
            this.reviewTotal = res.data.cTotal
          }
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
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
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
    width: 152px;
    height: 152px;
    position: relative;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 5px;
      display: block;
    }
  }

  .pagination {
    margin-left: 20%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .little-cover {
    width: 60px;
    height: 80px;
    &:hover {
      cursor: pointer;
    }
  }

  a {
    color: #37a;
    &:hover {
      color: lightblue;
    }
  }

  .el-row+.el-row {
    margin-top: 15px;
  }

  .el-radio+.el-radio {
    margin-left: 15px;
  }

  .little-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: lightblue;
    text-align: center;
    line-height: 50px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    .each-book {
      width: 20%;
      text-align: center;
      padding-bottom: 10px;
      .cover {
        width: 100%;
        max-width: 110px;
        height: 150px;
        &:hover {
          cursor: pointer;
        }
      }
      p {
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

  .each-review {
    padding: 15px 5px;
    border-bottom: 1px dashed #ccc;
    .review-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .main {
    padding: 15px 10%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 65%;
      .title {
        font-size: 24px;
        font-weight: 500;
        padding-bottom: 15px;
        display: flex;
      }
      .sub-title {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 10px;
        .more {
          font-size: 12px;
          color: #37a;
          &:hover {
            cursor: pointer;
            color: lightblue;
          }
        }
      }
      .review {
        margin-top: 10px;
      }
      .interest+.interest {
        margin-top: 10px;
      }
    }
    .right {
      width: 30%;
      .no-avatar {
        width: 160px;
        height: 160px;
        text-align: center;
        line-height: 150px;
        border-radius: 5px;
        border: 1px solid lightblue;
      }
      .avatar {
        width: 160px;
        height: 160px;
      }
      .intro {
        line-height: 1.5;
      }
      .presentation {
        text-indent: 2em;
        line-height: 1.5;
      }
    }
  }

</style>
