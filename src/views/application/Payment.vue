<template>
  <div id="home">
    <div class="home_header">
      <van-icon name="arrow-left" @click="$router.back()"/>
      <h4>实时付款申请</h4>
    </div>
  </div>
</template>
<script type = 'text/javascript'>

// import { mapState } from 'vuex'
// import config from '@/config'

  export default {
    name: 'Payment',
    components: {
      
    },
    data() {
      return {
      }
    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
.home_header {
  display:flex;
  .van-icon {
    padding: 22px 0 0 15px;
  }
  h4 {
    margin-left: 9rem;
  }
}
</style>