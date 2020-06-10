<template>
  <div id="home">
    <van-nav-bar :title="currentTitle" @click-left="onClickLeft" left-arrow :border="false"></van-nav-bar>
    <van-search v-model="form.value" placeholder="请输入人员姓名" />
    <van-list>
      <van-cell :title="item" icon="shop-o" v-for="(item,index) in list" :key="index" @click="toThirdList(item)">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template slot="icon">
          <img :src="itemImage" style="width: 6vw;height: 6vw;margin-right: 15px;" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "secondList",
  components: {},
  data() {
    return {
      list: [
        '市场部','市场部','市场部','市场部'
      ],
      itemImage: require("@/assets/img/icon_file.png"),
      currentTitle: '',
      form: {
        value: ""
      }
    };
  },
  created() {
    this.currentTitle = this.$route.params.title
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 跳转到三级通讯录
    toThirdList(title) {
      this.$router.push({
        name: 'thirdList',
        params: {
          title
        }
      })
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