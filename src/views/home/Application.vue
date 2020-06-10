<template>
  <div id="home">
    <div class="home_header">
      <van-nav-bar title="新申请" left-arrow @click-left="$router.back()"/>
    </div>
    <div class="finance"  @click="jumpPayment">
        <div class="finance_application">
            <div>
                <span class="lineborder_one"></span>
                <span>实时付款</span>
            </div>
   
         <img src="@/assets/img/icon_1.png">
     </div>
    </div>
    <div class="finance"  @click="jumpCollection">
        <div class="finance_application">
            <div>
                <span class="lineborder_two"></span>
                <span>实时收款</span>
            </div>
         <img src="@/assets/img/icon_2.png">
     </div>
    </div>
    <div class="finance" @click="$router.push({name:'batchPay'})">
        <div class="finance_application">
            <div>
                <span class="lineborder_three"></span>
                <span>批量代付</span>
            </div>
         <img src="@/assets/img/icon_3.png">
     </div>
    </div>
    <div class="finance" @click="$router.push({name:'batchCollect'})">
        <div class="finance_application">
            <div>
                <span class="lineborder_four"></span>
                <span>批量代收</span>
            </div>
         <img src="@/assets/img/icon_4.png">
     </div>
    </div>
  </div>
</template>
<script type = 'text/javascript'>

// import { mapState } from 'vuex'
// import config from '@/config'

  export default {
    name: 'Application',
    components: {
      
    },
    data() {
      return {

      }
    },
    methods: {
      //实时付款申请
      jumpPayment() {
        this.$router.push({ name: 'Payment' })
      },
      //实时收款申请
      jumpCollection() {
        this.$router.push({ name: 'Collection' })
      }
    }
    
  }

</script>

<style lang="scss" scoped>
.van-nav-bar__title{
  font-weight: bold;
}
.van-nav-bar .van-icon{
  color: #000;
}
.home_header {
  .van-nav-bar__title {
    font-weight: bold;
    font-size: 20px;
  }
}
.finance {
  color: #000000;
  font-weight: bold;
  font-size: 20px;
  text-indent: 2rem;
  font-family:PingFangSC-Medium,PingFang SC;
  img {
      width: 65px;
      height: 65px;
      position: absolute;
      bottom: 20px;
      right: 0px;
    }
  span {
    line-height: 110px;
    font-size: 18px;
  }
  .finance_application {
    margin: 10px 15px;
    height: 110px;
    border-radius: 4px;
    position: relative;
    box-shadow:0px 5px 20px 0px rgba(0,98,255,0.15);
    .lineborder_one {
        width: 26px;
        height: 2px;
        background-color: #30A4FF;
        display: block;
        position: absolute;
        top: 38px;
        left: 32px;
    }
    .lineborder_two {
        width: 26px;
        height: 2px;
        background-color: #7658FF;
        display: block;
        position: absolute;
        top: 38px;
        left: 32px;
    }
    .lineborder_three {
        width: 26px;
        height: 2.5px;
        background-color: #FFB126;
        display: block;
        position: absolute;
        top: 38px;
        left: 32px;
    }
    .lineborder_four {
        width: 26px;
        height: 2.5px;
        background-color: #FF5124;
        display: block;
        position: absolute;
        top: 38px;
        left: 32px;
    }
  }
}

</style>