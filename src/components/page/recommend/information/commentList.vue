<template>
  <!-- 评论详情 -->
  <div class="commentList">
    <contentHeader :listdata="{'content':'评论详情'}"></contentHeader>
    <!-- 评论 -->
    <div class="list" v-for="(item,index) in commentData" :key="index">
      <div class="portrait">
        <img src="/static/index/qq.png" alt="">
      </div>
      <div class="content">
        <div class="userName">{{item.name}}</div>
        <div class="content">{{item.content}}</div>
        <div class="time">
          <span>{{item.time}}</span>
          <a @click.prevent="reply">回复</a>  
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
        <div class="commentInput" @click.self="commentVisible = false">
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
        commentData : [
          {'id':1,'pid':0,"content":"测试评论",name:"大帅锅1",time:"2018/11/5"},
          {'id':2,'pid':1,"content":"测试评论1",name:"大帅锅2",time:"2018/11/6"},
          {'id':3,'pid':1,"content":"测试评论2",name:"大帅锅3",time:"2018/11/7"},
          {'id':4,'pid':3,"content":"测试评论3",name:"大帅锅4",time:"2018/11/7"},
          {'id':5,'pid':4,"content":"测试评论4",name:"大帅锅5",time:"2018/11/7"}
        ],
        commentVisible:false,
        commentBrage: 0,
        isCollect: true,
        isComment: true,
        content:''
      }
    },
    created:function(){
      console.log(this.$route.query.id)
      getVideoCommentList({
        id:this.$route.query.id
      }).then(res=>{
        console.log(res)
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
        this.commentVisible = true
      },
      commont:function(){
        saveComment({
          data:{
            commentSourceId:this.$route.query.id,
            commentSourceType:"",
            content:this.content,
          }
        }).then(res=>{

        })
      },
      reply(){
        this.commentVisible = true
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
