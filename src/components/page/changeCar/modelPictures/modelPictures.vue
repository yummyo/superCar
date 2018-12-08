<template>
    <div>
        <contentHeader :listdata="{'content':'车型图片'}"></contentHeader>
        <mt-navbar v-model="selected">
          <mt-tab-item id="appearance">外观</mt-tab-item>
          <mt-tab-item id="centralControl">中控</mt-tab-item>
          <mt-tab-item id="details">细节</mt-tab-item>
          <mt-tab-item id="chair">座椅</mt-tab-item>
          <mt-tab-item id="other">其他</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="appearance">
            <div class="appearance">
              <div v-for="item in pictures">
                <img v-lazy="item.imgUrl"/>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="centralControl2">
           <div class="appearance">
              <div v-for="item in pictures">
                <img v-lazy="item.imgUrl"/>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="details">
          <div class="appearance">
              <div v-for="item in pictures">
                <img v-lazy="item.imgUrl"/>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="chair">
          <div class="appearance">
              <div v-for="item in pictures" v-if="item.length>0">
                <img v-lazy="item.imgUrl"/>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="other">
          <div class="appearance">
              <div v-for="item in pictures">
                <img v-lazy="item.imgUrl"/>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
  
  <script>
    import contentHeader from '@/common/view/contentHeader';
     import {getModelImgBySeries} from '@/api/changeCar/index'
    export default {
      data () {
        return {
          selected:'appearance',
          pictures:''
        }
      },
      created:function(){
        console.log(this.$route.query.brandCode)
        console.log(this.$route.query.seriesCode)
        getModelImgBySeries({
          data:{
            "brandCode":33,
            "seriesCode":3170,
            "imgType":'appearance',
            "imgColor":''
            }
        }).then((res) => {
          console.log(res);
          this.pictures = res.data.modelImgList;
        });

      },
      props:{
        listdata:{
          type:Array,
          default:function(){
            return []
          }
        }
      },
      methods:{
       
        
      },
      watch: {
          selected: function (val, oldVal) {
              // 这里就可以通过 val 的值变更来确定
            getModelImgBySeries({
              data:{
                "brandCode":33,
                "seriesCode":3170,
                "imgType":val,
                "imgColor":''
                }
            }).then((res) => {
              this.pictures = res.data.modelImgList;
            });
          }
      },
      components:{
        contentHeader
      }
    }
  </script>
  <style scoped lang="stylus" rel="stylesheet/stylus">
    .appearance
      // margin 10px
      // display flex
      // justify-content space-between
      overflow auto
      margin-top 1rem
      text-align left
      div
        width 31%
        height 4.5rem
        display inline-block
        padding 0 0.2rem
      img
        width 100%
  </style>
  