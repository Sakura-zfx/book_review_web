<template>
  <div class="main">
    <h1 class="title">密码找回</h1>
    <el-steps :active="step">
      <el-step title="步骤 1" description="输入找回账号信息"></el-step>
      <el-step title="步骤 2" description="身份验证"></el-step>
      <el-step title="步骤 3" description="重置密码"></el-step>      
    </el-steps>
    <div v-if="step === 1" class="step1">
      <el-form>
        <el-form-item label="账号信息" required>
          <el-input type="text" v-model="identity" placeholder="注册时的登录信息"></el-input>
        </el-form-item>
        <el-button :disabled="!canNext" :loading="verifyLoading" @click="verifyCre()">下一步</el-button>         
      </el-form>
    </div>
    <div v-if="step === 2" class="step2">
      <el-form>
        <el-form-item :label="`已向手机号 ${phone} 发送验证码`" required>
          <el-button type="text" size="mini">重新发送</el-button>
          <el-input type="text" v-model="authCode" placeholder="6位验证码"></el-input>
        </el-form-item>
        <el-button :disabled="authCode === ''" @click="verifyAuthcode()">下一步</el-button>         
      </el-form>
    </div>
    <div v-if="step === 3" class="step3">
      <el-form :model="passMsg" status-icon ref="modForm" :rules="rules" label-width="80px">
        <el-form-item label="密码" prop="credential" required>
          <el-input type="password" v-model="passMsg.credential" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input type="password" v-model="passMsg.checkPass" placeholder="再次输入密码确认"></el-input>
        </el-form-item>
        <el-button style="margin-left: 40%;" :loading="verifyLoading" @click="submit()">确认</el-button>         
      </el-form>
    </div> 
  </div>
</template>
<script>
  export default {
    name: 'retrieve-password',
    components: {
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
          if (this.passMsg.checkPass !== '') {
            this.$refs.modForm.validateField('checkPass')
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
        step: 1,
        identity: '',
        authCode: '',
        verifyLoading: false,
        phone: '',
        userId: 0,
        passMsg: {
          credential: '',
          checkPass: '',
        },
         rules: {
          credential: [{
            validator: validatePass
          }],
          checkPass: [{
            validator: validatePass2
          }]
        },
      }
    },
    computed: {
      canNext() {
        return this.identity !== ''
      }
    },
    created() {},
    methods: {
      verifyCre() {
        this.verifyLoading = true
        this.$axios.get('/api/user', {
          params: {
            identity: this.identity
          }
        }).then(res => {
          this.verifyLoading = false
          if (res.data.code === -1004) {
            this.phone = res.data.phone
            this.userId = res.data.userId
            this.step++
          } else {
            this.$message.error('该账号不存在！')
          }
        })
      },
      verifyAuthcode() {
        // q请求验证码
        if (this.authCode === '235810') {
          this.step++          
        } else {
          this.$message.error('验证码错误')
        }
      },
      submit() {
        this.verifyLoading = true
        this.$axios.post('/api/resetPassword', {
          userId: +this.userId,
          credential: this.$md5(this.passMsg.credential)
        }).then(res => {
          this.verifyLoading = false
          const {code, msg} = {...res.data}

          if(code === 200) {
            this.$message.success(msg)
            this.$router.push('/')
          } else {
            this.$message.error('重置密码失败')
          }
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
</style>
