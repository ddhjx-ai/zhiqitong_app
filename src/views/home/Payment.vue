<template>
  <div id="homePayment">
    <div class="home_header">
      <van-nav-bar title="实时付款申请" left-arrow @click-left="$router.back()" />
    </div>
    <div>
      <van-form ref="form">
        <van-field v-model="form.payeeName" required placeholder="请输入" label="收款人全称" />
        <van-radio-group v-model="form.payeeType" direction="horizontal">
          <span class="radiotitle">
            <span style="color:red;margin-left:-7px;">*</span>收款人类型
          </span>
          <span class="radioselect">
            <van-radio name="1" icon-size="15px">个人</van-radio>
            <van-radio name="2" icon-size="15px">企业</van-radio>
          </span>
        </van-radio-group>
        <!-- <van-field v-model="form.payeeBankName" required placeholder="请输入" label="收款人开户行" /> -->
        <van-field
          @focus="select1 = true"
          is-link
          required
          label="收款人开户行"
          placeholder="请选择一张银行卡"
          v-model="form.payeeBankName"
          readonly
        />
        <van-action-sheet
          v-model="select1"
          :round="false"
          :actions="bankList"
          cancel-text="取消"
          @select="selectCard"
        />
        <van-field v-model="form.payeeBankNumber" required placeholder="请输入" label="收款人银行账号" />
        <van-field v-model="form.payAmount" label="收款金额" placeholder="请输入" required />
        <van-field
          :value="'大写: ' + zhuanhua(form.payAmount)"
          readonly
          style="background-color: beige;"
        />
        <van-field
          v-model="form.payDate"
          label="支付日期"
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
        <van-field
          v-model="form.payUsage"
          required
          placeholder="请输入"
          label="支付用途"
        />
        <van-field
          v-model="form.payMemo"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="100"
          placeholder="请输入"
          show-word-limit
        />
        <!-- 添加附件 -->
        <van-cell title="附件：" value="请添加" is-link @click="showPhoto=true"></van-cell>
        <van-popup v-model="showPhoto" position="bottom" :style="{ height: '30%' }">
          <input
            type="file"
            accept="image/*"
            capture="camera"
            ref="cameraDOM"
            @change="getCamera"
            style="position: absolute;z-index:1000;width:100%;height:33%;left:0;top:0;opacity: 0;"
          />
          <van-button type="default" block style="height:33.33%;position: relative;">拍照</van-button>
          <van-uploader style="height:33.33%;width:100%" :after-read="onRead" :accept="'image/*'">
            <van-button type="default" block>从相册选择</van-button>
          </van-uploader>
          <van-button type="default" block style="height:33.33%" @click="cancelPhoto">取消</van-button>
        </van-popup>

        <div ref="imgBox" class="imgBox" style="padding-left:4.267vw;padding-top:10px">
          <van-image
            style="width:25vw;height:25vw;margin-right:4.267vw"
            :src="item.content"
            v-for="(item,index) in photoList"
            :key="index"
          />
        </div>
      </van-form>
    </div>
    <!-- <van-button type="info" size="large" style="margin-top: 50px;padding:0 1rem;">提交审批</van-button> -->
    <div style="margin:2rem 0 1rem 0; padding:0 1rem;" class="btns">
      <van-button
        type="info"
        size="large"
        @click="submitApproval()"
        style="border-radius: 1vw;height: 12vw;line-height: 12vw;"
      >提交审批</van-button>
    </div>
  </div>
</template>
<script type = 'text/javascript'>
import { Toast } from "vant";

