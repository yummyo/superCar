<template>
<transition 
  name="carTran">
    <div class="alertContent" v-show="modalHideList" @click.self="modalHide">
        <div class="alertRight">
          <slot></slot>
        </div>
    </div>
</transition>
</template>
<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
export default {
  data() {
    return {
      modalHideList:false,
    }
  },
  methods: {
    // 控制模态框显示隐藏
    modalHide(){
      this.modalHideList=false;
    },
    modalShow(){
      this.modalHideList=true;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .carTran-enter
    left 100% !important
  .carTran-enter-to
    left 0 !important
  .alertContent
    transition all .5s 
    position fixed
    bottom 0
    left 0
    top 0
    right 0 
    z-index 10
    background rgba(0,0,0,.3)
    width 100%
    &.carTran-leave-to 
      .alertRight
        right -100%
    .alertRight
      transition all .5s 
      position absolute
      bottom 0
      top 0
      right 0 
      width 80%
      background #fff
</style>