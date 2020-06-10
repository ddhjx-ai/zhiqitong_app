<template>
  <div id="home">
    <div class="home_header">
      <van-nav-bar title="交易管理" left-arrow @click-left="$router.back()"/>
    </div>
    <van-search v-model="form.value" placeholder="请输入交易发起人" />
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell
                    style="margin-bottom: 15px"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="jumpManagementdetail(item.id)"
                >
                    <div class="tabs_header">
                        <p class="tabs_header_left">类型<span class="tabs_header_right">{{item.type}}</span></p>
                        <p style="color:#0062FF">{{item.tradeState}}</p>
                    </div>
                    <p>
                        <span class="tabs_header_left">发起</span>
                        <span class="tabs_header_right">{{item.userName}}</span>
                        </p>
                    <p>
                        <span class="tabs_header_left">金额</span>
                        <span class="tabs_header_right">{{item.allAmount}}</span>
                    </p>
                    <p>
                        <span class="tabs_header_left">时间</span>
                        <span class="tabs_header_right">{{item.modifyTime}}</span>
                    </p>
                </van-cell>
            </van-list>
  </div>
</template>
<script type = 'text/javascript'>

// import { mapState } from 'vuex'
// import config from '@/config'

  export default {
    name: 'Management',
    components: {
      
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        active: 0,
        orderTotal:0,
        currentPage: 1,
        size: 10,
        form:{
            value:''
        }
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
              url: "/vphonor/settlement/tradeRecordList",
              params: {
                currentPage: this.currentPage,
                size: this.size
              }
            })
            if(res.err==false) {
              this.list.push(...res.responseObject.iPage.records)
              this.orderTotal = +res.responseObject.iPage.total
              this.list.forEach(it=>{
                if(it.type==1) {
                  it.type='实时付款'
                }else if(it.type==2) {
                  it.type='批量付款'
                }else if(it.type==3) {
                  it.type='实时收款'
                }else{
                  it.type='批量收款'
                }
                if(it.tradeState==1) {
                  it.tradeState='银行处理中'
                }else if(it.tradeState==2) {
                  it.tradeState='成功'
                }else if(it.tradeState==3) {
                  it.tradeState='失败'
                }else if(it.tradeState==0) {
                  it.tradeState='待提交到银行'
                }else{
                  it.tradeState=''
                }
              })
              if (this.list.length >= this.orderTotal) {
                this.finished = true
              }
            }else{
              this.finished = true
            }
            this.loading = false  
        },
        jumpManagementdetail(id) {
          this.$router.push({ name: 'Managedetail',query:{id:id} })
        }
    }
    
  }

</script>

<style lang="scss" scoped>

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
</style>