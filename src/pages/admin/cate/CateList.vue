<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-table v-loading="loading" :data="cateList" style="width:100%" stripe>
      <el-table-column prop="id" label="分类 ID"></el-table-column>
      <el-table-column prop="cateName" label="分类名称"></el-table-column>
      <el-table-column prop="count" label="该分类下的标签数量"></el-table-column>      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="modifyCate(scope.row)" type="text" size="small">修改</el-button>          
          <el-button @click="confirmDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改分类" :visible.sync="showMod">
      <el-form :model="cateMsg">
        <el-form-item label="分类 ID" prop="cateId">
          <el-input type="text" v-model="cateMsg.cateId" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="cateName" >
          <el-input type="text" v-model="cateMsg.cateName" placeholder="分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showMod = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除分类" :visible.sync="showDel" style="width: 500px; left: 35%;">
      <span>确定删除分类<span style="color: blue;">{{delCateName}}</span>吗？</span>
      <span slot="footer">
        <el-button size="mini" @click="showDel = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="delCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  export default {
    name: 'cate-list',
    components: {
      BBreadcrumb
    },
    data() {
      return {
        breadList: [{
          name: '首页',
          to: '/admin'
        }, {
          name: '分类管理',
        }, {
          name: '分类列表',
          to: '/admin/cate-list'
        }],
        loading: false,
        cateList: [],
        cateMsg: {
          cateId: 0,
          cateName: ''
        },
        showMod: false,
        showDel: false,
        delId: 0,
        delCateName: '',
      }
    },
    created() {
      this.getCateList()
    },
    methods: {
      modifyCate(row) {
        this.showMod = true
        this.cateMsg.cateId = row.id
        this.cateMsg.cateName = row.cateName       
      },
      submit() {
        this.loading = true
        this.$axios.put('/api/cate', {
          ...this.cateMsg
        }).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.showMod = false
            this.$message.success(res.data.msg)
            this.getCateList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      confirmDel(row) {
        this.delId = row.id
        this.delCateName = row.cateName
        this.showDel = true        
      },
      delCate() {
        this.loading = true
        this.$axios.delete(`/api/cate/${this.delId}`).then(res => {
          this.loading = false          
          if (res.data.code === 200) {
            this.showDel = false
            this.$message.success(res.data.msg)            
            this.getCateList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getCateList() {
        this.loading = true
        this.$axios.get('/api/cate').then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-table {
    border-radius: 5px;
    padding: 15px 20px;
  }
</style>
