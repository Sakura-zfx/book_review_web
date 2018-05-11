<template>
  <div class="wrapper">
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <el-table v-loading="loading" :data="userList" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed prop="userId" label="ID" width="50">
          </el-table-column>
          <el-table-column fixed prop="nickName" label="用户名" width="90">
          </el-table-column>
          <el-table-column prop="userRole" :formatter="formatUserRole" label="用户角色" width="80">
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="200">
          </el-table-column>
          <el-table-column prop="registerDate" :formatter="formatDate" label="注册时间" width="180">
          </el-table-column>
          <el-table-column prop="lastLoginTime" :formatter="formatDate" label="最后登录时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="普通用户" name="second">
        <el-table v-loading="loading" :data="userList" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed prop="userId" label="ID" width="50">
          </el-table-column>
          <el-table-column fixed prop="nickName" label="用户名" width="90">
          </el-table-column>
          <el-table-column prop="userRole" :formatter="formatUserRole" label="用户角色" width="80">
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="200">
          </el-table-column>
          <el-table-column prop="registerDate" :formatter="formatDate" label="注册时间" width="180">
          </el-table-column>
          <el-table-column prop="lastLoginTime" :formatter="formatDate" label="最后登录时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="管理员" name="third">
        <el-table v-loading="loading" :data="userList" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed prop="userId" label="ID" width="50">
          </el-table-column>
          <el-table-column fixed prop="nickName" label="用户名" width="90">
          </el-table-column>
          <el-table-column prop="userRole" :formatter="formatUserRole" label="用户角色" width="80">
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="200">
          </el-table-column>
          <el-table-column prop="registerDate" :formatter="formatDate" label="注册时间" width="180">
          </el-table-column>
          <el-table-column prop="lastLoginTime" :formatter="formatDate" label="最后登录时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="被封禁用户" name="fourth">
        <el-table v-loading="loading" :data="userList" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed prop="userId" label="ID" width="50">
          </el-table-column>
          <el-table-column fixed prop="nickName" label="用户名" width="90">
          </el-table-column>
          <el-table-column prop="userRole" :formatter="formatUserRole" label="用户角色" width="80">
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="200">
          </el-table-column>
          <el-table-column prop="registerDate" :formatter="formatDate" label="注册时间" width="180">
          </el-table-column>
          <el-table-column prop="lastLoginTime" :formatter="formatDate" label="最后登录时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="search">
        <el-input slot="label" size="mini" prefix-icon="el-icon-search" clearable v-model="searchData" @change="querySearchAsync"
          placeholder="请输入内容">
        </el-input>
        <el-table v-loading="loading" :data="searchList" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed prop="userId" label="ID" width="50">
          </el-table-column>
          <el-table-column fixed prop="nickName" label="用户名" width="90">
          </el-table-column>
          <el-table-column prop="userRole" :formatter="formatUserRole" label="用户角色" width="80">
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="200">
          </el-table-column>
          <el-table-column prop="registerDate" :formatter="formatDate" label="注册时间" width="180">
          </el-table-column>
          <el-table-column prop="lastLoginTime" :formatter="formatDate" label="最后登录时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="修改用户信息" :visible.sync="showModify">
      <el-form class="mod-form" v-loading="loading" :model="userMsg" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="昵称" prop="nickName" required>
              <el-input type="text" v-model="userMsg.nickName" placeholder="nickName">
              </el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="tureName">
              <el-input type="text" v-model="userMsg.tureName" placeholder="tureName">
              </el-input>
            </el-form-item>

            <el-form-item label="性别" prop="userGender" style="width: 300px">
              <el-select v-model="userMsg.userGender" placeholder="用户性别">
                <el-option label="保密" value="secret"></el-option>
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户组" prop="userRole" required style="width: 300px">
              <el-select v-model="userMsg.userRole" placeholder="选择用户组">
                <el-option label="普通用户" :value="1"></el-option>
                <el-option label="管理员" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p style="margin-bottom: 15px; text-align: left">用户头像：</p>
            <el-upload class="avatar-uploader" :action="`/api/upload?userId=${userMsg.userId}`" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"  :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-form-item label="地址" prop="address">
          <el-input type="text" v-model="userMsg.address">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="userMsg.email">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="userMsg.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="tureName">
          <el-input type="text" v-model="registerDate" disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="最后登录时间" prop="tureName">
          <el-input type="text" v-model="lastLoginTime" disabled>
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="submit" size="small">确定</el-button>
        <el-button @click="showModify = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  import localStore from '../../../utils/localStorage'
  export default {
    name: 'user-list',
    components: {
      BBreadcrumb
    },
    data() {
      return {
        breadList: [{
          name: '首页',
          to: '/admin'
        }, {
          name: '用户管理',
        }, {
          name: '用户列表',
          to: '/admin/user-list'
        }],
        activeName: 'first',
        userList: [],
        searchData: '',
        searchList: [],
        loading: false,
        userMsg: {
          nickName: '',
          tureName: '',
          userGender: '',
          picture: '',
          phone: '',
          email: '',
          birth: '',
          address: '',
          registerDate: '',
          lastLoginTime: '',
          userRole: '',
          status: ''
        },
        showModify: false,
        showAvatar: true,
        headers: {
          Authorization: `bearer ${localStore.get('jwt_token').token}`
        },
        rules: {

        }
      }
    },
    created() {
      this.getUserList(0)
    },
    computed: {
      registerDate() {
        return this.userMsg.registerDate ? this.$dayjs(this.userMsg.registerDate).format('YYYY/MM/DD HH:mm:ss') : ''
      },
      lastLoginTime() {
        return this.userMsg.lastLoginTime ? this.$dayjs(this.userMsg.lastLoginTime).format('YYYY/MM/DD HH:mm:ss') : ''
      },
      imageUrl() {
        if (this.userMsg.picture) {
          return `http://127.0.0.1:3000/uploads/${this.userMsg.picture}`
        } else {
          return ''
        }
      }
    },
    methods: {
      getUserList(userRole) {
        if (this.loading) {
          return
        }
        this.loading = true
        this.$axios.get('/api/user/list', {
          params: {
            userRole: +userRole,
            pageId: 1,
            limit: 10
          }
        }).then(res => {
          this.userList = res.data.data
          this.loading = false
        })
      },
      getBanlist() {
        if (this.loading) {
          return
        }
        this.loading = true
        this.$axios.get('/api/user/banlist', {
          params: {
            status: 1,
            pageId: 1,
            limit: 10,
          }
        }).then(res => {
          this.userList = res.data.data
          this.loading = false
        })
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (row && +row.status === 1) {
          return 'warning-row'
        } else {
          return ''
        }
      },
      formatUserRole(row, col) {
        return row[col.property] === 1 ? '普通用户' : '管理员'
      },
      formatStatus(row, col) {
        return row[col.property] === 1 ? '封禁' : '正常'
      },
      formatDate(row, col) {
        return row[col.property] ?
          this.$dayjs(row[col.property]).format('YYYY/MM/DD HH:mm:ss') :
          ''
      },
      handleClick(tab, event) {
        if (tab.name === 'first') {
          this.getUserList(0)
        } else if (tab.name === 'second') {
          this.getUserList(1)
        } else if (tab.name === 'third') {
          this.getUserList(2)
        } else if (tab.name === 'fourth') {
          this.getBanlist()
        } else if (tab.name === 'search') {
          this.querySearchAsync()
        }
      },
      modifyUser(row) {
        this.showModify = true
        this.userMsg = {
          ...row
        }
      },
      submit() {
        if (this.loading) {
          return
        }
        this.loading = true
        this.$axios.put('/api/user', this.userMsg).then(res => {
          this.loading = false
          const {code, msg} = {...res.data}
          if (code === 200) {
            this.showModify = false
            this.$message({
              type: 'success',
              message: msg
            })
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
        })
      },
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
      delUser(row) {
        if (this.loading) {
          return
        }
        this.loading = true
        this.$axios.delete(`/api/user/${+row.userId}`).then(res => {
          const {code, msg} = {...res.data}

          if (code === 200) {
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
          this.loading = false
        })
      },
      querySearchAsync() {
        if (!this.searchData || this.loading) {
          return
        }
        this.loading = true
        this.searchData && this.$axios.get('/api/user/search', {
          params: {
            search: this.searchData
          }
        }).then(res => {
          this.searchList = res.data.data
          this.loading = false
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
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

</style>
