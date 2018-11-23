<template>
  <!-- 评论详情 -->
  <div class="commentList">
    <contentHeader :listdata="{'content':'评论详情'}"></contentHeader>
    <!-- 评论 -->
    <div class="list" v-for="(item,index) in commentData" :key="index">
      <div class="portrait">
        <img :src="item.createUserHeadIconUrl" alt="">
      </div>
      <div class="content">
        <div class="userName">{{item.createUserNickName}}</div>
        <div class="content">{{item.content}}</div>
        <div class="time">
          <span>{{item.createTime.substr(0,10)}}</span>
          <a @click.prevent="reply(item)">回复</a>  
        </div>
      </div>
    </div>
    <!-- 底部回复 -->
    <div>
      <div class="commentPublish" v-if="!commentVisible">
        <!-- 发表评论 -->
          <input type="text" @click="cutInput" placeholder="发表评论" readonly>
          <div @click="toggleComment">
            <mt-badge class="badge" v-if="commentBrage>0" size="small" type="error">{{commentBrage}}</mt-badge>
            <span :class="{'iconfont':true,'icon-pinglun':!isComment,'icon-tubiaozhizuo-':isComment}" ></span>
          </div>
          <div @click="toggleCollect">
            <mt-badge class="badge" v-if="commentBrage>0" size="small" type="error">{{commentBrage}}</mt-badge>
            <span :class="{'iconfont':true,'icon-unie601':!isCollect,'icon-shoucang':isCollect}"></span>
          </div>
      </div>
      <div v-else>
        <div class="commentInput" @click.self="hideComment">
          <div>
            <textarea v-model="content" cols="30" rows="10"></textarea>
            <div class="commentBtn">
              <button class="spuerCar_btn" @click="commont">回复</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  import commentPublish from './commentPublish';
  import { getVideoCommentList,saveComment,saveresponse } from '@/api/recommend/index';
  export default {
    name: 'commentList',
    data () {
      return {
        commentData : [],
        commentVisible:false,
        commentBrage: 0,
        isCollect: true,
        isComment: true,
        replyUserData: null,
        content:'',
      }
    },
    created:function(){
      console.log(this.$route.query.id)
      const _self = this
      getVideoCommentList({
        data:{
          // 'sourceId':this.$route.query.id,
        'sourceId':'941fb2c803e24ca39077f4be3f92c770',
        'sourceType':'video',
        "pageNo":1,
        'pageSize':15
        }
      }).then(res=>{
        _self.commentData = res.data.result
        console.log(res.data.result)
      })
    },
    components:{
      contentHeader,commentPublish
    },
    methods:{
      addComment:function(){
        let data = {
          commentSourceId:this.$route.query.id,
          commentSourceType:"",
          content:"",
        }
      },
      toggleComment:function(){

      },
      toggleCollect:function(){

      },
      cutInput:function(){
        // 正常评论
        this.commentVisible = true
      },
      commont:function(){
        console.log(this.replyUserData)
        if(!this.replyUserData){
          // 评论
          saveComment({
            data:{
              sourceId:this.$route.query.id,
              sourceType:this.$route.query.pageType,
              content:this.content,
            }
          }).then(res=>{
            console.log(res)
          })
        }else{
          // 回复
          saveresponse({
            data:{
              pid:this.replyUserData.id,
              content:this.content,
            }
          }).then(res=>{
            console.log(res)
          })
        }
      },
      reply(item){
        // 点击回复按钮
        this.replyUserData = item;
        this.commentVisible = true
      },
      hideComment(){
        // 隐藏回复框
        this.replyUserData = null;
        this.commentVisible = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .commentList
      .list
        display flex
        padding .5rem 1rem
        border-bottom 1px solid #ddd
        .time
          span
            font-size 5px
            color #ddd
          a
            font-size 8px
        .content
          padding-left 1rem
    .commentPublish
      padding 10px 
      display flex
      height 40px
      background #F6F7FB
      position fixed
      bottom 0
      input 
        width 80%
        padding-left 2rem
        font-size 1.3rem
        border none
        &:focus
          outline none
      div 
        position relative
        flex-grow 1
        padding 0 1rem
        .badge
          position absolute
          top 0
          right 0
          transform translateX(-30%)
        span.iconfont
          font-size 2rem
          display inline-block
          width 2rem
          height 2rem
    // 回复input
    .commentInput
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      background rgba(0,0,0,.5)
      >div
        position absolute
        bottom 0
        left 0
        right 0
        padding 1rem
        background #fff
        textarea
          width 100%
          height 5rem
        .commentBtn
          text-align right

</style>
