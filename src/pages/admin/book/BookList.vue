<template>
  <div>
    <b-breadcrumb :bread-list="breadList"></b-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <el-table v-loading="loading" :data="bookList" style="width:100%" stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.bookName }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="bookId" label="ID" width="50"></el-table-column>
          <el-table-column prop="bookName" label="图书名称"></el-table-column>
          <el-table-column prop="publishHouse" label="出版地区" width="150"></el-table-column>
          <el-table-column prop="publishDate" label="出版时间" width="150"></el-table-column>
          <el-table-column prop="author" label="作者" width="120"></el-table-column>
          <el-table-column prop="price" :formatter="formatPrice" label="图书价格/元" width="120"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="confirmDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane name="search">
        <el-input slot="label" size="mini" prefix-icon="el-icon-search" clearable v-model="searchData" @change="querySearchAsync"
          placeholder="请输入内容">
        </el-input>
      </el-tab-pane>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="userNum" style="margin-top: 15px;">
      </el-pagination>
    </el-tabs>
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
          name: '图书列表',
          to: '/admin/book-list'
        }],
        loading: false,
        activeName: 'first',
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
        bookList: [],
        searchData: '',
        searchTotal: [],
        searchList: [],
        delBookId: 0,
      }
    },
    methods: {
      // 分页的操作
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      handleClick() {

      },
      modifyUser(row) {},
      confirmDel(row) {},
      // 搜索
      querySearchAsync() {},
      formatPrice(row, col) {
        return row[col.property]
      },
    }
  }

</script>
<style lang="scss" scoped>


</style>
