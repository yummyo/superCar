<template>
  <div class="recommend">
    <div class="topBg">
      <!-- 搜索框 -->
      <CommonSearch></CommonSearch>  
      <!-- 分类信息 -->
      <div class="tab">
        <div v-for="(item,key,index) of tobarData" :class="{active : tabType==item.type,tab_item : true}" @click="changeActive(item.class,item.type)" :key="index">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <articleContent class="articleList" :tabType='tabType'></articleContent>
    <div class="ads" v-if='adsVisible'>
      <canvas ref="canvas" width="48" height='48' @click="closeAds"></canvas>
    </div>
  </div>
</template>

<script>
  import CommonSearch from '@/common/view/search.vue';
  import {getIndexLunbo} from '@/api/articleList';
  import {getHomepageAds} from '@/api/login';
  import articleContent from './articleContent.vue';
  import {mapGetters} from 'vuex';
  export default {
    name: 'recommend',
    data () {
      return {
        tobarData: {
          "tobar_1":{'name':"最新",class:'recommend',type:"1",'titleType':"ALL"},
          "tobar_2":{'name':"视频",class:'city',type:"2"},
          "tobar_3":{'name':"上海",class:'movie',type:"3",'cityCode':""},
          "tobar_4":{'name':"测评",class:'car',type:"4",'titleType':"PC"},
          "tobar_5":{'name':"导购",class:'shop',type:"5",'titleType':"DG"}
        },
        tabType:1,
        map: null,
        countDown: 3,
        countDownTimer: null,
        // 广告页面展示
        adsVisible: false,
      }
    },
    created(){
      this.countDownFun()
      this.tabType = this.$route.query.tabType || 1
      this.map = new AMap.Map('testmap')
    },
    watch:{
      $route(){
        this.tabType = this.$route.query.tabType || 1
      },
      userSite(){
        console.log(this.userSite)
        this.tobarData = {
          "tobar_1":{'name':"最新",class:'recommend',type:"1",'titleType':"ALL"},
          "tobar_2":{'name':"视频",class:'city',type:"2"},
          "tobar_3":{'name':this.userSite['province'].slice(0,-1),class:'movie',type:"3",'cityCode':""},
          "tobar_4":{'name':"测评",class:'car',type:"4",'titleType':"PC"},
          "tobar_5":{'name':"导购",class:'shop',type:"5",'titleType':"DG"}
        }
      }
    },
    computed:{
      ...mapGetters(['userSite'])
    },
    methods:{
      closeAds(){
        console.log(123)
        clearInterval(this.countDownTimer)
        this.adsVisible = false
      },
      countDownFun(){
        if(!window.sessionStorage.getItem('indexAds')){
          this.adsVisible = true
          window.sessionStorage.setItem('indexAds',new Date().getTime())
          this.$nextTick(()=>{
            this.drawProcess(4)
          })
          getHomepageAds().then(res => {
            console.log(res)
          })
        }
      },
      drawProcess(num) {

          var process = num * 1000;
          var nowTime = num * 1000;
          var text = num;

          // 一个canvas标签  
          var canvas = this.$refs['canvas']
          // 拿到绘图上下文,目前只支持"2d"  
          var context = canvas.getContext('2d');
          // 将绘图区域清空,如果是第一次在这个画布上画图,画布上没有东西,这步就不需要了  
          context.clearRect(0, 0, 48, 48);

          // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
          context.moveTo(24, 24);
          context.save()
          this.countDownTimer = setInterval(() => {
            context.clearRect(0, 0, 48, 48);
            nowTime = nowTime - 10
            text = nowTime % 1000 == 0 ? nowTime/1000 : text
             // ***开始画一个灰色的圆  
            context.beginPath();
            // 坐标移动到圆心  
            context.moveTo(24, 24);
            // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
            context.arc(24, 24, 24, 0, Math.PI * 2, false);
            context.closePath();
            // 填充颜色  
            context.fillStyle = '#00bb00';
            context.fill();
            // ***灰色的圆画完  

            // 画进度  
            context.beginPath();
              // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
            // context.arc(24, 24, 24, 0, Math.PI * 2 * process / 100, false);
            context.arc(24, 24, 24, 0, (Math.PI * 2 * nowTime / process), false);
            context.closePath();
            context.fillStyle = '#ddd';
            context.fill();

            // 画内部空白  
            context.beginPath();
            context.moveTo(24, 24);
            context.arc(24, 24, 21, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();

            //在中间写字  
            context.font = "bold 9pt Arial";
            context.fillStyle = '#213447';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.moveTo(24, 24);
            context.fillText(text, 24, 24);
            context.restore()
            if(nowTime <= 0){
              this.closeAds()
            }
          }, 10);
      },
      changeActive:function(cla,type){
        this.nowActive = cla;
        this.tabType = type
        this.$router.push({
          path:'/index/recommend',
          query:{
            tabType:type
          }
        })
      }
    },
    components:{
      CommonSearch,
      articleContent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .ads
    position fixed
    height 100%
    width 100%
    z-index 1000
    top 0
    left 0
    background url('/static/index/iPhone750.png')
    background-size 100% 100%
    canvas{
      position absolute
      top 1rem
      right 1rem
      width 48px
      height 48px
    }
  .topBg
    position fixed
    top 0
    left 0
    width 100%
    z-index 999
    background #3B5997
    // tab切换组件
    height 5rem
  .tab_item
    display inline-block
    width 20%
    box-sizing border-box
    color #fff
    padding .2em .5rem
    &:after
      content ""
      display block
      margin 0 auto
      width 0
      height 0
      border-bottom 2px solid #fff
      margin-top 3px
      transition width .3s 
    &.active:after
      width 80%
</style>
