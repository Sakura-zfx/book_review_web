<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-form class="add-form" v-loading="loading" ref="addForm" :model="bookMsg" label-width="100px">
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
          <p style="margin-bottom: 15px; text-align: left">图书封面：</p>
          <el-upload class="avatar-uploader" :action="`/api/upload?mark=book${bookMsg.bookId}`" :headers="headers" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item label="作者" prop="authorList">
        <el-input type="text" v-model="bookMsg.authorList" placeholder="作者名称(以/分割)"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publishHouse">
        <el-input type="text" v-model="bookMsg.publishHouse" placeholder="出版社名称"></el-input>
      </el-form-item>
      <el-form-item label="出版年份" prop="publishDate">
        <el-input type="text" v-model="bookMsg.publishDate" placeholder="出版年份"></el-input>
      </el-form-item>
      <el-form-item label="页数" prop="pageNumber">
        <el-input type="text" v-model="bookMsg.pageNumber" placeholder="图书页数"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input type="text" v-model="bookMsg.price" placeholder="图书价格/元"></el-input>
      </el-form-item>
      <el-form-item label="装帧" prop="binding">
        <el-input type="text" v-model="bookMsg.binding" placeholder="装帧方式(平装,精装等)"></el-input>
      </el-form-item>
      <el-form-item label="图书简介" prop="summary">
        <el-input type="textarea" autosize v-model="bookMsg.summary" placeholder="图书的简要介绍"></el-input>
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
  import localStore from '../../../utils/localStorage'
  export default {
    name: 'book-create',
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
          name: '添加图书',
          to: '/admin/book-create'
        }],
        bookMsg: {
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
        headers: {
          Authorization: `bearer ${localStore.get('jwt_token').token}`
        },
        loading: false,
      }
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
      submit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addBook()
          } else {
            return false
          }
        })
      },
      addBook() {
        this.loading = true
        this.$axios.post('/api/book', this.bookMsg).then(res => {
          const {
            code,
            msg
          } = { ...res.data
          }
          this.loading = false
          if (code === 200) {
            this.$message.success(msg)
            this.bookMsg = {
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
            }
            this.$refs.addForm.resetFields()
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      cancel() {
        this.bookMsg = {
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
          this.$refs.addForm.resetFields()
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

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
    width: 112px;
    height: 132px;
    position: relative;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 110px;
      height: 130px;
      line-height: 130px;
      text-align: center;
    }
    .avatar {
      width: 110px;
      height: 130px;
      border-radius: 5px;
      display: block;
    }
  }

</style>
