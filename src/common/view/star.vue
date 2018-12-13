<template>
   <div class="star-phone" @click.stop="clickRating">
      <div
        v-for="(item, index) in starNum"
        :key="index"
        :class="isRating(index)"
        :data-index="index"
      />
    </div>
  </div> 
</template>
<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
export default {
    props: {
    starNum: {
      // 星星的个数
      type: Number,
      default: 5,
    },
    defaultRating: {
      // 默认点亮的个数
      type: Number,
      default: 5,
    },
    outIndex: {
      // 外界传进来的一个标识
      type: Number,
      default: 0,
    },
    readOnly: {
      // 是否是只读，默认不是，拥有点击功能
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rating: this.defaultRating, // 用于控制点亮星星的个数
    }
  },
  methods: {
    isRating (index) {
      ++index
      return index <= this.rating ? 'star-item star-active' : 'star-item'
    },
    clickRating (ev) {
      if (this.readOnly) {
        return
      }
      let mark = parseInt(ev.target.dataset.index) + 1
      this.rating = mark
      this.$emit('starMarkChange', mark, this.outIndex)
    },
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
      .star-phone
        position relative
        display inline-block
        line-height: 15.5px
        -webkit-tap-highlight-color:transparent
      .star-item 
        display inline-block
        width 15px
        height 15.5px
        background-image url('/static/index/star1.jpg')
        background-clip content-box
        background-position: center 0
        background-repeat: repeat-y
        cursor pointer
        vertical-align bottom
        white-space: nowrap
      .star-item:last-child 
        padding-right 0
      .star-active 
        background-position center 15.5px
</style>


