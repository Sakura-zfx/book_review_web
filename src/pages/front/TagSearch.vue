<template>
  <div class="main">
    <h1 class="title">分类标签</h1>
    <div class="each-tag" v-for="item in tagList" :key="item.cateId">
      <p style="font-size: 14px;">{{item.cateName}}</p>
      <el-tag type="info" size="small" v-for="tag in item.tags" :key="tag.id">
        {{tag.tagName}}
        <router-link v-if="tag.count" to="/">({{tag.count}})</router-link>
      </el-tag>
    </div>
  </div>
</template>
<script>
  import BookItem from '../../components/front/BookItem.vue'
  export default {
    name: 'tag-search',
    components: {
      BookItem
    },
    data() {
      return {
        loading: false,
        loadingText: '正在加载标签列表...',
        tagList: [],
      }
    },
    created() {
      this.getTagList()
    },
    methods: {
      getTagList() {
        this.$axios.get('/api/tag').then(res => {
          if (res.data.code === 200) {
            this.tagList = res.data.data
          }
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
  .el-tag {
    margin: 5px 5px 5px 0;
    color: #37a;
  }
  .main {
    padding: 15px 10%;
    min-height: 500px;
    .title {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .each-tag {
    padding-top: 10px;
    border-bottom: 1px dashed #ccc;
  }
</style>
