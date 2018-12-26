<template>
  <div>
    <contentHeader  :listdata="{'content':'车主点评'}"></contentHeader>
      <div class="commentList">综合评分:<span>{{seachComment.compositeScore}}</span>分</div>
      <div class="commentListTitle">
        <div>同系排名:<span>{{seachComment.ranking}}</span>名</div>
        <div>网友油耗:<span>{{seachComment.minUseOil}}-{{seachComment.maxUseOil}}</span></div>
      </div>
      <div class="commentTable">
        <table>
        　　<tr>
        　　　　<td align="center">空间</td>
        　　　　<td align="center">{{seachComment.space}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">动力</td>
        　　　　<td align="center">{{seachComment.power}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">操控</td>
        　　　　<td align="center">{{seachComment.manipulation}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">油耗</td>
        　　　　<td align="center">{{seachComment.oli}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">舒适性</td>
        　　　　<td align="center">{{seachComment.comfortable}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">外观</td>
        　　　　<td align="center">{{seachComment.appearance}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">内饰</td>
        　　　　<td align="center">{{seachComment.trim}}</td>
        　　</tr>
        　　<tr>
        　　　　<td align="center">性价比</td>
        　　　　<td align="center">{{seachComment.costPerformance}}</td>
        　　</tr>
        </table>
      </div>
      <div class="emptyStyle">
      </div>
      <div class="issueList">
        <div class="issueListStyle" v-for="item of seachComment.commentList" v-if="seachComment.commentList">
            <div>
              <div class="issueHeader">
                <img :src="'./static/index/notLogin.png'"/>
              </div>
              <div class="issueTime">
                <div>{{item.createUserName}}</div>
                <div>{{item.createTime}}</div>
              </div>
            </div>
            <div>
              <div>最满意:</div>
              <div class="overflowStyle">{{item.satisfy}}</div>
            </div>
            <div>
              <div>最不满意:</div>
              <div class="overflowStyle">{{item.unsatisfy}}</div>
            </div>
            <div>
              <div>价格:</div>
              <div>{{item.price}}万</div>
            </div>
            <div>
              <div>车型:</div>
              <div class="overflowStyle">{{item.modelName}}</div>
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
import {getSeachComment} from '@/api/changeCar/index';
export default {
  data() {
    return {
      seachComment:''
    }
  },
   created() {
    getSeachComment({data:{brandCode:33,seriesCode:3170}}).then((res) => {
        this.seachComment=res.data
        console.log(res.data)
      }).catch(res=>{
      });
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
          text-align left
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


