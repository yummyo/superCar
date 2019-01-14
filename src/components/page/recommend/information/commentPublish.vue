<template>
  <div>
    <div class="commentPublish">
      <!-- 发表评论 -->
        <input type="text" placeholder="发表评论" readonly @click="showComment">
        <div @click="toggleComment">
          <mt-badge class="badge" v-if="commentBrage>0" size="small" type="error">{{commentBrage}}</mt-badge>
          <span :class="{'iconfont':true,'icon-pinglun':!isComment,'icon-tubiaozhizuo-':isComment}" ></span>
        </div>
        <div @click="toggleCollect">
          <mt-badge class="badge" v-if="false" size="small" type="error">{{collectNum}}</mt-badge>
          <span :class="{'iconfont':true,'icon-unie601':!isCollect,'icon-shoucang':isCollect}"></span>
        </div>
    </div>
    <div v-if="commentVisible">
       <div class="commentInput" @click.self="hideComment">
        <div>
          <textarea placeholder="请输入评论内容" v-model="content" cols="30" rows="10"></textarea>
          <div class="commentBtn">
            <button class="spuerCar_btn" @click="commont">回复</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isKeeped,keepSource,removeKeep,saveComment } from '@/api/recommend/index';
import {detectorLogin} from '@/common/js/utils.js';
  export default {
    name: 'commentPublish',
    data () {
      return {
        isComment:false,
        // 是否被收藏
        isCollect: null,
        collectNum : 0,
        commentVisible: false,
        content: ''
      }
    },
    props:{
      commentBrage : 0,
      id:{
        default:0
      },
      pageType:{
        default:'article'
      }
    },
    created:function(){
      const that = this
      // 判断是否已经收藏过
      if(this.$route.query.collectId){
        that.isCollect = {
          id: this.$route.query.collectId
        }
      }else{
        isKeeped({
          data:{
            sourceId: this.$route.query.id,
            keepType: this.$route.query.pageType
          }
        }).then(res => {
          if(res.data){
            that.isCollect = {
              id: res.data
            }
          }else{
            that.isCollect = null
          }
        })
      }
    },
    methods:{
      toggleComment : function(){
        // this.isComment = !this.isComment
        console.log("文章id"+this.id)
        this.$router.push({
          "path":"/commentList",
          'query' : {
            'id':this.id,
            'pageType':this.pageType
          }
        });
      },
      showComment(){
        let that = this
        detectorLogin(this,function(){
          that.commentVisible = true
        })
      },
      hideComment(){
        // 隐藏回复框
        this.commentVisible = false
      },
      // 回复
      commont(){
        let that = this
        // 评论
        saveComment({
          data:{
            sourceId:this.$route.query.id,
            sourceType:this.$route.query.pageType,
            content:this.content
          }
        }).then(res=>{
          that.$toast({
            message: '回复成功',
            position: 'bottom',
            duration: 2000
          });
          that.commentVisible = false
          that.content = ''
        }).catch(res => {
          that.$toast({
            message: '网络异常',
            position: 'bottom',
            duration: 2000
          });
        })
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
           if(res.data){
              that.collectNum++
              that.isCollect = {id: res.data}
              that.$toast({message: '收藏成功',position: 'bottom',duration: 2000});
            }else{
              that.$toast({message: '收藏失败',position: 'bottom',duration: 2000});
            }
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .commentPublish
    padding 10px 
    display flex
    height 28px
    background #F6F7FB
    position fixed
    bottom 0
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
