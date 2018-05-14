<template>
  <el-main class="login-container">
    <el-form :model="LoginForm" ref="LoginForm" :rules="rule" label-width="0" class="login-form">
      <h3 class="title">用户登录系统</h3>

      <el-form-item prop="identity">
        <el-input type="text" v-model="LoginForm.identity" placeholder="username">
        </el-input>
      </el-form-item>

      <el-form-item prop="credential">
        <el-input type="password" v-model="LoginForm.credential" placeholder="password">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="submitBtn" round @click.native.prevent="submit" :loading="logining">
          登录
        </el-button>
        <hr>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
  import localStore from '../../../utils/localStorage'
  export default {
    name: 'login',
    data() {
      return {
        LoginForm: {
          identity: '',
          credential: '',
        },
        logining: false,
        rule: {
          identity: [{
            required: true,
            message: '用户名是必须的',
          }],
          credential: [{
            required: true,
            min: 8,
            message: '密码是必须的，长度不小于8位',
          }]
        }
      }
    },
    methods: {
      submit() {
        this.$refs.LoginForm.validate(valid => {
          if (valid) {
            this.logining = true
            // 登录作为参数的用户信息
            let LoginParams = {
              identity: this.LoginForm.identity,
              credential: this.$md5(this.LoginForm.credential),
              userRole: 2
            }
            // 调用axios登录接口
            this.$axios.post('/api/login', LoginParams).then(res => {
              this.logining = false
              const {
                code,
                msg
              } = { ...res.data
              }
              if (code !== 200) {
                this.$message({
                  type: 'error',
                  message: msg
                })
              } else {
                localStore.set('jwt_token', {
                  token: res.data.bean.token
                })
                this.$message({
                  type: 'success',
                  message: msg
                })
                const userMsg = JSON.parse(this.$base64.decode(res.data.bean.token.split('.')[1]))
                // 将返回的数据注入cookie
                this.$Cookie.set('userId', userMsg.userId)
                this.$Cookie.set('userName', userMsg.userName)
                this.$Cookie.set('expires', userMsg.exp)
                // 跳转到我的信息的页面
                this.$router.push('/admin')
              }
            })
          } else {
            console.log('submit err')
          }
        })
      },
      reset() {
        this.$refs.LoginForm.resetFields()
      },
      tofind() {
        this.$router.push('/findpassword')
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    background-image: url(../../../assets/images/loginBG2.jpg);
    background-size: cover;
    .login-form {
      margin: 80px auto;
      width: 320px;
      background: #fff;
      box-shadow: 0 0 35px #B4BCCC;
      padding: 30px 30px 0 30px;
      border-radius: 25px;
      .title {
        text-align: center;
        margin-bottom: 15px;
      }
    }
    .submitBtn {
      width: 100%;
      margin-bottom: 20px;
    }
    .to {
      color: #67C23A;
      cursor: pointer;
    }
  }

</style>
