<template>
  <div class="admin-header">
    <button type="button" class="header-back" v-if="showBack" @click="back">
      <i class="icon-back"></i>
    </button>
    <p class="header-title">
      <slot></slot>
    </p>
    <button type="button" class="header-opt" v-if="optTxt" @click="$emit('opt-click')">
      {{optTxt}}
    </button>
  </div>
</template>
<script type = 'text/javascript'>
  export default {
    name: 'AdminHeader',
    props: {
      showBack: {//是否显示返回按钮
        type: Boolean,
        default: true
      },
      optTxt: {//右边按钮文字
        type: String,
        default: ''
      },
      isBack: { // 是否直接返回上一个路由
        type: Boolean,
        default: true
      },
      parentHandle: { // 父组件传来的执行函数（点击返回箭头）
        type: Function
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
      back(){
        if(this.isBack){
          this.$router.go(-1);
        } else {
          this.parentHandle();
        }
      }
    },
  }
</script>
<style lang='scss' scoped>
@import '~@/assets/style/adminTheme.scss';
$headerContHeight: $headerHeight - .2rem;
  .admin-header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: $headerContHeight;
    box-sizing: content-box;
    background: #fff;
    box-shadow: 0 1px 3px 1px #ddd;
    .header-back {
      position: absolute;
      left: 0;
      height: $headerContHeight;
      padding: 0 .12rem;
      .icon-back {
        display: block;
        width: .24rem;
        height: .24rem;
        margin: 0 auto;
        @include bg-image('~@/assets/img/ic_function_black')
      }
    }
    .header-title {
      display: block;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100vw;
      height: $headerContHeight;
      line-height: $headerContHeight;
      padding: 0 .5rem;
      text-align: center;
      font-size: .2rem;
      color: #2E2E2E;
      font-weight: bold;
    }
    .header-opt {
      position: absolute;
      right: 0;
      top: -.0rem;
      height: $headerContHeight;
      line-height: $headerContHeight;
      padding: 0 .12rem;
      text-align: center;
      font-size: .16rem;
      color: #007EFC;
    }
  }
</style>