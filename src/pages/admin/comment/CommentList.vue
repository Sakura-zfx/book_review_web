<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-tabs v-model="activeName">
      <el-tab-pane name="search">
        <el-input slot="label" size="mini" autofocus prefix-icon="el-icon-search" clearable v-model="searchData" @change="querySearchAsync"
          placeholder="请输入用户ID查询评论">
        </el-input>
        <p>发表评论: 共 <span style="color: blue;">{{commentList.length}}</span> 条</p>
        <el-table v-loading="loading" :data="commentList" style="width:100%" stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand" label-width="70px">  
                <el-form-item label="评论标题">
                  <span>{{ props.row.title}}</span>
                </el-form-item>
                <el-form-item label="评论内容">
                  <span>{{ props.row.content}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="评论 ID" width="80"></el-table-column>
          <el-table-column prop="userName" label="发表用户"></el-table-column>
          <el-table-column prop="bookName" label="评论书籍"></el-table-column>
          <el-table-column label="评论类型">
            <template slot-scope="scope">
              <span>{{scope.row.topicId === 1 ? '短评' : '书评'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="评分">
            <template slot-scope="scope">
              <span>{{ (scope.row.interest && scope.row.interest.score) ? scope.row.interest.score : '未评分'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" :formatter="formatDate" label="评论时间"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="confirmDel(scope.row, 0)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p style="margin-top: 10px;">发表回复: 共 <span style="color: blue;">{{replyList.length}}</span> 条</p>   
        <el-table v-loading="loading" :data="replyList" style="width:100%" stripe>
          <el-table-column prop="id" label="回复 ID" width="80"></el-table-column>
          <el-table-column prop="fromUid" label="发表用户 ID" width="100"></el-table-column>
          <el-table-column prop="toUid" label="回复对象 ID" width="100"></el-table-column>  
          <el-table-column prop="content" label="回复内容"></el-table-column>                  
          <el-table-column prop="commentId" label="初始评论 ID"></el-table-column>
          <el-table-column label="父评论(回复)">
            <template slot-scope="scope">
              <span>{{scope.row.replyType === 'comment' ? '评论ID' : '回复ID'}}</span>
              <span>{{scope.row.replyId}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" :formatter="formatDate" label="回复时间"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="confirmDel(scope.row, 1)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="`删除${delType === 0 ? '评论' : '回复'}`" :visible.sync="showDel" style="width: 500px; left: 35%;">
      <span>{{`确定删除该${delType === 0 ? '评论' : '回复'}吗？`}}</span>
      <span slot="footer">
        <el-button size="mini" @click="showDel = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="delComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  export default {
    name: 'comment-list',
    components: {
      BBreadcrumb
    },
    data() {
      return {
        breadList: [{
          name: '首页',
          to: '/admin'
        }, {
          name: '评论管理',
        }, {
          name: '评论列表',
          to: '/admin/comment-list'
        }],
        activeName: 'search',
        showDel: false,
        loading: false,
        searchData: this.$route.query.userId || '',
        commentList: [],
        replyList: [],
        delId: 0,
        delType: 0,
      }
    },
    created() {
      if (this.searchData !== '') {
        this.querySearchAsync()
      }
    },
    methods: {
      formatDate(row, col) {
        return row[col.property] ?
          this.$dayjs(row[col.property]).format('YYYY/MM/DD HH:mm:ss') :
          ''
      },
      confirmDel(row, type) {
        this.delId = row.id
        this.delType = type
        this.showDel = true
      },
      delComment() {
        if (this.delType) {
          // 删除回复
          this.$axios.delete(`/api/reply/${this.delId}`).then(res => {
            if (res.data.code === 200) {
              this.showDel = false
              this.querySearchAsync()              
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.$axios.delete(`/api/comment/${this.delId}`).then(res => {
            if (res.data.code === 200) {
              this.showDel = false
              this.querySearchAsync()              
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      querySearchAsync() {
        if (this.loading || !this.searchData) {
          return
        }
        if (isNaN(this.searchData)) {
          this.$message.error('请输入用户ID查询')
          return
        }
        this.loading = true
        this.$axios.get(`/api/user/${+this.searchData}/comment`).then(res => {
          const {code, msg} = {...res.data}
          this.loading = false

          if (code === 200) {
            this.commentList = res.data.data.cData
            this.replyList = res.data.data.rData
            if (res.data.count === 0) {
              this.$message('该查询用户暂无评论以及回复记录')
            }
          } else {
            this.$message.error(msg)
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
  .el-form-item {
    width: 100%;
    span {
      color: blue;
    }
  }
</style>
