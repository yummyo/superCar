<template>
  <div>
    <contentHeader  :listdata="{'content':'车主点评'}"></contentHeader>
    <div class="commentList">综合评分:<span>4.6</span>分</div>
    <div class="commentListTitle">
      <div>同系排名:<span>16</span>名</div>
      <div>网友油耗:<span>5.2-10.4L</span></div>
    </div>
    <div class="commentTable">
      <table>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      　　<tr>
      　　　　<td align="center">aaa</td>
      　　　　<td align="center">bbbb</td>
      　　</tr>
      </table>
    </div>
    <div class="emptyStyle">
    </div>
    <div class="issueList">
      <div class="issueListStyle">
          <div>
            <div class="issueHeader">
              <img src="/static/index/notLogin.png"/>
            </div>
            <div class="issueTime">
              <div>网名</div>
              <div>发布时间</div>
            </div>
          </div>
          <div>
            <div>最满意:</div>
            <div class="overflowStyle">氨基酸了的房间辣四大皆空法拉盛剪短发了降落伞的沙发上的</div>
          </div>
          <div>
            <div>最不满意:</div>
            <div class="overflowStyle">阿斯顿发阿斯顿发阿斯顿发爱的色放阿斯顿发阿斯顿发</div>
          </div>
          <div>
            <div>价格:</div>
            <div>50万</div>
          </div>
          <div>
            <div>车型:</div>
            <div>2018款自动技术型</div>
          </div>
      </div>
    </div>
    <div class="issue">
      <button>发布点评</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
export default {
  data() {
    return {
    }
  },
  methods: {
    
  },
  components: {
    contentHeader
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .commentList
    padding 1rem 0
    font-size 1.2rem
    span  
      color red
  .commentListTitle
    display flex
    justify-content space-between
    padding 0 1rem 0.5rem 1rem
    font-size 1.2rem
  .emptyStyle
    height 1.2rem
    background #EDEEF0
    margin-top 1rem
  .commentTable
    padding 0 1rem
    table,table tr th, table tr td 
       border 2px solid #EBECEE
    table
      width 100%
      border-collapse collapse
      td  
        width 50%
        padding .3rem 0
  .issueList
    margin-bottom 4rem
    .issueListStyle
      padding 1rem
      border-bottom 1px solid #989898
    .issueListStyle>div
      display flex
      justify-content flex-start
      line-height 1.5rem
      .issueHeader
        width 3rem 
        height 3rem
        img
          width 100%
      .issueTime
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align left
        padding-left 1rem
    .issueListStyle .overflowStyle
          flex 1
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
  .issue
    text-align center
    position fixed
    bottom 0
    left 0
    width 100%
    button
      width 95%
      background #3B5997
      height 2rem
      margin-bottom .5rem
      border-radius .3125rem
      color #ffffff
      font-size 1rem
      outline none 
      border none
</style>


