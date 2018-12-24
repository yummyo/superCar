<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
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
