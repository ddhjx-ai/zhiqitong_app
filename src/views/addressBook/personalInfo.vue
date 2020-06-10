<template>
  <div>
    <van-nav-bar title="个人信息" @click-left="onClickLeft" left-arrow :border="false"></van-nav-bar>
    <div class="listContent">
      <van-field
        v-model="userInfo.userName"
        label="姓名"
        label-align="left"
        input-align="right"
        readonly
      />
      <van-field
        v-model="userInfo.bankCard"
        label="公司"
        label-align="left"
        input-align="right"
        readonly
      />
      <van-field
        v-model="userInfo.payMoney"
        label="发放金额 "
        label-align="left"
        input-align="right"
        readonly
      />
      <van-field
        v-model="userInfo.message"
        rows="2"
        label-align="left"
        input-align="right"
        readonly
      />
    </div>
  </div>
</template>

<script>
// import adminHeader from '../../components/AdminHeader'
export default {
  components: {
    // adminHeader
  },
  data() {
    return {
      userInfo:{

      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    
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