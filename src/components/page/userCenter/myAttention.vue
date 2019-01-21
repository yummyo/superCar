<template>
  <div class="list" >
      <contentHeader :listdata="listContent"></contentHeader>
      <div class="item" v-for="item in 5">
        <input class="inputState" type="checkbox" v-show="!choose">
        <div class="icon">
          <img :src="'./static/index/myAttention_1.jpg'">
        </div>
        <div class="text">
          <h3 class="name">兰博基尼</h3>
          <p class="desc">价格：<span>1000万起</span></p>
        </div>
      </div>
      <div class="footer">
          <div v-show="choose">
              <span @click="changeState(1)">编辑</span>
          </div>
          <div v-show="!choose">
              <span @click="deleteRow()" >删除</span>
              <span @click="chooseAll()">全选</span>
              <span @click="isOk()">完成</span>
          </div>
      </div>
  </div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  import {myAttention} from '@/api/userCenter/index.js'
  export default {
    name: 'myAttention',
    data () {
      return {
        listContent : {'content':"车系"},
        choose:true
      }
    },
    created() {
       myAttention({data:{pageNo:1,pageSize:10}}).then(res=>{
         console.log(res)
       })
    },
    methods:{
        changeState : function(id){
       
        },
        deleteRow : function(){
          
        },
        chooseAll : function(){
           
        },
        isOk : function(){
          this.choose=true
        }
    },
    props:{
      listdata:{
        type:Object,
        default:function(){
          return {}
        }
      }
    },
    components:{
      contentHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.list
  margin-bottom 3rem
  .item
    display flex
    box-sizing border-box
    flex-direction row
    /* justify-content center
    align-items center */
    padding .5rem 0
    border-bottom 1px solid #E1E1E1
    .icon
      img
        width 12rem
        height 8rem
    .text
      display flex
      flex-direction column
      justify-content space-between
      flex-grow 1
      padding 1rem 0
      .name
        text-align left
        color #474B4C
      .desc
        text-align left
        color #474B4C
        span
          color red
  .footer
    border-top 1px solid #E1E1E1
    height 3rem
    line-height 3rem
    position fixed
    bottom 0
    width 100%
    background #FFFFFF
    div
      display flex
      justify-content flex-end
      span
        padding-right 1.5rem

</style>
