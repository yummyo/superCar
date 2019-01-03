<template>
    <div class="outermost-layer">
        <contentHeader :listdata='articleContent'></contentHeader>
        <div class="contentBox">
            <div class="top">
                <div class="top-box" :style="{height: `${headHeight}px`}"></div>
                <div class="top-head" id="rightTitle"  onscroll="rightBodyId.scrollLeft = this.scrollLeft">
                    <div  v-for="(item,index) of listData" :key="index" class="right-title" ref='rightHead' >
                    <p class="carName">{{ item['model'] ? item['model']['carName'] : '' }}</p>
                    <p class="carOffer">{{ item['model'] ? item['model']['guidePrice'] : '' }}</p>
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
                listData:[],
                titleData : [
                    {"name":"车型报价",'className':'titleItem title','key':'title'},
                    {"name":"厂商指导价","className":"titleItem",'key':'model&guidePrice'},
                    {"name":"经销商报价","className":"titleItem",'key':''},
                    {"name":"最大降幅","className":"titleItem",'key':''},
                    {"name":"主要参数","className":"titleItem title",'key':'title'},
                    {"name":"车身结构","className":"titleItem",'key':'modelBody&bodyStructure'},
                    {"name":"驱动方式","className":"titleItem",'key':'modelChassis&drivetype'},
                    {"name":"排量(ml)","className":"titleItem",'key':'modelEngine&outputvolume'},
                    {"name":"变速器形式","className":"titleItem",'key':''},
                    {"name":"最高车速(km/h)","className":"titleItem",'key':'model&maxSpeed'},
                    {"name":"100公里加速时间(s)","className":"titleItem",'key':'model&actSpeedup100'},
                    {"name":"综合油耗(L/100km)","className":"titleItem",'key':'model&actOilwear'},
                    {"name":"整车整备质量(kg)","className":"titleItem",'key':'modelBody&weight'},
                    {"name":"保修里程","className":"titleItem",'key':''},
                    {"name":"能源类型","className":"titleItem",'key':''},
                    {"name":"车型结构","className":"titleItem title",'key':'title'},
                    {"name":"长(mm)","className":"titleItem",'key':'modelBody&length'},
                    {"name":"宽(mm)","className":"titleItem",'key':'modelBody&width'},
                    {"name":"高(mm)","className":"titleItem",'key':'modelBody&heigh'},
                    {"name":"轴距(mm)","className":"titleItem",'key':'modelBody&wheelbase'},
                    {"name":"轮距(前)(mm)","className":"titleItem",'key':'modelBody&frontwheelbase'},
                    {"name":"轮距(后)(mm)","className":"titleItem",'key':'modelBody&backwheelbase'},
                    {"name":"最小离地间隙(mm)","className":"titleItem",'key':'modelBody&minoffground'},
                    {"name":"座位数(座)","className":"titleItem",'key':'modelBody&seatnum'},
                    {"name":"车门数(个)","className":"titleItem",'key':'modelBody&cardoornum'},
                    {"name":"油箱容积(升)","className":"titleItem",'key':'modelBody&oilvolume'},
                    {"name":"行李箱容积(升)","className":"titleItem",'key':'modelBody&luggagevolume'},
                    {"name":"保修里程","className":"titleItem",'key':''},
                    {"name":"整车整备质量(kg)","className":"titleItem",'key':'modelBody&weight'},
                    {"name":"最大载重质量(kg)","className":"titleItem",'key':''},
                    {"name":"货箱尺寸(mm)","className":"titleItem",'key':''},
                    {"name":"发动机","className":"titleItem title",'key':'title'},
                    {"name":"发动机型号","className":"titleItem bg",'key':'modelEngine&engineversion'},
                    {"name":"排量(ml)","className":"titleItem bg",'key':'modelEngine&outputvolume'},
                    {"name":"进气形式","className":"titleItem bg",'key':'modelEngine&inletform'},
                    {"name":"气缸排列形式","className":"titleItem bg",'key':'modelEngine&enginearray'},
                    {"name":"气缸数(个)","className":"titleItem bg",'key':'modelEngine&cylindernum'},
                    {"name":"每缸气门数(ml)","className":"titleItem bg",'key':'modelEngine&airdoor'},
                    {"name":"气缸压缩比","className":"titleItem bg",'key':'modelEngine&compressratio'},
                    {"name":"配气机构","className":"titleItem bg",'key':'modelEngine&admissiongear'},
                    {"name":"缸径(mm)","className":"titleItem bg",'key':'modelEngine&bore'},
                    {"name":"冲程(mm)","className":"titleItem bg",'key':'modelEngine&travle'},
                    {"name":"最大马力(ps)","className":"titleItem bg",'key':'modelEngine&maxhorsepower'},
                    {"name":"最大功率(kw)","className":"titleItem bg",'key':'modelEngine&maxpower'},
                    {"name":"最大功率转速(rpm)","className":"titleItem bg",'key':'modelEngine&maxpowerspeed'},
                    {"name":"最大扭矩(n.m)","className":"titleItem bg",'key':'modelEngine&maxtorque'},
                    {"name":"最大扭矩转速(rpm)","className":"titleItem bg",'key':'modelEngine&maxtorquespeed'},
                    {"name":"发动机特有技术","className":"titleItem bg",'key':'modelEngine&enginespecifictech'},
                    {"name":"燃料种类","className":"titleItem bg",'key':'modelEngine&oiltype'},
                    {"name":"燃油标号","className":"titleItem bg",'key':'modelEngine&oilnum'},
                    {"name":"燃油供给方式","className":"titleItem bg",'key':'modelEngine&olisupplymode'},
                    {"name":"缸体材料","className":"titleItem bg",'key':'modelEngine&cylinderboeymaterial'},
                    {"name":"缸盖材料","className":"titleItem bg",'key':'modelEngine&cylindercapmaterial'},
                    {"name":"排放标准","className":"titleItem bg",'key':'modelEngine&envirstandard'},
                    {"name":"电动机/电池","className":"titleItem",'key':'title'},
                    {"name":"系统综合功率(KW)","className":"titleItem",'key':''},
                    {"name":"系统综合扭矩(N·m)","className":"titleItem",'key':''},
                    {"name":"快充电量(%)","className":"titleItem",'key':''},
                    {"name":"充电桩价格","className":"titleItem",'key':''},
                    {"name":"电池充电时间","className":"titleItem",'key':''},
                    {"name":"电机类型","className":"titleItem",'key':''},
                    {"name":"电动机总功率(KW)","className":"titleItem bg",'key':''},
                    {"name":"电动机总扭矩(N·m)","className":"titleItem bg",'key':''},
                    {"name":"前电动机最大功率(KW)","className":"titleItem bg",'key':''},
                    {"name":"前电动机最大扭矩(N·m)","className":"titleItem bg",'key':''},
                    {"name":"后电动机最大功率(KW)","className":"titleItem bg",'key':''},
                    {"name":"后电动机最大扭矩(N·m)","className":"titleItem bg",'key':''},
                    {"name":"纯电最大续航里程(KM)","className":"titleItem bg",'key':''},
                    {"name":"电池容量(KWh)","className":"titleItem bg",'key':''},
                    {"name":"电池类型","className":"titleItem bg",'key':''},
                    {"name":"普通充满电时间(h)","className":"titleItem bg",'key':''},
                    {"name":"快速充满电时间(h)","className":"titleItem bg",'key':''},
                    {"name":"百公里耗电量(kWh/100km)","className":"titleItem bg",'key':''},
                    {"name":"电池保修年限","className":"titleItem bg",'key':''},
                    {"name":"支持家用电压充电","className":"titleItem bg",'key':''},
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
                if(res.data && res.data.length > 0){
                    this.listData = res.data
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
                            let val = ''
                            try{
                                val = eval(`data${str}`);
                            }catch (e){
                                val = '--'
                            }
                            console.log(val)
                            return val
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
            // display flex
            border-bottom 1px solid #ddd
            font-size 0
            white-space nowrap
            >div
                vertical-align top
                display inline-block
                font-size 1rem
            .top-box
                width 6rem
                clear both
                border-right 1px solid #ddd
            .top-head
                overflow-x auto 
                white-space nowrap
                border-right 1px solid #ddd
                width calc(100% - 6rem)
                >div
                    display inline-block
                .right-title
                    max-width: 10rem;
                    padding: 1rem .5rem;
                    white-space: normal;
                    text-align left
                    border-right 1px solid #ddd
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