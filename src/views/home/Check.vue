<template>
  <div id="home">
    <div class="bgcheader">
      <div class="home_header">
        <van-icon name="arrow-left"  @click-left="$router.back()"/><span class="tabtitle">余额查询</span>
      </div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <div class="count">余额合计</div>
      <div class="money">￥<span style="font-size:20px;font-weight: bold;">200000</span>(贰拾万元)</div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell
                    style="margin-bottom: 15px"
                    v-for="(item,index) in list"
                    :key="index"
                >
                    <div class="tabs_header">
                        <p class="tabs_header_left">企业<span class="tabs_header_right">{{item.a}}</span></p>
                    </div>
                    <p>
                        <span class="tabs_header_left">户名</span>
                        <span class="tabs_header_right">{{item.b}}</span>
                        </p>
                    <p>
                        <span class="tabs_header_left">账号</span>
                        <span class="tabs_header_right">{{item.c}}</span>
                    </p>
                    <p>
                        <span class="tabs_header_left">余额</span>
                        <span class="tabs_header_right">{{item.c}}</span>
                    </p>
                </van-cell>
            </van-list>
            
  </div>
</template>
<script type = 'text/javascript'>

// import { mapState } from 'vuex'
// import config from '@/config'

  export default {
    name: 'Check',
    components: {
      
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        orderTotal:0,
        currentPage: 1,
        size: 10,
        active: 0,
        value1:0,
         option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
        form:{
            value1:'',

        },
      }
    },
    created() {
      this.getDataList()
    },
    methods: {
        onLoad() {
            this.currentPage++
            this.getDataList()
        },
        async getDataList() {
            const res = await this.$get({
              // url: "/vphonor/settlement/tradeRecordList",
              params: {
                currentPage: this.currentPage,
                size: this.size
              }
            })
            if(res.err==false) {
              this.list.push(...res.responseObject.iPage.records)
              this.orderTotal = +res.responseObject.iPage.total
              if (this.list.length >= this.orderTotal) {
                this.finished = true
              }
            }else{
              this.finished = true
            }
            this.loading = false
        },
    }
    
  }

</script>

<style lang="scss" scoped>
.van-dropdown-menu {
  margin: 0 20px;
  height: 45px;
  border-radius: 4px;
  background: rgba(255,255,255,0.2);
}
.home_header {
  padding: 15px 15px;
  .tabtitle {
    text-align: center;
    width: 90%;
    display: inline-block;
  }
}
.tabs_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: -15px;
}
.tabs_header_left {
    width: 200px;
    .sqr {
        width:61.39px;
        text-align:right;
        display:inline-block
    }
}
.tabs_header_right {
    display: inline-block;
    margin-left: 20px;
}
.seachSelect {
    width: 91%;
    height: 36px;
    border-radius: 3px;
    margin: auto;
    background:rgba(255,255,255,0.2);
    color: white;
}
.bgcheader {
  background: linear-gradient(to bottom, #206BFE,#26F0EB);
  color: white;
}
.count {
    margin: 42px 20px 10px;
}
.money {
  margin-left: 19px;
  padding-bottom: 42px;
}
.van-list {
  border-radius: 3px;
  margin: 10px 20px;
  border: 1px solid grey;
}
</style>
<style lang="scss">
.bgcheader {
  .van-dropdown-item--down {
    margin: 0 22px;
  }
  .van-ellipsis {
    color: white;
    margin-left: -145px;
  }
  .van-dropdown-menu__title {
    padding: 0 37.133vw;
  }
  .van-dropdown-menu__title::after {
    color: white;
  }
}

</style>