<template>
  <div id="homedetail">
    <van-nav-bar :title="title" left-arrow @click-left="$router.back()" />
    <div class="jiange"></div>
    <div class="detailtitle">
      <img src="@/assets/img/details_approval.png" />
      <span>{{title}}</span>
    </div>
    <div class="detailone" v-if="simpleType == 0">
      <van-field v-model="form.auditNo" readonly label="审批编号" />
      <van-field v-model="form.applyTime" readonly label="申请时间" />
      <van-field v-model="form.applyUserName" readonly label="申请人" />
      <van-field v-model="form.dept" readonly label="所在部门" />
      <van-field v-model="form.payeeName" readonly label="收款人全称" />
      <van-field :value=" form.simpleType ? (form.simpleType=='1' ? '个人' : '企业') : ''" readonly label="个人/企业" />
      <van-field v-model="form.payeeBankName" readonly label="收款人开户行" />
      <van-field v-model="form.payeeBankNumber" readonly label="收款人银行账户" />
      <van-field v-model="form.payAmount" readonly label="申请支付金额" />
      <van-field v-model="form.payDate" readonly label="支付日期" />
      <van-field v-model="form.payUsage" readonly label="支付用途" />
      <van-field v-model="form.payMemo" readonly autosize label="备注" />
      <div class="fujian">
        <div>附件</div>
        <a
          :href="val.url"
          style="font-weight:bold;color:#0062ff;margin-right:10px;"
          v-for="(val,k) in form.file"
          :key="k"
        >{{val.originName}}</a>
      </div>
    </div>
    <div class="detailone" v-if="simpleType == 1">
      <van-field v-model="form.auditNo" readonly label="审批编号" />
      <van-field v-model="form.applyTime" readonly label="申请时间" />
      <van-field v-model="form.applyUserName" readonly label="申请人" />
      <van-field v-model="form.dept" readonly label="所在部门" />
      <van-field v-model="form.payeeName" readonly label="收款人全称" />
      <van-field :value=" form.simpleType ? (form.simpleType=='1' ? '个人' : '企业') : ''" readonly label="个人/企业" />
      <van-field v-model="form.payeeBankName" readonly label="收款人开户行" />
      <van-field v-model="form.payeeBankNumber" readonly label="收款人银行账户" />
      <van-field v-model="form.payAmount" readonly label="申请支付金额" />
      <van-field v-model="form.payDate" readonly label="支付日期" />
      <van-field v-model="form.payUsage" readonly label="支付用途" />
      <van-field v-model="form.payMemo" readonly autosize label="备注" />
      <div class="fujian">
        <div>附件</div>
        <a
          :href="val.url"
          style="font-weight:bold;color:#0062ff;margin-right:10px;"
          v-for="(val,k) in form.file"
          :key="k"
        >{{val.originName}}</a>
      </div>
    </div>
    <div class="detailone" v-if="simpleType == 2">
      <van-field v-model="form.auditNo" readonly label="审批编号" />
      <van-field v-model="form.applyTime" readonly label="申请时间" />
      <van-field v-model="form.applyUserName" readonly label="申请人" />
      <van-field v-model="form.dept" readonly label="所在部门" />
      <div class="van-cell">
        <div class="van-cell__title">代发列表</div>
        <div class="van-cell__value" v-if="form.excelInfo">
          <a :href="form.excelInfo.url">{{form.excelInfo.originName}}</a>
        </div>
      </div>
      <van-field v-model="form.allCount" readonly label="发款人数" />
      <van-field v-model="form.allAmount" readonly label="发款总额" />
      <van-field v-model="form.applyPayDate" readonly label="申请发款日期" />
      <van-field v-model="form.memo" readonly label="备注" />
      <div class="fujian">
        <div>附件</div>
        <a
          :href="val.url"
          style="font-weight:bold;color:#0062ff;margin-right:10px;"
          v-for="(val,k) in form.file"
          :key="k"
        >{{val.originName}}</a>
      </div>
    </div>
    <div class="detailone" v-if="simpleType == 3">
      <van-field v-model="form.auditNo" readonly label="审批编号" />
      <van-field v-model="form.applyTime" readonly label="申请时间" />
      <van-field v-model="form.applyUserName" readonly label="申请人" />
      <van-field v-model="form.dept" readonly label="所在部门" />
      <van-field v-model="form.payName" readonly label="付款人全称" />
      <van-field :value=" form.type ? (form.type == '1' ? '个人' : '企业') : ''" readonly label="个人/企业" />
      <van-field v-model="form.payBankName" readonly label="付款人开户行" />
      <van-field v-model="form.payBankNumber" readonly label="付款人账号" />
      <van-field v-model="form.payAmount" readonly label="付款金额" />
      <van-field v-model="form.reason" readonly label="收取理由" />
      <van-field v-model="form.applyPayDate" readonly label="备注" />
      <div class="fujian">
        <div>附件</div>
        <a
          :href="val.url"
          style="font-weight:bold;color:#0062ff;margin-right:10px;"
          v-for="(val,k) in form.file"
          :key="k"
        >{{val.originName}}</a>
      </div>
    </div>
    <div class="detailone" v-if="simpleType == 4">
      <van-field v-model="form.auditNo" readonly label="审批编号" />
      <van-field v-model="form.applyTime" readonly label="申请时间" />
      <van-field v-model="form.applyUserName" readonly label="申请人" />
      <van-field v-model="form.dept" readonly label="所在部门" />
      <div class="van-cell">
        <div class="van-cell__title">代收列表</div>
        <div class="van-cell__value" v-if="form.excelInfo">
          <a :href="form.excelInfo.url">{{form.excelInfo.originName}}</a>
        </div>
      </div>
      <van-field v-model="form.allCount" readonly label="收款人数" />
      <van-field v-model="form.allAmount" readonly label="收款总额" />
      <van-field v-model="form.applyReceiveDate" readonly label="申请代收日期" />
      <van-field v-model="form.memo" readonly label="备注" />
      <div class="fujian">
        <div>附件</div>
        <a
          :href="val.url"
          style="font-weight:bold;color:#0062ff;margin-right:10px;"
          v-for="(val,k) in form.file"
          :key="k"
        >{{val.originName}}</a>
      </div>
    </div>
    <div class="jiange"></div>
    <div class="detailtitle">
      <img src="@/assets/img/details_process.png" />
      <span>审批流程</span>
    </div>
    <van-steps :active="active" direction="vertical">
      <van-step v-for="(item,index) in processList" :key="index">
        <van-collapse v-model="activeNames">
          <van-collapse-item :name="index">
            <template slot="title">
              <div style="display:flex; justify-content: space-between;">
                {{item.userOrLevelOrRoleName}}
                <span
                  v-if="item.state==0"
                  style="color:grey;font-weight:bold;"
                >未轮到</span>
                <span v-if="item.state==1" style="color:#0062FF;font-weight:bold;">审核中</span>
                <span v-if="item.state==2" style="color:#3DD598;font-weight:bold;">通过</span>
                <span v-if="item.state==3" style="color:#F11A45;font-weight:bold;">已驳回</span>
              </div>
            </template>
            <p>审批时间：{{item.obj[0].auditTime}}</p>
            <p>审批意见：{{item.obj[0].suggest}}</p>
            <p>
              附件：
              <a
                style="color:rgba(0,98,255,1);margin-right:10px;"
                :href="val.url"
                v-for="(val,k) in item.obj[0].fileRspList"
                :key="k"
              >{{val.originName}}</a>
            </p>
          </van-collapse-item>
        </van-collapse>
      </van-step>
    </van-steps>
    <div class="jiange"></div>
    <!-- <div class="detailtitle">
      <img src="@/assets/img/details_cc.png" />
      <span>付款信息</span>
    </div>
    <van-tag color="background:rgba(0,98,255,1);" size="medium">方过（总裁）</van-tag>
    <van-tag color="background:rgba(0,98,255,1);" size="medium">方过（总裁）</van-tag>-->
    <div style="padding: 20px;">
      <van-button size="large" type="info" @click="$router.back()">返回</van-button>
    </div>
  </div>
