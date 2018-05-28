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
                  <img v-if="props.row.bookPic" class="book-cover" :src="picUrl(props.row.bookPic)" />
                  <span v-else>暂无封面</span>
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
          <el-table-column prop="publishHouse" label="出版社" width="150"></el-table-column>
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
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 15px;">
      </el-pagination>
    </el-tabs>
    <el-dialog title="修改图书信息" :visible.sync="showModify">
      <el-form class="mod-form" v-loading="loading" :model="bookMsg" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="图书名称" prop="bookName" required>
              <el-input type="text" v-model="bookMsg.bookName" placeholder="图书名称"></el-input>
            </el-form-item>
            <el-form-item label="ISBN10" prop="isbn10">
              <el-input type="text" v-model="bookMsg.isbn10" placeholder="ISBN10"></el-input>
            </el-form-item>
            <el-form-item label="ISBN13" prop="isbn13">
              <el-input type="text" v-model="bookMsg.isbn13" placeholder="ISBN13"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-upload title="图书封面" class="avatar-uploader" :action="`/api/upload?mark=book${bookMsg.bookId}`" :headers="headers" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-form-item label="作者" prop="authorList">
          <el-input type="text" v-model="bookMsg.authorList" placeholder="作者名称(以/分割)"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publishHouse" >
          <el-input type="text" v-model="bookMsg.publishHouse" placeholder="出版社名称"></el-input>
        </el-form-item>
        <el-form-item label="出版年份" prop="publishDate" >
          <el-input type="text" v-model="bookMsg.publishDate" placeholder="出版年份"></el-input>
        </el-form-item>
        <el-form-item label="页数" prop="pageNumber" >
          <el-input type="text" v-model="bookMsg.pageNumber" placeholder="图书页数"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" >
          <el-input type="text" v-model="bookMsg.price" placeholder="图书价格/元"></el-input>
        </el-form-item>
        <el-form-item label="装帧" prop="binding" >
          <el-input type="text" v-model="bookMsg.binding" placeholder="装帧方式(平装,精装等)"></el-input>
        </el-form-item>
        <el-form-item label="图书简介" prop="summary" >
          <el-input type="textarea" autosize v-model="bookMsg.summary" placeholder="图书的简要介绍"></el-input>
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
        <el-button size="mini" type="primary" @click="delBook">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import BBreadcrumb from '../../../components/admin/BBreadcrumb'
  import pagination from '../../../mixins/pagination'
  import localStore from '../../../utils/localStorage'
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
          isbn10: '',
          isbn13: '',
          bookPic: '',
          authorList: '',
          publishHouse: '',
          publishDate: '',
          pageNumber: 0,
          price: 0.00,
          binding: '',
          summary: '',
        },
        totalAuthorList: [],
        bookList: [],
        searchData: '',
        delBookId: 0,
        showModify: false,
        showDel: false,
        headers: {
          Authorization: `bearer ${localStore.get('jwt_token').token}`
        },
      }
    },
    created() {

    },
    computed: {
      imageUrl() {
        if (this.bookMsg.bookPic) {
          return `http://127.0.0.1:3000/uploads/${this.bookMsg.bookPic}`
        } else {
          return ''
        }
      },
    },
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
          if (typeof item === 'object') {
            data += Object.values(item)
          } else {
            data += item
          }
        })

        return data
      },
      formatAuthor(row, col) {
        let data = ''
        row[col.property].map((item, index) => {
          if (index) {
            data += ' / '
          }
          if (typeof item === 'object') {
            data += Object.values(item)
          } else {
            data += item
          }
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
        this.pageSize = 10
        this.currentPage = 1
      },
      // 封面上传
      handleAvatarSuccess(res, file) {
        this.bookMsg.bookPic = res.filename
      },
      beforeAvatarUpload(file) {
        const IMG_LIST = ['jpg', 'png', 'image', 'gif', 'jpeg']
        let isIMG = IMG_LIST.some(img => {
          return file.type.toLowerCase().indexOf(img) >= 0
        })
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isIMG) {
          this.$message.error('请确认图片的格式！')
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能大于2M！')
        }
        return isIMG && isLt2M
      },
      modifyUser(row) {
        this.showModify = true
        this.bookMsg = {
          ...row,
          authorList: this.formatAuthor1(row.authorList)
        }
      },
      submit() {
        this.loading = true
        this.$axios.put('/api/book', {
          bookId: this.bookMsg.bookId,
          isbn10: this.bookMsg.isbn10,
          isbn13: this.bookMsg.isbn13,
          bookName: this.bookMsg.bookName,
          authorList: this.bookMsg.authorList,
          bookPic: this.bookMsg.bookPic,
          publishHouse: this.bookMsg.publishHouse,
          publishDate: this.bookMsg.publishDate,
          pageNumber: this.bookMsg.pageNumber,
          price: this.bookMsg.price,
          binding: this.bookMsg.binding,
          summary: this.bookMsg.summary
        }).then(res => {
          const {code, msg} = {...res.data}
          this.loading = false
          if (code === 200) {
            this.showModify = false
            this.$message.success(msg)
            this.querySearchAsync()
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      },
      confirmDel(row) {
        this.showDel = true
        this.delBookId = +row.bookId
      },
      delBook() {
        this.loading = true
        this.$axios.delete(`/api/book/${this.delBookId}`).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          this.loading = false
          if (code === 200) {
            this.$message.success(msg)
            this.showDel = false
            this.querySearchAsync()
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      },
      // 搜索
      querySearchAsync() {
        if (this.loading || !this.searchData) {
          return
        }
        this.loading = true
        this.$axios.get('/api/book/search', {
          params: {
            searchMsg: this.searchData,
            pageId: this.currentPage,
            limit: this.pageSize
          }
        }).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.total = res.data.count
            this.bookList = res.data.data
            if (this.total === 0) {
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
      width: 120px;
      height: 150px;
      border: 1px dashed #cccccc;
    }
    span {
      color: blue;
    }
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
    width: 122px;
    height: 152px;
    position: relative;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 150px;
      border-radius: 5px;
      display: block;
    }
  }

</style>
