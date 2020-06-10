<template>
  <div>
    <van-nav-bar title="批量代收申请" @click-left="onClickLeft" left-arrow :border="false"></van-nav-bar>
    <div class="batchPayList">
      <div class="addBtn">
        <h3>代收列表</h3>
        <van-button type="info" @click="addUser">添加</van-button>
      </div>
      <van-form ref="form">
        <div class="listContent" v-for="(item,index) in batchVoList" :key="index">
          <van-button
            icon="cross"
            type="danger"
            round
            class="closeBtn"
            v-if="index !== 0"
            @click="removeuser(index)"
          />
          <van-field
            v-model="item.name"
            placeholder="请输入"
            label="姓名 "
            label-align="left"
            input-align="right"
            required
            style=" background: #f6f6f6;"
            @input="count"
          />
          <van-field
            v-model="item.bankCard"
            placeholder="请输入"
            label="银行卡号 "
            label-align="left"
            input-align="right"
            required
            style="background: #f6f6f6;"
          />
          <van-field
            v-model="item.money"
            placeholder="请输入"
            label="发放金额 "
            label-align="left"
            input-align="right"
            @input="getSum"
            required
            style="background: #f6f6f6;"
          />
          <van-field
            v-model="item.memo"
            rows="2"
            autosize
            label="附言"
            type="textarea"
            input-align="right"
            placeholder="请输入"
            style="background: #f6f6f6;"
          />
        </div>
      </van-form>
    </div>
    <div class="applyBox" @click="count">
      <van-field
        v-model="userInfo.applyReceiveDate"
        label="申请发款日期"
        placeholder="请选择"
        label-align="left"
        input-align="right"
        right-icon="calender-o"
        readonly
        required
        @click="showPopFn"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="confirmFn()"
          @cancel="cancelFn()"
        />
      </van-popup>
      <van-field v-model="userInfo.allCount" label="发款人数 " input-align="right" label-align="left" readonly/>
      <van-field v-model="userInfo.allAmount" label="发款总额 " input-align="right" label-align="left" readonly/>
      <van-field :value="'大写: ' + zhuanhua(userInfo.allAmount)" readonly style="background-color: beige;"/>
    </div>
    <div style="margin:2rem 0 1rem 0; padding:0 1rem;;" class="btns">
      <van-button
        type="info"
        size="large"
        @click="submitApproval"
        style="border-radius: 1vw;height: 12vw;line-height: 12vw;"
      >提交审批</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {
    
  },
  data() {
    return {
      batchVoList: [
        {
          name: "",
          bankCard: "",
          money: "",
          memo: ""
        }
      ],
      userInfo: {
        applyReceiveDate: '',
        allCount:1,
        allAmount:0
      },
      show: false,
      sum:0,
      currentDate: "",
      userNum: "",
      total: "",
      countsmoney:''
    };
  },
  created() {
  },
  methods: {
    count() {
      this.batchVoList.forEach((i)=>{
        if(this.batchVoList.length==1){
          if(i.money) {
            this.userInfo.allAmount = i.money
          }else{
            this.userInfo.allAmount = 0
          }
          if(i.name) {
            this.userInfo.allCount=1
          }else{
            this.userInfo.allCount=1
          }
        }else{
            this.userInfo.allCount=this.batchVoList.length
        }
      })

    },
    onClickLeft() {
      this.$router.back();
    },
    getSum() {
      this.userInfo.allAmount = this.batchVoList.reduce((value, item) => {
        return value + Number(item.money);
      }, 0);
    },
    // 添加
    addUser() {
      // let id = Number(this.batchPayList[this.batchPayList.length-1].id) + 1
      this.batchVoList.push({
        name: "",
        bankCard: "",
        money: "",
        memo: ""
      });
      this.userInfo.allCount = this.batchVoList.length
    },
    // 删除
    removeuser(i) {
      this.batchVoList.splice(i, 1);
      this.getSum()
      this.count()
    },
    // 点击提交审批
    submitApproval() {
      this.batchVoList.forEach(item =>{
        if(!item.name || !item.bankCard ||!item.money || !this.userInfo.applyReceiveDate) {
          return this.$toast("请先完整申请信息")
        }else{
          this.submit()
        }
      })
    },
    submit() {
      const res =this.$post({
            url: "/erp/vphonor/app/auditRule/saveAuditRecordReceiveBatch",
            data: {
              allAmount: this.userInfo.allAmount,
              allCount: this.userInfo.allCount,
              batchVoList:this.batchVoList
            }
          })
          if(res.err==false) {
            this.$router.push({ name: "Approval" });
          }else{
            Toast('保存失败');
          }
    },
    // 日期处理函数
    showPopFn() {
      this.show = true;
    },
    confirmFn() {
      this.userInfo.applyReceiveDate = this.timeFormat(this.currentDate);
      this.show = false;
    },
    cancelFn() {
      this.show = false;
    },
    // 时间格式化 2019-09-08
    timeFormat(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    zhuanhua(money) {
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
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
            if (n == '0') {
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
        if (decimalNum != '') {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
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
.batchPayList {
  border-top: 1rem #f6f5f8 solid;
  border-bottom: 1rem #f6f5f8 solid;
  padding: 1rem;
  padding-bottom: 0;
  .addBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h3 {
      margin: 0;
      font-size: 4vw;
    }
    .van-button {
      height: 8vw;
      line-height: 8vw;
    }
  }
  .listContent {
    background: #f6f6f6;
    margin-bottom: 1rem;
    position: relative;
    .closeBtn {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 6vw;
      height: 6vw;
      border-radius: 50%;
      z-index: 100;
      line-height: 6vw;
      padding: 0;
    }
  }
}
.applyBox {
  padding: 0 1rem;
}
/* .van-popup--bottom /deep/.van-picker__frame{
top: 33%;
} */
</style>