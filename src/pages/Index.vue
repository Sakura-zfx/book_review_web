<template>
    <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <img src="../assets/icons/TB1tlVMcgmTBuNjy1XbXXaMrVXa-140-140.png" />
        <div>
          <span>昨日浏览人数</span>
          <span>233</span>
        </div>
      </el-col>
      <el-col :span="12">
        <img src="../assets/icons/TB1Py4_ceuSBuNjy1XcXXcYjFXa-142-140.png" />
        <div>
          <span>总访问人数</span>
          <span>55312</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h4>最新书评</h4>
        <ul>
          <li v-for="(item, index) in bookReviewsList" :key="index">
            <div>
              <span>{item.title}</span>
              <el-badge :value="item.count"></el-badge>
            </div>
            <span class="time">
              {item.publishTime}
            </span>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <h4>最新短评</h4>
        <ul>
          <li v-for="(item, index) in shortReviewsList" :key="index">
            <span class="content">
              {item.content}
            </span>
            <span class="time">
              {item.publishTime}
            </span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'index',
      bookReviewsList: [],
      shortReviewsList: []
    }
  },
  created () {
  },
  methods: {
   
  }
}
</script>
<style lang="scss" scoped>

</style>
