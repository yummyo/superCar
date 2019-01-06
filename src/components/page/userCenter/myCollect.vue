<template>
  <div class="list" ref="wrapper" >
      <contentHeader :listdata="listContent"></contentHeader>
      <scroll 
          @scrollToEnd="scrollUp"
          :pullup='true'
          class="listview"
          ref='scroll'>
        <div>
          <div class="item" v-for="(item,index) of collectList"  @click="()=>{clickList&&clickList(item)}">
            <label>
              <div  class="inputState">
                <span :class= "checkedList.indexOf(item.id)!=-1 ? 'classActive' : 'classNone' " v-show="!choose"></span>
                <input v-model='checkedList' :value='item.id' type="checkbox" v-show="!choose">
              </div>
              <div class="icon">
                <img  v-if="item&&item.imgResource[0]" v-lazy="item.imgResource[0].resourceImgUrl">
              </div>
              <div class="text">
                <h3 class="name" v-if="item&&item.title">{{item.title}}</h3>
                <p class="desc" v-if="item&&item.commentCount">{{item.createTime}}<span>评价:{{item.commentCount}}</span></p>
              </div>
            </label>
          </div>
        </div>
      </scroll>
      <div class="footer">
          <div v-show="choose">
              <span @click="changeState()">编辑</span>
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
  import {myCollect} from '@/api/userCenter/index';
  // import Bscroll from 'better-scroll'
  import Scroll from '@/common/scroll/scroll'
  import Vue from 'vue' 
  export default {
    name: 'myCollect',
    data () {
      return {
        listContent : {'content':"我的收藏"},
        choose:true,
        collectList:{},
        nowPageIndex:1,
        clickList:this.toDetail,
        checkedList:[]
      }
    },
    created() {
        this.getList();
    },
    watch:{
      checkedList(){
        console.log(this.checkedList)
      },
      collectList(){
        console.log(this.collectList)
        console.log(this.$refs['scroll'])
        setTimeout(() => {
          this.$refs['scroll'].refresh()
        }, this.refreshDelay)
      }
    },
    methods:{
        getList(){
           myCollect({data:{pageNo:this.nowPageIndex,pageSize:10}}).then(res=>{
            if(res.data.result.length > 0){
              this.$toast({
                message: '加载了'+res.data.result.length+"条数据",
                position: 'bottom',
                duration: 2000
              })
              let arr = JSON.parse(JSON.stringify(this.collectList))
              res.data.result.map(v =>{
                if(v && !this.collectList[v.id]){
                  arr[v.id] = v
                }
              })
              this.collectList  = arr
            }else{
              this.$toast({
                message: '暂无更多数据！',
                position: 'bottom',
                duration: 2000
              })
            }
          })
        },
        scrollUp(){
          this.nowPageIndex+=1
          this.getList();
        },
        deleteRow(){
          this.checkedList.map(v=>{
            if(this.collectList[v]) {
              // this.$set(this.collectList,v,null)
              Vue.delete(this.collectList,v);
            }
          })

        },
        chooseAll(){
          this.checkedList = Object.keys(this.collectList)
        },
        changeState : function(){
            this.choose=false;
            this.clickList=''
        },
        isOk : function(){
          this.choose=true
          this.clickList=this.toDetail
        },
        toDetail : function(data){
          // 进入文章喜爱那个IQ那个页面
          console.log(data)
          this.$router.push({
            name:"articleDetail",
            query:{
              id:data.id,
              pageType:data.parPropertyCode
            }
          })
        },
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
      contentHeader,Scroll,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.listview
  overflow hidden
  height calc(100% - 3rem)
.list
  margin-bottom 3rem
  height calc(100% - 3rem)
  .item>label
    display flex
    box-sizing border-box
    flex-direction row
    /* justify-content center
    align-items center */
    padding .5rem 0
    border-bottom 1px solid #E1E1E1
    .inputState
      display: flex;
      align-items: center;
      input 
        display none
      .classActive
        border 1px solid #ddd
        width 1rem
        height 1rem 
        border-radius 50%
        background #5BB0F3
      .classNone
        border 1px solid #ddd
        width 1rem
        height 1rem 
        border-radius 50%
    .icon
      width 9rem
      height 6rem
      padding .5rem
      img
        width 100%
        height 100%
    .text
      display flex
      flex-direction column
      justify-content space-between
      flex 1
      padding 1rem 0
      .name
        text-align left
        font-weight: 500;
        color: #000;
        font-size: 1rem;
      .desc
        text-align left
        color #474B4C
        font-size 0.8rem
        span
          margin-left 0.5rem
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
