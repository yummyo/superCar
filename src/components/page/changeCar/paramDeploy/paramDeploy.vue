<template>
    <div class="outermost-layer">
        <contentHeader :listdata='articleContent'></contentHeader>
        <div class="contentBox">
            <div class="top">
                <div class="top-box" :style="{height: `${headHeight}px`}"></div>
                <div class="top-head" id="rightTitle"  onscroll="rightBodyId.scrollLeft = this.scrollLeft">
                    <div v-for="(item,index) of listData" :key="index" class="right-title" ref='rightHead' >
                    <p class="carName">{{ item['carModelInfoBO'] ? item['carModelInfoBO']['model']['carName'] :'' }}</p>
                    <p class="carOffer">{{ item['carModelInfoBO'] ? item['carModelInfoBO']['model']['guidePrice'] : '' }}</p>
                    </div>
                </div>
            </div>
            <div class="bottom" :style="{height: `${bodyHeight}px`}" >
                <div>
                    <div class="bottom-title"  >
                        <div v-for="(item,index) of titleData" :class="item.className"  :key="index" >
                            <span>{{ item.name }}</span>
                            <div v-if="item['key'] == 'title'" class="fl-right">
                                <span>
                                    <span class="iconfont icon-xuanzhong"></span>标配
                                </span>
                                <span>
                                    <span class="iconfont icon-wxz"></span>选配
                                </span>
                                <span>
                                    -无
                                </span>
                            </div>
                        </div>
                    </div>
                    <div  class="bottom-body" id="rightBodyId" onscroll="rightTitle.scrollLeft = this.scrollLeft">
                        <div v-for="(item,index) of listData" :key="index" :style="{width: `${headwidth}px`}">
                            <div class="rightItem" v-for="(val,idx) of titleData" :key="idx">{{ setVal(val['key'],item) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import contentHeader from '@/common/view/contentHeader';
    import { getCarModelInfoBySeries } from '@/api/changeCar/index'
    export default {
        name: "home",
        data(){
            return {
                headHeight: 51,
                headwidth: 51,
                articleContent:{'content':'详细参数'},
                listData:[{}],
                titleData : [
                    {"name":"车型报价",'className':'titleItem title','key':'title'},
                    {"name":"厂商指导价","className":"titleItem",'key':'guidePrice'},
                    {"name":"经销商报价","className":"titleItem",'key':'guidePrice'},
                    {"name":"最大降幅","className":"titleItem",'key':'guidePrice'},
                    {"name":"主要参数","className":"titleItem title",'key':'title'},
                    {"name":"车身结构","className":"titleItem",'key':'modelBody&bodystructure'},
                    {"name":"驱动方式","className":"titleItem",'key':'modelChassis&drivetype'},
                    {"name":"排量(ml)","className":"titleItem",'key':'modelEngine&outputvolume'},
                    {"name":"变速器形式","className":"titleItem",'key':'guidePrice'},
                    {"name":"最高车速(km/h)","className":"titleItem",'key':'model&maxSpeed'},
                    {"name":"100公里加速时间(s)","className":"titleItem",'key':'guidePrice'},
                    {"name":"综合油耗(L/100km)","className":"titleItem",'key':'guidePrice'},
                    {"name":"整车整备质量(kg)","className":"titleItem",'key':'guidePrice'},
                    {"name":"保修里程","className":"titleItem",'key':'guidePrice'},
                    {"name":"能源类型","className":"titleItem",'key':'guidePrice'},
                    {"name":"车型结构","className":"titleItem title",'key':'title'},
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
                    {"name":"发动机","className":"titleItem title",'key':'title'},
                    {"name":"发动机型号","className":"titleItem bg",'key':'guidePrice'},
                    {"name":"排量(ml)","className":"titleItem bg",'key':'guidePrice'},
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
                let arr = []
                if(res.data && res.data.length > 0){
                    arr.push(res.data[0])
                    this.listData = arr
                    this.$nextTick(()=>{
                        this.headHeight = this.$refs.rightHead[0].offsetHeight
                        this.headwidth = this.$refs.rightHead[0].offsetWidth
                    })
                }else{
                     this.$toast({
                        message: '暂无数据',
                        position: 'bottom',
                        duration: 2000
                    });
                }
            })
        },
        computed:{
            bodyHeight(){
                return 'calc(100% - ' + this.headHeight
            }
        },
        components: {
            contentHeader
        },
        methods:{
            setVal(key,data){
                switch(key){
                    case 'title' :
                        return ' '
                    default:
                        if(key.indexOf("&")>-1){
                            let str = ''
                            key.split('&').map( v => str+="[\'"+v+"\']" )
                            return eval(`data${str}`)
                        }else{
                            return data[key]
                        }
                    break
                }
            },
            scrollTest(data){
                console.log(data)
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
    .contentBox
        height calc(100% - 3rem)
        box-sizing border-box
    .rightItem,.titleItem
        padding .5rem
        font-size 10px
        height 3rem
        display: flex;
        align-items: center;
        justify-content: center;
    .titleItem
        justify-content space-around
    .titleItem.title{
        width 100vw
        border-top 1px solid #ddd
        background #fff
        position relative
        z-index 10
    }
    .outermost-layer
        height 100%
        *
            box-sizing border-box
        .top
            display flex
            border-bottom 1px solid #ddd
            >div
                vertical-align top
                display inline-block
            .top-box
                width 6rem
                clear both
                border-right 1px solid #ddd
            .top-head
                overflow-x auto 
                white-space nowrap
                border-right 1px solid #ddd
                >div
                    display inline-block
                .right-title
                    max-width: 10rem;
                    padding: 1rem .5rem;
                    white-space: normal;
                    text-align left

                    .carOffer
                        color red
                    .carName
                        font-size 13px
        .bottom
            overflow-y auto
            >div
                display flex
                .bottom-title
                    width 6rem
                    >div
                        border-bottom 1px solid #ddd
                        border-right 1px solid #ddd
                .bottom-body
                    white-space nowrap
                    overflow-x scroll 
                    >div
                        display inline-block
                        flex-direction column
                        .rightItem
                            border-bottom 1px solid #ddd
                            border-right 1px solid #ddd

                        

</style>

<style scoped >
    .outermost-layer {
        box-sizing:border-box;
        background-color: white;
        padding: 0px;
    }

</style>