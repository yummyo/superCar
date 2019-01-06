<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div id='testmap' v-if="false"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      map: null
    }
  },
  created(){
    // 定位相关
    this.map = new AMap.Map('testmap')
    this.thisLocation()

    let that = this
    this.$mui.plusReady( () =>{
      var backcount = 0;
      this.$mui.back = ()=> {
        if(this.$route.path.split("/")[1] != 'index'){
          this.$router.go(-1)
        }else{
            if (this.$mui.os.ios) return;
            if (backcount > 0) {
              if (window.plus) plus.runtime.quit();
              return;
            };
            this.$toast({
              message: '再点击一次退出应用!',
              position: 'bottom',
              duration: 2000
            });
            backcount++;
            setTimeout( () =>{
              backcount = 0;
            }, 2000);
        }
      };
    })
  },
  methods:{
    thisLocation () {
      this.map.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          GeoLocationFirst:true
        })
        this.map.addControl(geolocation)
        geolocation.getCurrentPosition()
        // ip定位
        // geolocation.getCityInfo((info,res)=>{
        //   console.log(res)
        //   if(info == 'complete'){
        //     window.localStorage.setItem("userLocation",JSON.stringify(res))
        //     // this.tobarData['tobar_3']['name'] = res.city.slice(0,-1)
        //   }else{
        //     alert('定位失败',JSON.stringify(res))
        //   }
        // })
        AMap.event.addListener(geolocation, 'error', res => {
          console.log('error',res)
        })
        AMap.event.addListener(geolocation, 'complete', (res)=>{
          console.log('success',res)
          window.localStorage.setItem("userLocation",JSON.stringify(res.addressComponent))
          this.$store.commit("SET_USERSIZE",res.addressComponent)
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height:100%;
    /* margin-bottom: 55px; */
  }
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td,img,u,i {list-style:none;padding:0;margin:0;}
</style>
