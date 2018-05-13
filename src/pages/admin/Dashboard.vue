<template>
  <div>
    <el-row class="row">
      <el-col :span="12" class="col__item1">
        <img class="img" src="../../assets/icons/TB1tlVMcgmTBuNjy1XbXXaMrVXa-140-140.png" />
        <div class="browse__count">
          <p>昨日浏览次数</p>
          <span>{{yesterdayBrowse}}</span>
        </div>
      </el-col>
      <el-col :span="12" class="col__item1">
        <img class="img" src="../../assets/icons/TB1Py4_ceuSBuNjy1XcXXcYjFXa-142-140.png" />
        <div class="browse__count">
          <p>总访问次数</p>
          <span>{{totalBrowse}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid__item">
          <h5 class="card__name">
            <span>图书统计</span>
            <span>{{currentTime}}</span>
          </h5>
          <p class="card__number">{{bookTotal}}</p>
          <div class="intro">
            <div>
              <p>{{bookTotal}}</p>
              <p>当前图书总数</p>
            </div>
            <div>
              <p>{{tagTotal}}</p>
              <p>标签总数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid__item">
          <h5 class="card__name">
            <span>书评统计</span>
            <span>{{currentTime}}</span>
          </h5>
          <p class="card__number">{{bookReviewTotal}}</p>
          <div class="intro">
            <div>
              <p>{{bookReviewTotal}}</p>
              <p>当前书评总数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid__item">
          <h5 class="card__name">
            <span>注册人数统计</span>
            <span>{{currentTime}}</span>
          </h5>
          <p class="card__number">{{userTotal}}</p>
          <div class="intro">
            <div>
              <p>{{userTotal}}</p>
              <p>当前系统注册人数</p>
            </div>
            <div>
              <p>{{sevenDayActvie}}</p>
              <p>七日活跃人数</p>
            </div>
            <div>
              <p>{{sevenDayAdd}}</p>
              <p>七日新增人数</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid__content">
          <h4 style="text-align: left;">最新书评</h4>
          <p v-if="bookReviewsList.length === 0" style="text-align: center;margin-top:30px;">暂无数据</p>
          <ul v-else>
            <li v-for="(item, index) in bookReviewsList" :key="index" class="review__item">
              <div class="content">
                <span>{{item.title}}</span>
                <el-badge :value="item.count"></el-badge>
              </div>
              <span class="time">
                {{item.publishTime}}
              </span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid__content">
          <h4 style="text-align: left;">最新短评</h4>
          <p v-if="shortReviewsList.length === 0" style="text-align: center;margin-top:30px;">暂无数据</p>
          <ul v-else>
            <li v-for="(item, index) in shortReviewsList" :key="index" class="review__item">
              <span class="content">
                {{item.content}}
              </span>
              <span class="time">
                {{item.publishTime}}
              </span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        yesterdayBrowse: 0,
        totalBrowse: 0,
        currentTime: this.$dayjs().format('YYYY/MM/DD HH:mm:ss'),
        bookTotal: 0,
        tagTotal: 0,
        bookReviewTotal: 0,
        userTotal: 0,
        sevenDayActvie: 0,
        sevenDayAdd: 0,
        bookReviewsList: [],
        shortReviewsList: []
      }
    },
    methods: {

    }
  }

</script>
<style lang="scss" scoped>
  .row {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 15px 20px;
  }

  .col__item1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    .img {
      width: 50px;
      height: 50px;
    }
    .browse__count {
      margin-left: 10px;
      line-height: 1.5;
      text-justify: unset;
    }
  }

  .grid__content {
    background-color: #fff;
    border-radius: 5px;
    min-height: 300px;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .review__item {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      .content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: .5px;
      }
      .time {
        white-space: nowrap;
      }
    }
  }

  .grid__item {
    background-color: rgb(49, 180, 141);
    border-radius: 5px;
    height: 140px;
    padding: 15px 20px;
    margin-bottom: 20px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    .card__name {
      display: flex;
      justify-content: space-between;
    }
    .card__number {
      margin: 20px 0;
      font-size: 30px;
      text-align: left;
    }
    .intro {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      p {
        margin-bottom: 5px;
      }
      * {
        text-align: left;
      }
    }
  }

</style>
