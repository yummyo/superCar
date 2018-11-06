<template>
  <div class="comment">
    <!-- 评论 -->
    <div class="" :v-for="item in commentData">
        <div>
          <img src="/static/index/qq.png" alt="">
        </div>
        <div>
          <div class="userName">{{item.name}}</div>
          <div class="time">{{item.time}}</div>
          <div class="content">{{item.content}}</div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comment',
    data () {
      return {
        commentData : [
          {'id':1,'pid':0,"content":"测试评论",name:"大帅锅1",time:"2018/11/5"},
          {'id':2,'pid':1,"content":"测试评论1",name:"大帅锅2",time:"2018/11/6"},
          {'id':3,'pid':1,"content":"测试评论2",name:"大帅锅3",time:"2018/11/7"},
          {'id':4,'pid':3,"content":"测试评论3",name:"大帅锅4",time:"2018/11/7"},
          {'id':5,'pid':4,"content":"测试评论4",name:"大帅锅5",time:"2018/11/7"},
        ]
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .search
    font-size 0
    padding .5rem 1rem 0
    .content
      background #fff
      border-radius 5px
    input,span
      display inline-block
      border none
      font-size 1rem
      width 80%
    input
      font 1.5rem
      padding .5rem .3rem
      box-sizing border-box
      &:focus
        outline none
    .iconfont
      width 10%
    
</style>
