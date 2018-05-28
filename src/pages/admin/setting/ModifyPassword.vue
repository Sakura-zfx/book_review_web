<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-form :model="passMsg" status-icon ref="modForm" :rules="rules" label-width="80px">
      <p style="margin-bottom: 15px;">您正在进行
        <span style="color: red;">修改密码</span>的操作，修改后将会
        <span style="color: red;">自动登出</span>系统，然后请使用
        <span style="color: red;">新密码重新登录</span>。</p>
      <el-form-item label="用户名">
        <el-input disabled v-model="userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="credential" required>
        <el-input type="password" v-model="passMsg.credential" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input type="password" v-model="passMsg.checkPass" placeholder="再次输入密码确认"></el-input>
      </el-form-item>
      <div style="text-align: center;">
        <el-button type="primary" :loading="loading" @click="submit">确认修改</el-button>
        <el-button type="text" @click="cancel">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  import cookie from '../../../mixins/cookie'
  import localStore from '../../../utils/localStorage'
  export default {
    name: 'modify-password',
    mixins: [cookie],
    components: {
      BBreadcrumb
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
        breadList: [{
          name: '首页',
          to: '/admin'
        }, {
          name: '通用管理',
        }, {
          name: '修改密码',
          to: '/admin/modify-password'
        }],
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
        loading: false,
      }
    },
    methods: {
      submit() {
        this.loading = true
        this.$axios.post('/api/resetPassword', {
          userId: +this.userId,
          credential: this.$md5(this.passMsg.credential)
        }).then(res => {
          this.loading = false
          const {code, msg} = {...res.data}

          if(code === 200) {
            this.$message.success(msg)

            this.$Cookie.remove('userId')
            this.$Cookie.remove('userName')
            this.$Cookie.remove('expires')
            this.$Cookie.remove('userRole')
            localStore.remove('jwt_token')
            this.$router.push({
              path: '/admin/login'
            })
          } else {
            this.$message.error('重置密码失败')
          }
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      },
      cancel() {
        this.passMsg = {
          credential: '',
          checkPass: ''
        }
        this.$refs.modForm.resetFields()
      },
    }
  }

</script>
<style lang="scss" scoped>
  .el-form {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px 20px;
  }

</style>
