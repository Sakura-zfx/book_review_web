<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="search">
        <el-input slot="label" size="mini" prefix-icon="el-icon-search" clearable v-model="searchData" @change="querySearchAsync"
          placeholder="请输入内容">
        </el-input>
        <el-table v-loading="loading" :data="bookList" style="width:100%" stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand" label-width="70px">
                <el-form-item label="图书封面">
                  <img class="book-cover" :src="picUrl(props.row.bookPic)"/>
                </el-form-item>
                <el-form-item label="图书简介">
                  <span>{{ props.row.summary}}</span>                  
                </el-form-item>
                <el-form-item label="图书 ID">
                  <span>{{ props.row.bookId }}</span>
                </el-form-item>
                <el-form-item label="图书名称">
                  <span>{{ props.row.bookName}}</span>
                </el-form-item>
                <el-form-item label="ISBN10">
                  <span>{{ props.row.isbn10 }}</span>
                </el-form-item>
                <el-form-item label="ISBN13">
                  <span>{{ props.row.isbn13 }}</span>
                </el-form-item>
                <el-form-item label="出版地区">
                  <span>{{ props.row.publishHouse }}</span>
                </el-form-item>
                <el-form-item label="出版时间">
                  <span>{{ props.row.publishDate }}</span>
                </el-form-item>
                <el-form-item label="作者">
                  <span>{{ formatAuthor1(props.row.authorList)}}</span>
                </el-form-item>
                <el-form-item label="页数">
                  <span>{{ props.row.pageNumber }}</span>
                </el-form-item>
                <el-form-item label="价格/元">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="装订">
                  <span>{{ props.row.binding }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="bookId" label="ID" width="50"></el-table-column>
          <el-table-column prop="bookName" label="图书名称"></el-table-column>
          <el-table-column prop="avg" label="图书评分"></el-table-column>          
          <el-table-column prop="publishHouse" label="出版地区" width="150"></el-table-column>
          <el-table-column prop="publishDate" label="出版时间" width="150"></el-table-column>
          <el-table-column prop="authorList" :formatter="formatAuthor" label="作者" width="180"></el-table-column>
          <el-table-column prop="price" :formatter="formatPrice" label="图书价格/元" width="120"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="confirmDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="bookNum" style="margin-top: 15px;">
      </el-pagination>
    </el-tabs>
    <el-dialog title="修改图书信息" :visible.sync="showModify">
      <el-form class="mod-form" v-loading="loading" :model="userMsg" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="昵称" prop="nickName" required>
              <el-input type="text" v-model="userMsg.nickName" placeholder="nickName">
              </el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="tureName">
              <el-input type="text" v-model="userMsg.tureName" placeholder="trueName">
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
            <el-form-item label="状态" prop="status" required style="width: 300px">
              <el-select v-model="userMsg.status">
                <el-option label="正常" :value="0"></el-option>
                <el-option label="封禁" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p style="margin-bottom: 15px; text-align: left">用户头像：</p>
            <el-upload class="avatar-uploader" :action="`/api/upload?userId=${userMsg.userId}`" :headers="headers" :show-file-list="false"
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
          <el-input type="text" v-model="userMsg.email" placeholder="绑定邮箱后才可修改" :disabled="!userMsg.email">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="userMsg.phone" placeholder="绑定手机号码后才可修改" :disabled="!userMsg.phone">
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
    <el-dialog title="删除图书" :visible.sync="showDel" style="width: 500px; left: 35%;">
      <span>确定删除该图书吗？</span>
      <span slot="footer">
        <el-button size="mini" @click="showDel = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="delUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  import pagination from '../../../mixins/pagination'
  export default {
    name: 'book-list',
    mixins: [pagination],
    components: {
      BBreadcrumb
    },
    data() {
      return {
        breadList: [{
          name: '首页',
          to: '/admin'
        }, {
          name: '图书管理',
        }, {
          name: '搜索图书',
          to: '/admin/book-list'
        }],
        loading: false,
        activeName: 'search',
        bookMsg: {
          bookId: 0,
          bookName: '',
          bookPic: '',
          author: '',
          publishHouse: '',
          publishDate: '',
          pageNumber: 0,
          price: 0.00,
        },
        bookNum: 0,
        bookList: [],
        searchData: '',
        delBookId: 0,
        showModify: false,
        showDel: false,
      }
    },
    created() {},
    methods: {
      picUrl(url) {
        if (url) {
          return `http://127.0.0.1:3000/uploads/${url}`
        } else {
          return ''
        }
      },
      formatAuthor1(list) {
        let data = ''
        list.map((item, index) => {
          if (index) {
            data += ' / '
          }
          data += Object.values(item)
        })

        return data
      },
      formatAuthor(row, col) {
        let data = ''
        row[col.property].map((item, index) => {
          if (index) {
            data += ' / '
          }
          data += Object.values(item)
        })

        return data
      },
      // 分页的操作
      handleSizeChange(val) {
        this.pageSize = val
        this.querySearchAsync()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.querySearchAsync()
      },
      handleClick() {

      },
      modifyUser(row) {},
      confirmDel(row) {},
      // 搜索
      querySearchAsync() {
        if (this.loading || !this.searchData) {
          return
        }
        this.loading = true
        this.searchData && this.$axios.get('/api/book/search', {
          params: {
            searchMsg: this.searchData,
            pageId: this.currentPage,
            limit: this.pageSize
          }
        }).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.bookNum = res.data.count
            this.bookList = res.data.data
            if (this.bookNum === 0) {
              this.$message('没有查找到相关图书')
            } 
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      formatPrice(row, col) {
        return row[col.property]
      },
    }
  }

</script>
<style lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    .book-cover {
      width: 110px;
      height: 130px;
      border: 1px dashed #cccccc;
    }
    span {
      color: blue;
    }
  }

</style>
