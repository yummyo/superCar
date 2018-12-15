<template>
    <div class="outermost-layer">
        <div class="left">
            <div class="left-head" :style="{height: `${headHeight}px`}">
                
            </div>
            <div  :style="{height: `${bodyHeight}px`}" class="left-body"  id="leftBodyId" onscroll="rightBodyId.scrollTop = this.scrollTop;console.log(rightBodyId.scrollTop);console.log(this.scrollTop)">
                <div v-for="i in 40" style="height: 30px">
                    「{{i}}」左b
                </div>
            </div>
        </div>
        <div class="right">
            <div class="right-head" :style="{height: `${headHeight}px`}">
                <div v-for="i in 40" style="height: 50px">
                    <span v-for="n in 5">「{{i}}」右「{{n}}」</span>
                </div>
            </div>
            <div  :style="{height: `${bodyHeight}px`}" class="right-body" id="rightBodyId" onscroll="leftBodyId.scrollTop = this.scrollTop;console.log(leftBodyId.scrollTop);console.log(this.scrollTop)">
                <div v-for="i in 40" style="height: 30px">
                    <span v-for="n in 5">「{{i}}」右「{{n}}」</span>
                </div>
            </div>
        </div>
    </div>

</template>

<!--这里可以防止滚动到顶部时，整体往上偏移，底部出现空白-->
<style>
    #vux_view_box_body{
        padding:0px;
    }
</style>

<script>
    export default {
        name: "home",
        data(){
            return {
                headHeight: 51,
                bodyHeight: window.innerHeight - 51,
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    .outermost-layer {
        box-sizing:border-box;
        background-color: white;
        padding: 0px;
    }
    .left{
        box-sizing:border-box;
        width: 100px;
        height: 100%;
        float: left;
        display: inline-block;
    }
    .left-head{
        box-sizing:border-box;
        width: 100%;
        /*height: 30px;*/
        clear: both;
        border-right:1px solid #ddd;
        border-bottom:1px solid #ddd;
    }
    .left-body{
        box-sizing:border-box;
        clear: both;
        width: 100%;
        /*height: 617px;*/
        /*左边设置滚动条，系统监听左边的滚动条位置，保持高度一致*/
        overflow-y: scroll;
        border-right:1px solid #ddd;
    }
    .left-body>div{
      box-sizing:border-box;
      border-bottom:1px solid #ddd;
      line-height:30px
    }
    .right{
        box-sizing:border-box;
        width: calc(100% - 100px);
        height: 100%;
        float: left;
        overflow-x: scroll;
        display: inline-block;
    }
    .right-head{
        box-sizing:border-box;
        width: 1400px;
        text-align:left;
        overflow: auto;
        /*height: 30px;*/
        z-index: 10;
        clear: both;
        border-bottom:1px solid #ddd;
    }
    .right-head span{
        box-sizing:border-box;
        width: 120px;
        border-right:1px solid #ddd;
        display:inline-block;
        height:50px;
        text-align:center;
        line-height:50px
    }
    .right-body{
        box-sizing:border-box;
        width: 1400px;
        /*height: 617px;*/
        clear: both;
        overflow: auto;
        text-align:left;
    }
    .right-body span{
        box-sizing:border-box;
        width: 120px;
        border-right:1px solid #ddd;
        border-bottom:1px solid #ddd;
        display:inline-block;
        height:30px;
        text-align:center;
        line-height:30px
    }

</style>