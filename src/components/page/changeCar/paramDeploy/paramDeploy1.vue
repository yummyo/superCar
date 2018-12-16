<template>
    <div class="outermost-layer">
        <div class="left">
            <div class="left-head" :style="{height: `${headHeight}px`}">
                
            </div>
            <div  :style="{height: `${bodyHeight}px`}" class="left-body"  id="leftBodyId" onscroll="rightBodyId.scrollTop = this.scrollTop">
                <div v-for="(item,index) of titleData" :class="item.className" :key="index" >
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="right">
            <div class="right-head" >
                <div v-for="(item,index) of listData" :key="index" class="right-title" ref='rightHead'>
                   <p class="carName">{{ item['carModelInfoBO']['model']['carName'] }}</p>
                   <p class="carOffer">{{ item['carModelInfoBO']['model']['guidePrice'] }}</p>
                </div>
            </div>
            <div  :style="{height: `${bodyHeight}px`}" class="right-body" id="rightBodyId" onscroll="leftBodyId.scrollTop = this.scrollTop">
                <div v-for="(item,index) of listData" :key="index" >
                    <div class="rightItem"  :style="{width: `${headwidth}px`}" v-for="(val,idx) of titleData" :key="idx">{{ setVal(val['key'],item) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCarModelInfoBySeries } from '@/api/changeCar/index'
    export default {
        name: "home",
        data(){
            return {
                headHeight: 51,
                headwidth: 51,
                listData:[],
                titleData : [
                    {"name":"车型报价",'className':'titleItem title','key':'guidePrice'},
                    {"name":"厂商指导价","className":"titleItem",'key':'guidePrice'},
                    {"name":"经销商报价","className":"titleItem",'key':'guidePrice'},
                    {"name":"最大降幅","className":"titleItem",'key':'guidePrice'},
                    {"name":"主要参数","className":"titleItem title",'key':'guidePrice'},
                    {"name":"车身结构","className":"titleItem",'key':'modelBody/bodystructure'},
                    {"name":"驱动方式","className":"titleItem",'key':'modelChassis/drivetype'},
                    {"name":"排量(ml)","className":"titleItem",'key':'modelEngine/outputvolume'},
                    {"name":"变速器形式","className":"titleItem",'key':'guidePrice'},
                    {"name":"最高车速(km/h)","className":"titleItem",'key':'model/maxSpeed'},
                    {"name":"100公里加速时间(s)","className":"titleItem",'key':'guidePrice'},
                    {"name":"综合油耗(L/100km)","className":"titleItem",'key':'guidePrice'},
                    {"name":"整车整备质量(kg)","className":"titleItem",'key':'guidePrice'},
                    {"name":"保修里程","className":"titleItem",'key':'guidePrice'},
                    {"name":"能源类型","className":"titleItem",'key':'guidePrice'},
                    {"name":"车型结构","className":"titleItem",'key':'guidePrice'},
                    {"name":"长(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"宽(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"高(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"轴距(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"轮距(前)(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"轮距(后)(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"最小离地间隙(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"座位数(座)","className":"titleItem",'key':'guidePrice'},
                    {"name":"车门数(个)","className":"titleItem",'key':'guidePrice'},
                    {"name":"油箱容积(升)","className":"titleItem",'key':'guidePrice'},
                    {"name":"行李箱容积(升)","className":"titleItem",'key':'guidePrice'},
                    {"name":"保修里程","className":"titleItem",'key':'guidePrice'},
                    {"name":"整车整备质量(kg)","className":"titleItem",'key':'guidePrice'},
                    {"name":"最大载重质量(kg)","className":"titleItem",'key':'guidePrice'},
                    {"name":"货箱尺寸(mm)","className":"titleItem",'key':'guidePrice'},
                    {"name":"发动机","className":"titleItem",'key':'guidePrice'},
                    {"name":"货箱尺寸(mm)","className":"titleItem",'key':'guidePrice'},
                ]
            }
        },
        created(){
            getCarModelInfoBySeries({
                data:{
                    brandCode : this.$route.query.brandCode,
                    seriesCode : this.$route.query.seriesCode
                }
            }).then(res => {
                console.log(res)
                let arr = []
                arr.push(res.data[0])
                arr.push(res.data[0])
                console.log(arr)
                this.listData = arr
                this.$nextTick(()=>{
                    console.log(this.$refs.rightHead[0].style)
                    console.log(this.$refs.rightHead[0].offsetWidth)
                    this.headHeight = this.$refs.rightHead[0].offsetHeight
                    this.headwidth = this.$refs.rightHead[0].offsetWidth
                })
            })
        },
        computed:{
            bodyHeight(){
                return window.innerHeight - this.headHeight
            }
        },
        methods:{
            setVal(key,data){
                switch(key){
                    case 1 :
                    break;
                }
                return '--'
            }
        }
    }
</script>

<!--这里可以防止滚动到顶部时，整体往上偏移，底部出现空白-->
<style>
    #vux_view_box_body{
        padding:0px;
    }
</style>
<style lang="stylus">
    .rightItem,.titleItem
        padding .5rem
        font-size 10px
        height 3rem
        display: flex;
        align-items: center;
        justify-content: center;
    .outermost-layer
        .left
            width 6rem
        .right
            >div
                min-width 100%
            .right-head
                .right-title
                    border-bottom:1px solid #ddd;
                    max-width: 10rem;
                    .carOffer
                        color red
                    .carName
                        font-size 13px
            .right-body 
                .rightItem
                    line-height 3rem

</style>

<style scoped >
    .outermost-layer {
        box-sizing:border-box;
        background-color: white;
        padding: 0px;
    }
    .left{
        box-sizing:border-box;
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
    }
    .right{
        /* white-space: nowrap; */
        box-sizing:border-box;
        width: calc(100% - 6rem);
        height: 100%;
        float: left;
        overflow-x: scroll;
        display: inline-block;
    }
    .right-head{
        box-sizing:border-box;
        text-align:left;
        z-index: 10;
        clear: both;
    }
    .right-head .right-title{
        box-sizing:border-box;
        border-right:1px solid #ddd;
        display:inline-block;
        white-space: normal;
        padding: 1rem .5rem;
    }
    .right-body,.right-head{
        white-space: nowrap;
        display: inline-block;
        vertical-align: top;
    }
    .right-head>div{
        display: inline-block; 
    } 
    .right-body{
        box-sizing:border-box;
        /* width: 1400px; */
        /*height: 617px;*/
        clear: both;
        overflow-x: visible;
        overflow-y: auto;
        text-align:left;
        display: flex;
        float: left;
    }
    .right-body>div{
        display: flex;
        flex-direction: column;
    }
    .right-body>div>div{
        box-sizing:border-box;
        border-right:1px solid #ddd;
        border-bottom:1px solid #ddd;
        display:inline-block;
        text-align:center;
        line-height:30px
    }

</style>