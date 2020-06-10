<template>
  <div id="homedetail">
    <van-nav-bar :title="title" left-arrow @click-left="$router.back()" />
    <div class="jiange"></div>
    <div class="detailtitle">
      <img src="@/assets/img/details_approval.png" />
      <span>{{title}}</span>
    </div>
    <div class="detailone">
      <van-field v-model="form.auditNo" readonly label="审批编号" />
      <van-field v-model="form.applyTime" readonly label="申请时间" />
      <van-field v-model="form.applyUserName" readonly label="申请人" />
      <van-field v-model="form.dept" readonly label="所在部门" />
      <van-field v-model="form.payName" readonly label="收款人全称"  v-if="form.simpleType==3"/>
      <van-field v-model="form.payeeName" readonly label="收款人全称"  v-if="form.simpleType==1"/>
      <van-field :value="form.simpleType=='1' ? '个人' : '企业'" readonly label="个人/企业" />
      <van-field v-model="form.payBankName" readonly label="收款人开户行" v-if="form.simpleType==3"/>
      <van-field v-model="form.payeeBankName" readonly label="收款人开户行" v-if="form.simpleType==1"/>
      <van-field v-model="form.payBankNumber" readonly label="收款人银行账户" v-if="form.simpleType==3"/>
      <van-field v-model="form.payeeBankNumber" readonly label="收款人银行账户" v-if="form.simpleType==1"/>
      <van-field v-model="form.payAmount" readonly label="申请收取金额" v-if="form.simpleType==3"/>
      <van-field v-model="form.payAmount" readonly label="申请支付金额"  v-if="form.simpleType==1"/>
      <van-field v-model="form.reason" readonly label="收取理由" v-if="form.simpleType==3"/>
      <van-field v-model="form.payDate" readonly label="支付日期" v-if="form.simpleType==1"/>
      <van-field v-model="form.payUsage" readonly label="支付用途" v-if="form.simpleType==1"/>
      <van-field v-model="form.memo" readonly autosize label="备注" />
      <div class="fujian">
        <div>附件</div>
        <a
          :href="val.url"
          style="font-weight:bold;color:#0062ff"
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
          <van-collapse-item :title="item.userOrLevelOrRoleName" :name="index">
            <template slot="title">
              <div style="display:flex; justify-content: space-between;">
                {{item.userOrLevelOrRoleName}}
                <span v-if="item.state==0" style="color:grey">未轮到</span>
                <span v-if="item.state==1" style="color:#0062FF">审核中</span>
                <span v-if="item.state==2" style="color:#3DD598">通过</span>
                <span v-if="item.state==3" style="color:#F11A45">已驳回</span>
              </div>
            </template>
            <p>审批时间：{{item.obj[0].auditTime}}</p>
            <p>审批意见：{{item.obj[0].suggest}}</p>
            <p>
              附件：
              <a
                style="color:rgba(0,98,255,1)"
                :href="item.url"
                v-for="(item,index) in item.obj[0].fileRspList"
                :key="index"
              >{{item.originName}}</a>
            </p>
          </van-collapse-item>
        </van-collapse>
      </van-step>
    </van-steps>
    <div class="jiange"></div>
    <!-- <div class="detailtitle">
      <img src="@/assets/img/details_cc.png" />
      <span>抄送</span>
    </div>
    <van-tag color="background:rgba(0,98,255,1);" size="medium">方过（总裁）</van-tag>
    <van-tag color="background:rgba(0,98,255,1);" size="medium">方过（总裁）</van-tag> -->

    <div class="btns" style="display: flex;justify-content: center;padding:25px 0;">
      <van-button size="normal" type="info" @click="$router.back()">返回</van-button>
    </div>
    
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "Submitdetail",
  components: {},
  data() {
    return {
      simpleId: "", // 审批id
      active: 0,
      show: false,
      bankname: "",
      form: {},
      approvalForm: {
        advice: "",
        bankCard: ""
      },
      // 流程列表
      processList: [],
      activeNames: ["1"],
      photoList: [],
      title: ''
    };
  },
  created() {
    this.simpleId = this.$route.query.simpleId;
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
        // this.processList.forEach(i=>{
        //   if(i.state==1) {
        //     i.state='审核中'
        //   }else if(i.state==0){
        //     i.state='未轮到'
        //   }else if(i.state==2){
        //     i.state='通过'
        //   }else if(i.state==3){
        //     i.state='已驳回'
        //   }
        // })
        this.active =
          this.processList.filter(item => {
            return item.state == 2;
          }).length - 1;
      });
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.detailtitle {
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
.btns .van-button--normal {
  width: 25vw;
  margin-left: 5vw;
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
.tit {
  text-align: center;
  margin-top: 20px;
  z-index: 99999;
}
.mon {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  z-index: 99999;
}
/* .van-picker {
  margin-top: -89px;
} */
.bank {
  display: inline-block;
  text-align: right;
  width: 65%;
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
#homedetail {
  .van-dropdown-menu__title {
    margin-left: 250px;
  }
  .van-field__control {
    text-align: right;
  }
}
</style>