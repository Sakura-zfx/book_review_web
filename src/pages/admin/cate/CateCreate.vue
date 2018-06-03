<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-form :model="cateMsg" ref="form">
      <el-form-item label="分类名称" prop="cateName" required>
        <el-input type="text" v-model="cateMsg.cateName" placeholder="请输入分类名称"></el-input>
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
  name: 'cate-create',
  components: {
    BBreadcrumb
  },
  data () {
    return {
      breadList: [{
        name: '首页',
        to: '/admin'
      }, {
        name: '分类管理',
      }, {
        name: '添加分类',
        to: '/admin/cate-create'
      }],
      cateMsg: {
        cateName: ''
      },
      loading: false,
    }
  },
  methods: {
    submit() {
      if (this.cateMsg.cateName === '') {
        this.$message('请输入分类名称~~')
        return
      }
      this.loading = true
      this.$axios.post('/api/cate', {
        ...this.cateMsg
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.cateMsg = {
            cateName: ''
          }
          this.$refs.form.resetFields()          
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
    },
    cancel() {
      this.cateMsg = {
        cateName: ''
      }
      this.$refs.form.resetFields()
    }
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
