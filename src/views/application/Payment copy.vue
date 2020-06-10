<template>
  <div id="home">
    <div class="home_header">
      <van-icon name="arrow-left" @click="$router.back()" />
      <h4>实时付款申请</h4>
    </div>
    <div>
      <van-field v-model="form.value" placeholder="请输入" label="收款人全称" />
      <!-- <van-radio-group v-model="form.radio" direction="horizontal" >
        <span style="font-size: 15.5px;">
          收款人类型
        </span>
        <van-radio name="1" icon-size="15px" style="margin-left:172px;">个人</van-radio>
        <van-radio name="2" icon-size="15px">企业</van-radio>
      </van-radio-group>-->
      <van-field name="radio" label="收款人类型">
        <template slot="input">
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">单选框 1</van-radio>
            <van-radio name="2">单选框 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="form.value" placeholder="请输入" label="收款人开户行" />
      <span id="shoukuan">
        <van-field v-model="form.value" placeholder="请输入" label="收款人银行账号" />
      </span>
      <van-field v-model="form.value" placeholder="请输入" label="收款金额" />
      <div class="maxmoney">
        <span>大写</span>
        <span>壹佰元</span>
      </div>
      <van-cell is-link @click="showPopup">支付日期</van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker
          v-model="form.value1"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
      <van-field v-model="form.value" placeholder="请输入" label="支付用途" />
      <van-field
        v-model="form.value"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入"
        show-word-limit
      />
      <div>
        <span style="margin-left: 18px;">附件</span>
        <van-uploader :after-read="afterRead" style="padding-left: 50px;" />
      </div>
    </div>
    <van-button type="info" size="large" style="margin-top: 50px;">提交审批</van-button>
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "Payment",
  components: {},
  data() {
    return {
      show: false,
      form: {
        value: "",
        value1: "",
        radio: 1
      },
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(3030, 10, 1)
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.home_header {
  display: flex;
  .van-icon {
    padding: 22px 0 0 15px;
  }
  h4 {
    margin-left: 9rem;
  }
}
.van-radio-group--horizontal {
  margin-left: 15px;
  color: #323233;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid beige;
}

.maxmoney {
  height: 47px;
  line-height: 47px;
  font-size: 15.5px;
  color: #323233;
  text-align: right;
  padding-right: 16px;
  background-color: beige;
}
</style>
<style>
.van-field__label {
  width: 100px !important;
}
.van-field__control {
  text-align: right !important;
}
</style>