</template>
<script type = 'text/javascript'>
export default {
  name: "Managedetail",
  components: {},
  data() {
    return {
      simpleId: "", // 审批id
      simpleType: "", // 审批类型
      title: "",
      active: 0,
      show: false,
      form: {},
      activeNames: ["1"],
      processList: []
    };
  },
  mounted() {
    this.simpleId = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    // 获取审批详情信息
    getDetail() {
      this.$get({
        url: "/erp/vphonor/auditRule/auditDetail",
        params: {
          simpleId: this.simpleId
        }
      }).then(res => {
        this.form = res.responseObject;
        this.processList = res.responseObject.auditProcess;
        this.simpleType = res.responseObject.simpleType;

        switch (this.simpleType) {
          case 1:
            this.title = "实时付款审批";
            break;
          case 2:
            this.title = "批量付款审批";
            break;
          case 3:
            this.title = "实时收款审批";
            break;
          case 4:
            this.title = "批量收款审批";
            break;
        }

        if (this.processList) {
          this.active =
            this.processList.filter(item => {
              return item.state == 2;
            }).length - 1;
        }
      });
    },
    showPopup() {
      this.show = true;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    returnbank(bankcard) {
      console.log(bankcard);
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.fujian {
  // display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 2.667vw 4.267vw;
  overflow: hidden;
  color: #323233;
  font-size: 3.733vw;
  line-height: 6.4vw;
  background-color: #fff;
}
.detailtitle {
  font-size: 4vw;
  display: flex;
  img {
    width: 29px;
    height: 29px;
    margin: 10px;
  }
  span {
    line-height: 51px;
    font-weight: bold;
  }
}
.jiange {
  height: 10px;
  width: 100%;
  background: rgba(245, 245, 245, 1);
}
.van-nav-bar__title {
  font-weight: bold;
}
.van-nav-bar /deep/.van-icon {
  color: #000;
}
.van-tag--default {
  margin: 0 0 15px 15px;
}
.detaillist {
  .van-cell__title,
  .van-cell__value {
    text-align: center;
  }
}
.card {
  display: flex;
  justify-content: space-between;
  color: #323233;
  padding: 10px 0;
  font-size: 3.733vw;
  .card1 {
    padding-left: 15px;
  }
  .card2 {
    padding-right: 15px;
  }
}
</style>
<style lang="scss">
.detailone {
  .van-field__label {
    width: 100px !important;
  }
  .van-field__control {
    text-align: right !important;
  }
}
</style>