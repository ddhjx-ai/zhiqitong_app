<template>
  <div id="home">
    <van-nav-bar title="已提交" left-arrow @click-left="$router.back()" />
    <van-search v-model="form.auditNameOrUserName" placeholder="请输入发起人、审批类型" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell
        style="margin-bottom: 15px"
        v-for="(item,index) in list"
        :key="index"
        @click="jumpSubmitDetail(item.simpleId)"
      >
        <div class="tabs_header">
          <p class="tabs_header_left">
            申请金额
            <span class="tabs_header_right">{{item.allAmount}}</span>
          </p>
          <p style="color:#0062FF">查看</p>
        </div>
        <p>
          <span class="tabs_header_left">申请类型</span>
          <span class="tabs_header_right" v-if="item.auditRuleType == 0">企业审核</span>
          <span class="tabs_header_right" v-if="item.auditRuleType == 1">实时付款</span>
          <span class="tabs_header_right" v-if="item.auditRuleType == 2">批量付款</span>
          <span class="tabs_header_right" v-if="item.auditRuleType == 3">实时收款</span>
          <span class="tabs_header_right" v-if="item.auditRuleType == 4">批量收款</span>
        </p>
        <div class="tabs_header">
          <p class="tabs_header_left_one">
            申请时间
            <span class="tabs_header_right">{{item.createdTime}}</span>
          </p>
          <p v-if="item.state==0">
            <img src="@/assets/img/ing.png" style="width:46px;" />
          </p>
          <p v-if="item.state==4">
            <img src="@/assets/img/pass.png" style="width:46px;" />
          </p>
          <p v-if="item.state==3">
            <img src="@/assets/img/reject.png" style="width:46px;" />
          </p>
        </div>
      </van-cell> -->
      <van-cell
              style="margin-bottom: 15px"
              v-for="(item,index) in list"
              :key="index"
              @click="jumpSubmitDetail(item.simpleId)"
            >
              <div class="tabs_header">
                <p class="tabs_header_left" style="width:100%;display:flex">
                  <span class="sqr">申请金额</span>
                  <span class="tabs_header_right" style="flex:1;">{{item.allAmount ? item.allAmount : '无法获取审批金额'}} ({{zhuanhua(item.allAmount)}})</span>
                  <span style="color:#0062FF">查看</span>
                </p>
              </div>
              <p>
                <span class="tabs_header_left">申请类型</span>
                <span class="tabs_header_right" v-if="item.auditRuleType == 0">企业审核</span>
                <span class="tabs_header_right" v-if="item.auditRuleType == 1">实时付款</span>
                <span class="tabs_header_right" v-if="item.auditRuleType == 2">批量付款</span>
                <span class="tabs_header_right" v-if="item.auditRuleType == 3">实时收款</span>
                <span class="tabs_header_right" v-if="item.auditRuleType == 4">批量收款</span>
              </p>
              <p>
                <span class="tabs_header_left">申请时间</span>
                <span class="tabs_header_right">{{item.createdTime}}</span>
              </p>
              <van-image :src="ingImg" v-if="item.state == 0"></van-image>
              <van-image :src="rejectImg" v-if="item.state == 3"></van-image>
              <van-image :src="passImg" v-if="item.state == 4"></van-image>
            </van-cell>
    </van-list>
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "Submit",
  components: {},
  data() {
    return {
      ingImg: require("@/assets/img/ing.png"),
      rejectImg: require("@/assets/img/reject.png"),
      passImg: require("@/assets/img/pass.png"),
      withdrawImg: require("@/assets/img/withdraw.png"),
      list: [],
      loading: false,
      finished: false,
      active: 0,
      currentPage: 1,
      size: 10,
      orderTotal: 0,
      form: {
        auditNameOrUserName: ""
      }
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    onLoad() {
      this.currentPage++;
      this.getDataList();
    },
    // 已提交
    async getDataList() {
      this.loading = true;
      const res = await this.$get({
        url: "/erp/vphonor/auditRule/myAuditRecord",
        params: {
          currentPage: this.currentPage,
          size: this.size,
          userId: window.localStorage.getItem("app_uid"),
          enterpriseId: window.localStorage.getItem("app_eid"),
          /* userId:86,
          enterpriseId:77, */
          state: 3,
          auditNameOrUserName: this.form.auditNameOrUserName
        }
      });
      if (res.err == false) {
        this.list.push(...res.responseObject.iPage.records);
        this.orderTotal = +res.responseObject.iPage.total;
        if (this.list.length >= this.orderTotal) {
          this.finished = true;
        }
      } else {
        this.finished = true;
      }
      this.loading = false;
    },
    //已提交详情
    jumpSubmitDetail(simpleId) {
      this.$router.push({
        name: "Submitdetail",
        query: { simpleId: simpleId }
      });
    },
    zhuanhua(money) {
      if(!money) return '无金额'
      //汉字的数字
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      );
      //基本单位
      var cnIntRadice = new Array("", "拾", "佰", "仟");
      //对应整数部分扩展单位
      var cnIntUnits = new Array("", "万", "亿", "兆");
      //对应小数部分单位
      var cnDecUnits = new Array("角", "分", "毫", "厘");
      //整数金额时后面跟的字符
      var cnInteger = "整";
      //整型完以后的单位
      var cnIntLast = "元";
      //最大处理的数字
      var maxNum = 999999999999999.9999;
      //金额整数部分
      var integerNum;
      //金额小数部分
      var decimalNum;
      //输出的中文金额字符串
      var chineseStr = "";
      //分离金额后用的数组，预定义
      var parts;
      if (money == "") {
        return "";
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        //超出最大处理数字
        return "";
      }
      if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
      }
      //转换为字符串
      money = money.toString();
      if (money.indexOf(".") == -1) {
        integerNum = money;
        decimalNum = "";
      } else {
        parts = money.split(".");
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
          }
        }
        chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum != "") {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
          var n = decimalNum.substr(i, 1);
          if (n != "0") {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (chineseStr == "") {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == "") {
        chineseStr += cnInteger;
      }
      return chineseStr;
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
/* .tabs_header_left_one {
  width: 54.57.933vw;
} */
.tabs_header_left {
  width: 200px;
  .sqr {
    // width: 61.39px;
    text-align: right;
    display: inline-block;
  }
}
.tabs_header_right {
  display: inline-block;
  margin-left: 20px;
}
.van-image {
  position: absolute;
  right: 8vw;
  top: 10vw;
  width: 14vw;
  height: 14vw;
}
</style>