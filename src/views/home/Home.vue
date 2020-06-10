<template>
  <div id="home">
    <van-nav-bar title="智企通" :border="false"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="财务OA">
        <div class="finance" @click="jumpApplication">
          <div class="finance_application">
            <span>新申请</span>
            <img src="@/assets/img/application.png" />
          </div>
        </div>
        <div class="finance" @click="jumpApproval">
          <div class="finance_approval">
            <span>我审批的</span>
            <img src="@/assets/img/approval.png" />
          </div>
        </div>
        <div class="finance" @click="jumpSubmit">
          <div class="finance_submit">
            <span>已提交</span>
            <img src="@/assets/img/commited.png" />
          </div>
        </div>
      </van-tab>
      <van-tab title="结算服务">
        <div class="finance" @click="jumpCheck">
          <div class="finance_check">
            <span>余额查询</span>
            <img src="@/assets/img/check balance.png" />
          </div>
        </div>
        <div class="finance" @click="jumpManagement">
          <div class="finance_management">
            <span>交易管理</span>
            <img src="@/assets/img/trade management.png" />
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div style="height:50px;"></div>
    <!-- <div class="home_bottom">
      <div class="tabbar_home">
        <img src="@/assets/img/tab_home page_pre.png" alt="首页" v-if="true" />
        <img src="@/assets/img/tab_home page.png" alt="首页" v-if="false" />
        <span>首页</span>
      </div>
      <div class="tabber_address" @click="jumpFild">
        <img src="@/assets/img/tab_address list.png" alt="通讯录" v-if="true" />
        <img src="@/assets/img/tab_address list_pre.png" alt="通讯录" v-if="false" />
        <span>通讯录</span>
      </div>
    </div>-->
    <van-tabbar v-model="currentSele" route>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? homeImage.active : homeImage.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/addressBook">
        <span>通讯录</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? addressImage.active : addressImage.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script type = 'text/javascript'>
// import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: "HomePage",
  msg:'',
  components: {},
  data() {
    return {
      active: 0,
      currentSele: 0,
      homeImage: {
        active: require("@/assets/img/tab_home page_pre.png"),
        inactive: require("@/assets/img/tab_home page.png")
      },
      addressImage: {
        active: require("@/assets/img/tab_address list_pre.png"),
        inactive: require("@/assets/img/tab_address list.png")
      }
    };
  },
  created() {
    this.getRequest()
    this.getToken()
  },
  methods: {
    // 获取token
    getToken() {
        let msg = this.getRequest().msg
        let eid = this.getRequest().enterpriseId
        let uid = this.getRequest().userId
        window.localStorage.setItem('app_eid',eid)
        window.localStorage.setItem('app_uid',uid)
        this.$get({
          url: "/erp/admin/login",
          params: {
            msg: msg
          }
        }).then(res => {
          window.localStorage.setItem("app_token", res.responseObject.token);
        })
      },
    getRequest() {
      var url = window.location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1).split("&");
        for(var i = 0; i < str.length; i ++) {
          
          theRequest[str[i].split("=")[0]]=decodeURI(str[i].split("=")[1]);
          
        }
      }
      return theRequest;
    },
    //新申请
    jumpApplication() {
      this.$router.push({ name: "Application" });
    },
    //我审批的
    jumpApproval() {
      this.$router.push({ name: "Approval" });
    },
    //已提交
    jumpSubmit() {
      this.$router.push({ name: "Submit" });
    },
    //余额查询
    jumpCheck() {
      this.$router.push({ name: "Check" });
    },
    //交易管理
    jumpManagement() {
      this.$router.push({ name: "Management" });
    },
    //通讯录
    jumpFild() {
      this.$router.push({ name: "Fild" });
    } 
  }
}
    
</script>

<style lang="scss" scoped>
/*iPhoneX的适配*/
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .box {
    .top-box {
      padding-top: 50px;
    }
    //轮播
    .banner-box {
      margin-top: 94px;
    }
    .information-box {
      margin-bottom: 90px;
    }
  }
}
.van-nav-bar__title {
  font-weight: bold;
}
.van-nav-bar .van-icon {
  color: #000;
}
.home_header {
  display: flex;
  .van-icon {
    padding: 22px 0 0 15px;
  }
}
.home_bottom {
  background: rgba(247, 247, 250, 1);
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  img {
    width: 20px;
    height: 20px;
  }
  span {
    display: block;
    font-size: 2.467vw;
  }
  .tabbar_home {
    width: 30px;
    text-align: center;
  }
  .tabber_address {
    width: 30px;
    text-align: center;
  }
}
.finance {
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-indent: 2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  img {
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  span {
    line-height: 160px;
  }
  .finance_application {
    margin: 10px 15px;
    height: 160px;
    background: linear-gradient(to right, #ae92ff, #7659ff);
    border-radius: 4px;
    position: relative;
  }
  .finance_approval {
    margin: 10px 15px;
    height: 160px;
    background: linear-gradient(to right, #ffd84b, #ffaf24);
    border-radius: 4px;
    position: relative;
  }
  .finance_submit {
    margin: 10px 15px;
    height: 160px;
    background: linear-gradient(to right, #fc996a, #ff5124);
    border-radius: 4px;
    position: relative;
  }
  .finance_check {
    margin: 10px 15px;
    height: 160px;
    background: linear-gradient(to right, #fd9779, #e80e59);
    border-radius: 4px;
    position: relative;
  }
  .finance_management {
    margin: 10px 15px;
    height: 160px;
    background: linear-gradient(to right, #26f0eb, #206bfe);
    border-radius: 4px;
    position: relative;
  }
}
</style>
