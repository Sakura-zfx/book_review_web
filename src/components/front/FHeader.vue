<template>
  <div>
    <el-menu mode="horizontal" :default-active="activeIndex" class="el-menu" active-text-color="#3080fe" :router="true">
      <router-link class="logo" to="/">
        <h3 class="link">book</h3>
      </router-link>
      <el-menu-item index="/">
        <span slot="title">
          首页
        </span>
      </el-menu-item>
      <el-menu-item index="/billboard">
        <span slot="title">
          排行榜
        </span>
      </el-menu-item>
      <el-menu-item index="/new">
        <span slot="title">
          新书
        </span>
      </el-menu-item>
      <el-menu-item v-if="isLogin" index="/recommendation">
        <span slot="title">
          推荐
        </span>
      </el-menu-item>
      <div class="block"></div>
      <el-autocomplete 
        placeholder="书籍名/作者/ISBN" 
        size="small" 
        class="search" 
        prefix-icon="el-icon-search" 
        v-model="searchMsg"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @keyup.enter.native="toSearchPage"
        @select="handleSelect"
      >
      </el-autocomplete>
      <el-submenu v-if="isLogin" index="user">
        <template slot="title">
          <span style="color: #000000">{{userName}}</span>
        </template>
        <el-menu-item :index="`/user-detail?userId=${userId}`">个人主页</el-menu-item>
        <el-menu-item index="" @click.native="logout">退出</el-menu-item>
      </el-submenu>
      <div v-else class="login__button">
        <el-button type="text" size="mini" @click="showLogin">登录</el-button>
        <el-button type="text" size="mini" @click="showRegister">注册</el-button>
      </div>
    </el-menu>
    <el-dialog title="欢迎登录" :visible.sync="loginVisible" width="30%">
      <el-form :rules="loginRule" ref="loginForm" :model="loginMsg">
        <el-form-item prop="identity">
          <el-input clearable v-model="loginMsg.identity" placeholder="登录名">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="credential">
          <el-input clearable type="password" v-model="loginMsg.credential" @keyup.enter.native="postLogin" placeholder="密码">
            <i slot="prefix" class="iconfont icon-password"></i>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="authCode">
          <el-input clearable v-model="authCode" placeholder="请输入右图验证码" style="width: 50%; margin-right: 5px;">
            <i slot="prefix" class="el-icon-edit"></i>
          </el-input>
        </el-form-item> -->
        <el-button type="text" size="mini" @click="resetPassword" style="margin-right: 20px;">忘记密码？找回密码</el-button>
        <el-button type="text" size="mini" @click="showRegister">还没账号？立即注册>></el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postLogin" size="small" :loading="loading">登 录</el-button>
        <el-button @click="loginVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="用户注册" :visible.sync="registerVisible" width="30%">
      <el-form :rules="registerRule" ref="registerForm" :model="registerMsg">
        <el-form-item prop="identityType">
          <el-select v-model="registerMsg.identityType">
            <el-option label="用户名" value="username"></el-option>
            <el-option label="邮箱地址" value="email"></el-option>
            <el-option label="手机号码" value="phone"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="identity">
          <el-input clearable v-model="registerMsg.identity" placeholder="登录名">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="credential">
          <el-input clearable type="password" v-model="registerMsg.credential" placeholder="密码">
            <i slot="prefix" class="iconfont icon-password"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input clearable type="password" v-model="registerMsg.checkPass" @keyup.enter.native="postRegister" placeholder="确认密码">
            <i slot="prefix" class="iconfont icon-password"></i>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="authCode">
          <el-input clearable v-model="authCode" placeholder="请输入右图验证码" style="width: 50%; margin-right: 5px;">
            <i slot="prefix" class="el-icon-edit"></i>
          </el-input>
        </el-form-item> -->
        <el-button type="text" size="mini" @click="showLogin">已有账号？去登录>></el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postRegister" size="small" :loading="loading">注 册</el-button>
        <el-button @click="registerVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import localStore from '../../utils/localStorage'
  import {
    validateIdentity
  } from '../../utils/validate'
  export default {
    name: 'f-header',
    props: ['activeIndex'],
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('登录名不能为空'))
        } else {
          if (this.registerMsg.identityType === 'username') {} else if (this.registerMsg.identityType === 'email') {
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (!reg.test(this.registerMsg.identity)) {
              callback(new Error('请输入正确的邮箱地址'))
            }
          } else if (this.registerMsg.identityType === 'phone') {
            const reg = /^1[0-9]{10}$/
            if (!reg.test(this.registerMsg.identity)) {
              callback(new Error('请输入11位正确的手机号码'))
            }
          }
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
          if (this.registerMsg.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass')
          }
          if (reg.test(this.registerMsg.credential) === false) {
            callback(new Error('8-16字母和数字组成，不能是纯数字或纯英文'))
          }
        }
        callback()
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerMsg.credential) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      const validateAuthCode = (rule, value, callback) => {

      }
      return {
        userId: +this.$Cookie.get('userId'),
        searchMsg: '',
        searchList: [],
        authCode: '',
        isLogin: !!(+this.$Cookie.get('userRole') === 1 && this.$Cookie.get('userId') && this.$Cookie.get('userName')),
        loginVisible: false,
        registerVisible: false,
        loginMsg: {
          identity: '',
          credential: '',
          userRole: 1,
        },
        registerMsg: {
          identityType: 'username',
          identity: '',
          credential: '',
          checkPass: '',
          userRole: 1,
        },
        loginRule: {
          identity: [{
            required: true,
            message: '登录名不能为空'
          }],
          credential: [{
            required: true,
            min: 6,
            max: 18,
            message: '请输入6-18位密码'
          }],

        },
        registerRule: {
          identity: [{
            validator: validateName
          }],
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
      userName() {
        return +this.$Cookie.get('userRole') === 1 ? this.$Cookie.get('userName') : ''
      }
    },
    methods: {
      resetPassword() {
        this.$router.push({
          path: '/retrieve-password'
        })
      },
      logout() {
        this.$Cookie.remove('userId')
        this.$Cookie.remove('userName')
        this.$Cookie.remove('expires')
        this.$Cookie.remove('userRole')
        localStore.remove('jwt_token')
        this.isLogin = false
        this.$router.push('/')
      },
      resetMsg() {
        this.loginMsg = {
          identity: '',
          credential: '',
          userRole: 1,
        }
        this.registerMsg = {
          identityType: 'username',
          identity: '',
          credential: '',
          checkPass: '',
          userRole: 1,
        }
      },
      // login
      showLogin() {
        this.loginVisible = true
        setTimeout(() => {
          this.registerVisible = false
          this.$refs.loginForm.resetFields()
        }, 0)

      },
      postLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.login()
          } else {
            false
          }
        })
      },
      login() {
        this.loading = true
        const loginParams = {
          ...this.loginMsg,
          credential: this.$md5(this.loginMsg.credential)
        }
        this.$axios.post('/api/login', loginParams).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }

          if (code === 200) {
            // jwt保存
            localStore.set('jwt_token', {
              token: res.data.bean.token
            })
            const userMsg = JSON.parse(this.$base64.decode(res.data.bean.token.split('.')[1]))
            // 将返回的数据注入cookie
            // 过期时间
            const expires = new Date(this.$dayjs().add(userMsg.exp - userMsg.iat, 'seconds'))

            this.$Cookie.set('userId', userMsg.userId, {
              expires
            })
            this.$Cookie.set('userName', userMsg.userName, {
              expires
            })
            this.$Cookie.set('expires', expires, {
              expires
            })
            this.$Cookie.set('userRole', 1, {
              expires
            })
            
            this.$router.go(0)
          } else {
            this.$message.error(msg)
          }

          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      // register
      showRegister() {
        this.registerVisible = true
        setTimeout(() => {
          this.loginVisible = false
          this.$refs.registerForm.resetFields()
        })
      },
      postRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.register()
          } else {
            return false
          }
        })
      },
      register() {
        this.loading = true

        const registerParams = {
          identityType: this.registerMsg.identityType,
          identity: this.registerMsg.identity,
          credential: this.$md5(this.registerMsg.credential),
          userRole: 1,
        }

        this.$axios.post('/api/register', registerParams).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }

          if (code === 200) {
            this.$message.success(msg)
            this.showLogin()
            this.loginMsg.identity = this.registerMsg.identity
            this.loginMsg.credential = this.registerMsg.credential
            this.registerMsg = {
              identityType: 'username',
              identity: '',
              credential: '',
              checkPass: '',
              userRole: 1,
            }
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      // 搜索
      querySearch(queryString, cb) {
        if (queryString) {
          // 书籍查询
          this.$axios.get('/api/book/search', {
            params: {
              searchMsg: queryString
            }
          }).then(res => {
            const {code, msg} = {...res.data}

            if (code === 200) {
              this.searchList = res.data.data
              this.searchList.forEach(item => {
                item.value = `${item.bookName} / ${item.authorList[0] ? item.authorList[0] : '佚名'}`
              })
              cb(this.searchList)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          this.searchMsg = ''
        }
      },
      handleSelect(item) {
        this.searchMsg = ''
        this.$router.push({
          path: 'book-detail',
          query: {
            bookId: item.bookId
          }
        })
      },
      toSearchPage() {
        if (!this.searchMsg) {
          return
        }
        this.$router.push({
          path: '/search',
          query: {
            searchMsg: this.searchMsg
          }
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
  *:focus {
    outline: none;
  }

  .iconfont {
    font-size: 14px;
  }

  .el-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7%;
    .logo {
      width: 100px;
      flex-grow: 0;
    }
    .block {
      flex-grow: 1;
    }
    .search {
      width: 230px;
      margin-right: 60px;
    }
  }

</style>
