<template>
  <div class="commentList">
    <contentHeader :listdata="{'content':'评论详情'}"></contentHeader>
    <!-- 评论 -->
    <div class="list" v-for="(item,index) in commentData" :key="index">
      <div class="portrait">
        <img src="/static/index/qq.png" alt="">
      </div>
      <div class="content">
        <div class="userName">{{item.name}}</div>
        <div class="time">{{item.time}}</div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- 底部回复 -->
    <commentPublish></commentPublish>
  </div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  import commentPublish from '@/common/view/commentPublish';
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
        ]
      }
    },
    components:{
      contentHeader,commentPublish
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
          font-size 5px
          color #ddd
        .content
          padding-left 1rem
</style>
