<template>
  <div id="home">
    <van-nav-bar title="通讯录" :border="false"></van-nav-bar>
    <van-search v-model="form.value" placeholder="请输入人员姓名" />
    <van-list>
      <van-cell
        :title="item"
        icon="shop-o"
        v-for="(item,index) in list"
        :key="index"
        @click="toSecondList(item)"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template slot="icon">
          <img :src="itemImage" style="width: 6vw;height: 6vw;margin-right: 15px;" />
        </template>
      </van-cell>
    </van-list>
    <van-tabbar v-model="currentSele" route>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? homeImage.active : homeImage.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/addressBook">
        <span>通讯录</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? addressImage.active : addressImage.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  components: {},
  data() {
    return {
      currentSele: 1,
      homeImage: {
        active: require("@/assets/img/tab_home page_pre.png"),
        inactive: require("@/assets/img/tab_home page.png")
      },
      addressImage: {
        active: require("@/assets/img/tab_address list_pre.png"),
        inactive: require("@/assets/img/tab_address list.png")
      },
      list: ["广西捷算资产交易市场服务有限公司", "捷算子公司"],
      itemImage: require("@/assets/img/icon_file.png"),
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
  created() {
    this.test();
  },
  methods: {
    // 跳转到二级通讯录
    toSecondList(title) {
      this.$router.push({
        name: "secondList",
        params: {
          title
        }
      });
    },
    test() {
      
    }
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
  font-weight: bold;
}
.van-nav-bar .van-icon {
  color: #000;
}
</style>