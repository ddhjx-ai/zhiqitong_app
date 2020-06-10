<template>
  <div id="home">
    <van-nav-bar title="我审批的" left-arrow @click-left="$router.back()" />
    <van-search
      v-model="auditNameOrUserName"
      placeholder="请输入发起人、审批类型"
      @search="searchName(auditNameOrUserName)"
    />
    <van-tabs v-model="active" @change="changeList(active)">
      <van-tab title="待处理">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-cell
              style="margin-bottom: 15px"
              v-for="(item,index) in list"
              :key="index"
              @click="jumpApprovalDetail(item.simpleId)"
            >
              <div class="tabs_header">
                <p class="tabs_header_left" style="width:100%;display:flex">
                  <span class="sqr">申请人</span>
                  <span class="tabs_header_right" style="flex:1;">{{item.userName}}</span>
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
          </van-pull-refresh>
        </van-list>
      </van-tab>
      <van-tab title="已处理">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-cell
              style="margin-bottom: 15px"
              v-for="(item,index) in list"
              :key="index"
              @click="jumpManageDetail(item.simpleId)"
            >
              <div class="tabs_header">
                <p class="tabs_header_left" style="width:100%;display:flex">
                  <span class="sqr">申请人</span>
                  <span class="tabs_header_right" style="flex:1;">{{item.userName}}</span>
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
          </van-pull-refresh>
        </van-list>
      </van-tab>
      <van-tab title="抄送我">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-cell
              style="margin-bottom: 15px"
              v-for="(item,index) in list"
              :key="index"
              @click="jumpCcDetail(item.simpleId)"
            >
              <div class="tabs_header">
                <p class="tabs_header_left" style="width:100%;display:flex">
                  <span class="sqr">申请人</span>
                  <span class="tabs_header_right" style="flex:1;">{{item.userName}}</span>
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
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "Approval",
  components: {},
  filters: {},
  data() {
    return {
      ingImg: require("@/assets/img/ing.png"),
      rejectImg: require("@/assets/img/reject.png"),
      passImg: require("@/assets/img/pass.png"),
      withdrawImg: require("@/assets/img/withdraw.png"),
      list: [],
      loading: false,
      finished: false,
      flag: false,
      isLoading: false,
      state: 0,
      active: 0,
      currentPage: 1,
      size: 5,
      form: {
        value: ""
      },
      auditNameOrUserName: ""
    };
  },
  mounted() {
    /* this.getDaiList();
    this.getYiList();
    this.getChaoList(); */
    this.getDataList();
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.currentPage = 1;
      this.list = [];
      this.finished = false;
      this.auditNameOrUserName = "";
      this.getDataList();
      this.isLoading = false;
    },
    onLoad() {
      this.getDataList(this.currentPage + 1);
    },
    // 切换列表
    changeList(status) {
      this.auditNameOrUserName = "";
      this.list = [];
      this.state = status;
      this.loading = false;
      this.finished = false;
      this.flag = false;
      this.isLoading = false;
      this.currentPage = 1;
      this.getDataList();
    },
    // 待处理列表
    getDataList(page = 1) {
      if (!this.flag) {
        let currentList = [];
        this.currentPage = page;
        this.flag = true;
        this.$get({
          url: "/erp/vphonor/auditRule/myAuditRecord",
          params: {
            size: this.size,
            currentPage: this.currentPage,
            /* userId: window.localStorage.getItem("app_uid"),
            enterpriseId: window.localStorage.getItem("app_eid"),  */
            userId:86,
          enterpriseId:77,
            state: this.state,
            auditNameOrUserName: this.auditNameOrUserName
          }
        }).then(res => {
          if (!res.err) {
            if (this.currentPage == 1) {
              currentList = res.responseObject.iPage.records;
            } else {
              currentList = this.list.concat(res.responseObject.iPage.records);
            }
            this.loading = false;
            this.flag = false;
          } else {
            this.$toast("数据未获取成功");
          }
          if (res.responseObject.iPage.records.length < this.size) {
            this.finished = true;
          }
          this.list = currentList;
        });
      } else {
        return;
      }
    },
    // 根据指定内容获取列表
    searchName(val) {
      this.auditNameOrUserName = val;
      this.getDataList(1);
    },
    //待处理
    jumpApprovalDetail(id, auditRuleType) {
      this.$router.push({
        name: "Approvaldetail",
        query: { id, auditRuleType }
      });
    },
    //已处理
    jumpManageDetail(id, auditRuleType) {
      this.$router.push({ name: "Managedetail", query: { id, auditRuleType } });
    },
    //抄送我
    jumpCcDetail(id, auditRuleType) {
      this.$router.push({ name: "Ccdetail", query: { id, auditRuleType } });
    }
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
  font-weight: bold;
}
.van-nav-bar /deep/.van-icon {
  color: #000;
}

.tabs_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: -15px;
}
.tabs_header_left {
  width: 200px;
  .sqr {
    width: 55px;
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