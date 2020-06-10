<template>
  <div id="home">
    <div class="home_header">
      <van-nav-bar title="通讯录" left-arrow @click-left="$router.back()"/>
    </div>
    <van-search v-model="form.value" placeholder="请输入人员姓名" />
    <van-list>
      <!-- v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" -->
      <van-cell style="margin-bottom: 15px" v-for="(item,index) in list" :key="index">
        <div class="tabs_header">
          <p class="tabs_header_left">
            申请金额
            <span class="tabs_header_right">{{item.a}}</span>
          </p>
          <p style="color:#0062FF">查看</p>
        </div>
        <p>
          <span class="tabs_header_left">申请类型</span>
          <span class="tabs_header_right">{{item.b}}</span>
        </p>
        <p>
          <span class="tabs_header_left">申请时间</span>
          <span class="tabs_header_right">{{item.c}}</span>
        </p>
      </van-cell>
    </van-list>
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "Fild",
  components: {},
  data() {
    return {
      list: [
        {
          a: "张三",
          b: "实时付款",
          c: "2020-03-12 14:22:25"
        }
      ],
      loading: false,
      finished: false,
      active: 0,
      pageData: {
        pageSize: 10,
        pageNumber: 1
      },
      form: {
        value: ""
      }
    };
  },
  methods: {
    onLoad() {
      this.pageData.pageNumber++;
      this.getDataList();
    },
    getDataList() {}
  }
};
</script>

<style lang="scss" scoped>
.home_header {
  .van-nav-bar__title {
    font-weight: bold;
    font-size: 20px;
  }
}
.tabs_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: -15px;
}
.tabs_header_left {
  width: 200px;
  .sqr {
    width: 61.39px;
    text-align: right;
    display: inline-block;
  }
}
.tabs_header_right {
  display: inline-block;
  margin-left: 20px;
}
</style>