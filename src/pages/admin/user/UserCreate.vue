<template>
  <div class="main">
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-form :model="userMsg" status-icon ref="addForm" :rules="rules" label-width="80px">
      <el-form-item label="登录方式" prop="identityType" required>
        <el-select v-model="userMsg.identityType">
          <el-option label="用户名" value="username"></el-option>
          <el-option label="邮箱地址" value="email"></el-option>
          <el-option label="手机号码" value="phone"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录名" prop="identity" required>
        <el-input type="text" v-model="userMsg.identity" :placeholder="`请输入${this.userMsg.identityType==='username'? '用户名':this.userMsg.identityType==='email'?'邮箱地址':'手机号码'}`">
        </el-input>
        <el-button :disabled="userMsg.identity === ''" @click="confirm" type="text" :loading="verifyLoading">检验{{userMsg.identity}}是否已被注册</el-button>
      </el-form-item>
      <el-form-item label="用户角色" prop="userRole" required>
        <el-select v-model="userMsg.userRole">
          <el-option label="普通用户" :value="1"></el-option>
          <el-option label="管理员" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="credential" required>
        <el-input type="password" v-model="userMsg.credential" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input type="password" v-model="userMsg.checkPass" placeholder="再次输入密码确认">
        </el-input>
      </el-form-item>
      <div style="text-align: center;">
        <el-button type="primary" :loading="loading" @click="submit">确认添加</el-button>
        <el-button type="text" @click="cancel">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  export default {
    name: 'user-create',
    components: {
      BBreadcrumb
    },
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('登录名不能为空'))
        } else if (value === this.userExist) {
          callback(new Error('该用户已被注册'))
        } else {
          if (this.userMsg.identityType === 'username') {} else if (this.userMsg.identityType === 'email') {
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (!reg.test(this.userMsg.identity)) {
              callback(new Error('请输入正确的邮箱地址'))
            }
          } else if (this.userMsg.identityType === 'phone') {
            const reg = /^1[0-9]{10}$/
            if (!reg.test(this.userMsg.identity)) {
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
          if (this.userMsg.checkPass !== '') {
            this.$refs.addForm.validateField('checkPass')
            callback()
          } else if (reg.test(this.userMsg.credential) === false) {
            callback(new Error('8-16字母和数字组成，不能是纯数字或纯英文'))
          }
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.userMsg.credential) {
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
          name: '用户管理',
        }, {
          name: '添加用户',
          to: '/admin/user-create'
        }],
        userMsg: {
          identityType: 'username',
          identity: '',
          credential: '',
          checkPass: '',
          userRole: 2,
        },
        rules: {
          identity: [{
            validator: validateName,
          }],
          credential: [{
            validator: validatePass,
          }],
          checkPass: [{
            validator: validatePass2,
          }]
        },
        userExist: '',
        loading: false,
        verifyLoading: false,
      }
    },
    methods: {
      confirm() {
        this.verifyLoading = true
        this.$axios.get('/api/user', {
          params: {
            identity: this.userMsg.identity
          }
        }).then(res => {
          this.verifyLoading = false
          if (res.data.code === -1) {
            this.userExist = this.userMsg.identity          
            this.$refs.addForm.validateField('identity')            
          }
        })
      },
      submit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addUser()
          } else {
            return false
          }
        })
      },
      addUser() {
        this.loading = true
        const {
          identityType,
          identity,
          credential,
          userRole
        } = { ...this.userMsg
        }
        this.$axios.post('/api/user', {
          identityType,
          identity,
          credential: this.$md5(credential),
          userRole
        }).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          if (code === 200) {
            this.userMsg = {
              identityType: 'username',
              identity: '',
              credential: '',
              checkPass: '',
              userRole: 2,
            }
            this.$message.success(msg)
            this.$refs.addForm.resetFields()            
          } else {
            this.$message.error(msg)
            this.$refs.addForm.clearValidate('identity')
            this.userExist = true
            this.$refs.addForm.validateField('identity')                    
          }
          this.loading = false
        })
      },
      cancel() {
        this.userMsg = {
          identityType: 'username',
          identity: '',
          credential: '',
          checkPass: '',
          userRole: 2,
        }
        this.$refs.addForm.resetFields();
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
