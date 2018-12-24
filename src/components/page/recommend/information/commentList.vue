<template>
  <!-- 评论详情 -->
  <div class="commentList">
    <contentHeader :listdata="{'content':'评论详情'}"></contentHeader>
    <!-- 评论 -->
    <div class="list" v-for="(item,index) in commentData" :key="index">
      <div>
        <div class="portrait">
          <!-- <img :src="item.createUserHeadIconUrl" alt=""> -->
          <img src="//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg" alt="">
        </div>
        <div class="content">
          <div class="userName">{{item.createUserNickName}}</div>
          <div class="content">{{item.content}}</div>
          <div class="time">
            <span>{{item.createTime.substr(0,10)}}</span>
            <a class="replyBtn" @click.prevent="reply(item)">回复</a>
          </div>
        </div>
      </div>
      <div class="contentReturn" v-if="item.commentResponse.length>0" v-for="(itemReturn,indexReturn) in item.commentResponse" :key="indexReturn">
        <div class="userName">{{itemReturn.createUserId}}<span class='replyName'>回复</span>{{itemReturn.createUserNickName}}</div>
        <div class="content">{{itemReturn.responseComment}}</div>
        <div class="time">
          <span>{{itemReturn.createTime.substr(0,10)}}</span>
        </div>
      </div>
    </div>
    <!-- 底部回复 -->
    <div>
      <div class="commentPublish" v-if="!commentVisible">
        <!-- 发表评论 -->
          <input type="text" @click="cutInput" placeholder="发表评论" readonly>
          <!-- <div @click="toggleComment">
            <mt-badge class="badge" v-if="commentBrage>0" size="small" type="error">{{commentBrage}}</mt-badge>
            <span :class="{'iconfont':true,'icon-pinglun':!isComment,'icon-tubiaozhizuo-':isComment}" ></span>
          </div> -->
          <div @click="toggleCollect">
            <mt-badge class="badge" v-if="false" size="small" type="error">{{collectNum}}</mt-badge>
            <span :class="{'iconfont':true,'icon-unie601':!isCollect,'icon-shoucang':isCollect}"></span>
          </div>
      </div>
      <div v-else>
        <div class="commentInput" @click.self="hideComment">
          <div>
            <textarea :placeholder="replyPlaceholder" v-model="content" cols="30" rows="10"></textarea>
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
  import {detectorLogin} from '@/common/js/utils.js';
  import commentPublish from './commentPublish';
  import { getVideoCommentList,saveComment,saveresponse,isKeeped,keepSource,removeKeep } from '@/api/recommend/index';
  export default {
    name: 'commentList',
    data () {
      return {
        commentData : [],
        commentVisible:false,
        // 是否被收藏
        isCollect: null,
        collectNum : 0,
        isComment: true,
        // 区分是评论还是回复的数据
        replyUserData: null,
        content:'',
        replyPlaceholder:''
      }
    },
    created:function(){
      const that = this
      getVideoCommentList({
        data:{
        'sourceId':this.$route.query.id,
        'sourceType':this.$route.query.pageType,
        "pageNo":1,
        'pageSize':15
        }
      }).then(res=>{
        that.commentData = res.data.result
      })
      // 判断是否已经收藏过
      isKeeped({
        data:{
          sourceId: this.$route.query.id,
          keepType: this.$route.query.pageType
        }
      }).then(res => {
        console.log(res)
        if(res.data){
          that.isCollect = {
            id: res.data
          }
        }else{
          that.isCollect = null
        }
      })
    },
    components:{
      contentHeader,commentPublish,isKeeped
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
        const that = this
        if(!this.isCollect){
          // 收藏
          keepSource({
            data:{
              sourceId: this.$route.query.id,
              keepType: this.$route.query.pageType
            }
          }).then(res => {
            that.collectNum++
            that.isCollect = {
              id: res.data
            }
            that.$toast({
              message: '收藏成功',
              position: 'bottom',
              duration: 2000
            });
          })
        }else{
          // 取消收藏
          removeKeep({
            data:{
              id: that.isCollect.id
            }
          }).then(res => {
            that.collectNum--
            that.isCollect = null
            that.$toast({
              message: '取消收藏成功',
              position: 'bottom',
              duration: 2000
            });
          })
        }
      },
      cutInput:function(){
        let that = this
        detectorLogin(that,function(){
           // 评论的提示内容
          that.replyPlaceholder = '请输入评论内容：'
          // 正常评论
          that.commentVisible = true
        })
       
      },
      commont:function(){
        let that = this
        if(!this.replyUserData){
          // 评论
          saveComment({
            data:{
              sourceId:this.$route.query.id,
              sourceType:this.$route.query.pageType,
              content:this.content,
            }
          }).then(res=>{
             that.$toast({
              message: '评论成功',
              position: 'bottom',
              duration: 2000
            });
            that.commentVisible = false
            that.content = ''
            that.getLIst()
          })
        }else{
          // 回复
          saveresponse({
            data:{
              pid:this.replyUserData.id,
              content:this.content,
            }
          }).then(res=>{
             that.$toast({
              message: '回复成功',
              position: 'bottom',
              duration: 2000
            });
            that.commentVisible = false
            that.content = ''
            that.getLIst()
          })
        }
      },
      reply(item){
        let that = this
        detectorLogin(that,function(){
          // 回复时的placeholder
          that.replyPlaceholder = '回复：'+item.createUserNickName
          // 点击回复按钮
          that.replyUserData = item;
          that.commentVisible = true
        })
      },
      hideComment(){
        // 隐藏回复框
        this.replyUserData = null;
        this.commentVisible = false
      },
      getLIst(){
        const that = this
        getVideoCommentList({
          data:{
          'sourceId':that.$route.query.id,
          'sourceType':that.$route.query.pageType,
          "pageNo":1,
          'pageSize':15
          }
        }).then(res=>{
          that.commentData = res.data.result
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .commentList
      .list
        .time
            span
              font-size 5px
              color #ddd
            a
              font-size 8px
        >div:first-child
          display flex
          padding .5rem 1rem
          border-bottom 1px solid #ddd
          text-align left
          align-items center
          .portrait
            padding .3rem 0
          img 
            width 3rem 
            height 3rem
            border-radius 50%
          .content
            // padding-left 1rem
            display flex
            flex-direction column
            justify-content space-around
            .replyBtn
              font-size 0.8rem
              color red
        .contentReturn
          margin-left 2rem
          text-align left
          border-bottom 1px solid #ddd
          .userName
            font-size .9rem
          .replyName
            font-size .8rem
            color #ddd
    .commentPublish
      padding 10px 
      display flex
      height 28px
      background #F6F7FB
      position fixed
      bottom 0
      left 0
      right 0
      input 
        width 80%
        padding-left 2rem
        font-size 1rem
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
          font-size 1.5rem
          display inline-block
          width 2rem
          height 2rem
    // 回复input
    .commentInput
      position fixed
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