export default {
  name: "Payment",
  components: {},
  data() {
    return {
      show: false,
      showPhoto: false,
      select1: false,
      currentDate: "",
      form: {
        payeeName: "",
        payeeBankName: "",
        payeeBankNumber: "",
        payAmount: "",
        payeeType: "1",
        payDate: "",
        payUsage: "",
        payMemo: "",
        sysFilePathIdStr: ""
      },
      photoList: [],
      uploadeList: [],
      bankList: []
    };
  },
  created() {
    this.getBankList()
  },
  methods: {
    // 上传图片
    onRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$ImgUpload(formData).then(res => {
        this.uploadeList.push(res.data.responseObject.id);
      });
      if (file.length > 1) {
        this.photoList.push(...file);
      } else {
        this.photoList.push(file);
      }
      this.showPhoto = false;
    },
    // 取消获取附件操作
    cancelPhoto() {
      this.showPhoto = false;
    },
    getchildvalue(data) {
      this.form.payAmount = data;
    },
    // 选择银行卡
    selectCard(val) {
      this.select1 = false;
      this.form.payeeBankName = val.name;
    },
    // 获取银行卡
    getBankList() {
      this.$post({
        url:'/jst/dsf/queryBankCode',
      }).then(res => {
        console.log(res)
        this.bankList = res.data.map(item => {
          return {
            name: item.simple_name,
            simple_name: item.simple_name,
            open_bank: item.open_bank
          };
        });
      })
    },
    // 调取摄像头
    getCamera() {
      this.showPhoto = false;
      let file = this.$refs.cameraDOM.files[0];
      if (!file) return;
      let formData = new FormData();
      formData.append("file", file);
      this.$ImgUpload(formData).then(res => {
        this.uploadeList.push(res.data.responseObject.id);
      });
      // 先基于FildReader进行文件的读取
      let fileExample = new FileReader();
      // 将图片文件转换为 base64 编码
      fileExample.readAsDataURL(file);
      // 转换完成时调用的函数
      fileExample.onload = ev => {
        // 创建新图片
        let IMAGE = new Image();
        IMAGE.style.width = "25vw";
        IMAGE.style.height = "25vw";
        IMAGE.style.marginRight = "16px";
        IMAGE.src = ev.target.result;
        // 新图片创建完成后调用的函数
        IMAGE.onload = () => {
          this.$refs.imgBox.appendChild(IMAGE);
        };
      };
    },
    //提交审批
    async submitApproval() {
      if (this.form.payeeName === "") {
        return this.$toast("请输入收款人姓名");
      }
      if (this.form.payeeBankName === "") {
        return this.$toast("请输入收款人开户行");
      }
      if (this.form.payeeBankNumber === "") {
        return this.$toast("请输入银行账户");
      }
      if (this.form.payAmount === "") {
        return this.$toast("请输入金额");
      }
      if (this.form.payDate === "") {
        return this.$toast("请选择支付日期");
      }
      if (this.form.payUsage === "") {
        return this.$toast("请输入支付用途");
      }
      const res = await this.$post({
        url: "/erp/vphonor/auditRule/saveAuditRecordPayment",
        data: {
          payeeName: this.form.payeeName,
          payeeType: Number(this.form.payeeType),
          payeeBankName: this.form.payeeBankName,
          payeeBankNumber: this.form.payeeBankNumber,
          payAmount: this.form.payAmount,
          payDate: this.form.payDate,
          payUsage: this.form.payUsage,
          payMemo: this.form.payMemo,
          sysFilePathIdStr: this.uploadeList.join(",")
        }
      });
      if (res.err == false) {
        this.$router.push({ name: "Approval" });
      } else {
        Toast("保存失败");
      }
    },
    zhuanhua(money) {
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
    // 日期处理函数
    showPopFn() {
      this.show = true;
    },
    confirmFn() {
      this.form.payDate = this.timeFormat(this.currentDate);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.home_header {
  .van-nav-bar__title {
    font-weight: bold;
    // font-size: 20px;
  }
}
.van-radio-group--horizontal {
  margin-left: 15px;
  color: #323233;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid beige;
}
.van-uploader /deep/.van-uploader__wrapper {
  width: 100%;
  height: 100%;
  .van-uploader__input-wrapper {
    width: 100%;
    height: 100%;
    .van-button--block {
      width: 100%;
      height: 100%;
    }
  }
}
.van-action-sheet{
  max-height: 50%;
}
.radiotitle {
  font-size: 15.5px;
  float: left;
  display: inline-block;
  width: 32%;
  font-size: 3.733vw;
}
.radioselect {
  float: right;
  display: inline-block;
  width: 67%;
  font-size: 3.733vw;
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
<style lang="scss">
#homePayment {
  .van-field__label {
    width: 100px !important;
  }
  .van-field__control {
    text-align: right !important;
  }
}
.radioselect {
  .van-radio--horizontal {
    float: right;
  }
}
</style>