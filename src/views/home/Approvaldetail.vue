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
      <van-field
        :value=" form.simpleType ? (form.simpleType=='1' ? '个人' : '企业') : ''"
        readonly
        label="个人/企业"
      />
      <van-field v-model="form.payeeBankName" readonly label="收款人开户行" />
      <van-field v-model="form.payeeBankNumber" readonly label="收款人银行账户" />
      <van-field
        :value="(form.payAmount ? form.payAmount : '') +  (form.allMoneyChinese ? '('+ form.allMoneyChinese +')' : '') "
        readonly
        label="申请支付金额"
      />
      <van-field v-model="form.payDate" readonly label="支付日期" />
      <van-field v-model="form.payUsage" readonly label="支付用途" />
      <van-field v-model="form.memo" readonly autosize label="备注" />
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
      <van-field
        :value=" form.simpleType ? (form.simpleType=='1' ? '个人' : '企业') : ''"
        readonly
        label="个人/企业"
      />
      <van-field v-model="form.payeeBankName" readonly label="收款人开户行" />
      <van-field v-model="form.payeeBankNumber" readonly label="收款人银行账户" />
      <van-field
        :value="(form.payAmount ? form.payAmount : '') + (form.allMoneyChinese ? '('+  form.allMoneyChinese +')' : '') "
        readonly
        label="申请支付金额"
      />
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
      <van-field
        :value="(form.allAmount ? form.allAmount : '') + (form.allMoneyChinese ? '('+ form.allMoneyChinese +')' : '') "
        readonly
        label="发款总额"
      />
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
      <van-field :value=" form.type ? (form.type=='1' ? '个人' : '企业') : ''" readonly label="个人/企业" />
      <van-field v-model="form.payBankName" readonly label="付款人开户行" />
      <van-field v-model="form.payBankNumber" readonly label="付款人账号" />
      <van-field
        :value="(form.payAmount ? form.payAmount : '') + (form.allMoneyChinese ? '('+  form.allMoneyChinese  +')' : '')"
        readonly
        label="付款金额"
      />
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
      <van-field
        :value="(form.allAmount ? form.allAmount : '') +  (form.allMoneyChinese ? '('+ form.allMoneyChinese +')' : '')"
        readonly
        label="收款总额"
      />
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
          <van-collapse-item :title="item.userOrLevelOrRoleName" :name="index">
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
    <div class="detailtitle">
      <img src="@/assets/img/details_person.png" />
      <span>审核</span>
    </div>
    <van-field
      v-model="suggest"
      autosize
      label="审核意见"
      type="textarea"
      placeholder="请输入审核意见，可不填"
      rows="2"
    />

    <van-field
      v-if="active === processList.length - 2"
      @focus="select1 = true"
      is-link
      label="支付银行卡"
      placeholder="请选择一张银行卡"
      v-model="bankCard"
      readonly
    />
    <van-action-sheet
      v-model="select1"
      :round="false"
      :actions="bankList"
      cancel-text="取消"
      @select="selectCard"
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

    <!-- 付款详情弹出层 -->
    <!-- <div class="maskBox" v-if="show"> -->
      <!-- <div class="topMask" v-if="select2" @click="select2=false"></div> -->
        <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" closeable>
        <div class="tit">付款详情</div>
        <div class="mon">￥{{form.payAmount ? form.payAmount : 0}}元 ({{form.allMoneyChinese}})</div>
        <van-field
          @focus="select2 = true"
          is-link
          label="支付银行卡"
          placeholder="请选择一张银行卡"
          v-model="bankCard"
          readonly
        />
        <van-action-sheet
          :overlay='false'
          v-model="select2"
          :round="false"
          :actions="bankList"
          cancel-text="取消"
          @select="selectCard"
        />

        <van-field v-model="form.value" label="备注" placeholder="请输入备注，可不填" />
        <div style="padding:20px 20px 0;">
          <van-button type="info" size="large" :disabled="!checked" @click="submitSend">同意协议并确认</van-button>
        </div>
        <div style="margin:20px 0;padding-left: 20px;font-size: 4vw;">
          <van-checkbox v-model="checked" shape="square">
            请核对金额，并同意
            <span style="color:#2486FF;">《捷算通资金支付协议》</span>
          </van-checkbox>
        </div>
      </van-popup>
    <!-- </div> -->

    <!-- <div>
      <span style="margin-left: 18px;">附件</span>
      <van-uploader :after-read="afterRead" style="padding-left: 50px;" />
    </div>-->
    <div class="btns" style="display: flex;justify-content: center;padding:25px 0;">
      <van-button size="normal" type="default" @click="$router.back()">返回</van-button>
      <van-button size="normal" type="danger" @click="refuse(0)">拒绝</van-button>
      <van-button type="primary" size="normal" @click="passReview(1)">通过</van-button>
    </div>
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "Approvaldetail",
  components: {},
  data() {
    return {
      select1: false,
      select2: false,
      checked: false,
      simpleId: "", // 审批id
      simpleType: "",
      active: 0,
      showCard: false,
      showPhoto: false,
      show: false,
      bankname: "",
      form: {},
      suggest: "",
      // 流程列表
      processList: [],
      activeNames: ["1"],
      // 银行卡列表
      bankList: [],
      photoList: [],
      bankCard: "",
      title: "", // 不同类型的标题名
      uploadeList: []
    };
  },
  mounted() {
    this.simpleId = this.$route.query.id;
    this.getDetail();
  },
  watch: {},
  methods: {
    // 获取审批详情信息
    async getDetail() {
      let res = await this.$get({
        url: "/erp/vphonor/auditRule/auditDetail",
        params: {
          simpleId: this.simpleId
        }
      });

      this.simpleType = res.responseObject.simpleType;
      this.form = res.responseObject;
      this.processList = res.responseObject.auditProcess;
      if (this.processList) {
        this.active =
          this.processList.filter(item => {
            return item.state == 2;
          }).length - 1;
      }

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

      // console.log(this.active, this.processList.length);
      if (this.active === this.processList.length - 2) {
        let list = await this.$get({
          url: "/erp/vphonor/auditRule/getSettlementParams",
          params: {
            type: res.responseObject.simpleType,
            relationAuditUserId: res.responseObject.relationAuditUserId
          }
        });

        this.bankList = list.responseObject.bankInfo.map(item => {
          return {
            name: `${item.bankName}${item.partCard}  (余额${item.balance}元)`,
            card: item.card,
            balance: item.balance,
            bankName: item.bankName,
            partCard: item.partCard
          };
        });
      }
    },
    // 取消获取附件操作
    cancelPhoto() {
      this.showPhoto = false;
    },
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
    // 选择银行卡
    selectCard(val) {
      this.select1 = false;
      this.select2 = false;
      this.bankCard = val.name;
    },
    // 同意协议并提交
    submitSend() {
      if (this.bankCard === "") {
        return this.$toast("银行卡不能为空");
      }
      this.$post({
        url: "/jst/verify/QRCodeInfo",
        data: {
          userId: "88",
          type: "faceIdBd2",
          imgurl: "",
          imgurl2: "",
          returnUrl: ""
        }
      }).then(res => {
        window.location.href = res.data.url;
      });
    },
    // 拒绝操作
    refuse(state) {
      this.reviewRequest(state);
    },
    // 通过审核
    async passReview(state) {
      let res = await this.checkFinalNode(state);
      if (res.responseObject.isFinalPass) {
        this.show = true;
      } else {
        this.reviewRequest(state);
      }
    },
    // 判断是否是最后一次审批
    async checkFinalNode(state) {
      let res = this.$post({
        url: "/erp/vphonor/auditRule/checkFinalNode",
        data: {
          relationAuditUserId: this.form.relationAuditUserId,
          state: state,
          suggest: this.suggest,
          sysFilePathIdStr: this.uploadeList.join(",")
        }
      });

      return res;
    },
    // 审批请求
    reviewRequest(state) {
      this.$post({
        url: "/erp/vphonor/auditRule/saveAuditSuggest",
        data: {
          relationAuditUserId: this.form.relationAuditUserId,
          state: state,
          suggest: this.suggest,
          sysFilePathIdStr: this.uploadeList.join(",")
        }
      }).then(() => {
        this.$router.back();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
  font-size: 5vw;
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
/* .maskBox {
  position: absolute;
  z-index: 1000000;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background:rgba(0,0,0,.7);
  .topMask{
    position: absolute;
    z-index: 1000000;
    top: 0;
    left: 0;
    height: 50%;
    width: 100%;
    background:rgba(0,0,0,.7);
  }
} */
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
  position: relative;
  .van-dropdown-menu__title {
    margin-left: 250px;
  }
  .van-field__control {
    text-align: right;
  }
}
</style>