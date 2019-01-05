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
                    {"name":"变速器",'className':'titleItem title','key':'title'},
                    {"name":"简称",'className':'titleItem','key':'modelGearbox/gearbox'},
                    {"name":"档位数",'className':'titleItem','key':' '},
                    {"name":"变速器形式",'className':'titleItem','key':' '},
                    {"name":"底盘转向",'className':'titleItem title','key':'title'},
                    {"name":"驱动方式",'className':'titleItem','key':'modelChassis/drivetype'},
                    {"name":"前悬挂",'className':'titleItem','key':'modelChassis/fronthangtype'},
                    {"name":"后悬挂",'className':'titleItem','key':'modelChassis/backhangtype'},
                    {"name":"转向助力类型",'className':'titleItem','key':'modelChassis/supporttype'},
                    {"name":"电磁感应悬架",'className':'titleItem','key':' '},
                    {"name":"车体结构",'className':'titleItem','key':'modelChassis/bodystructure'},
                    {"name":"车轮制动",'className':'titleItem title','key':'title'},
                    {"name":"前制动器",'className':'titleItem','key':'modelWheel/frontbraketype'},
                    {"name":"后制动器",'className':'titleItem','key':'modelWheel/backbraketype'},
                    {"name":"驻车制动类型",'className':'titleItem','key':'modelWheel/parkbraketype'},
                    {"name":"前轮胎规格",'className':'titleItem','key':'modelWheel/fronttyrespec'},
                    {"name":"后轮胎规格",'className':'titleItem','key':'modelWheel/backtyrespec'},
                    {"name":"备胎规格",'className':'titleItem','key':'modelWheel/tiretyrespec'},
                    {"name":"安全性能",'className':'titleItem title','key':'title'},
                    {"name":"安全带未系警告提示",'className':'titleItem','key':'modelSafe/safebelttips'},
                    {"name":"刹车防抱死系统(ABS)",'className':'titleItem','key':'modelControll/absbrake'},
                    {"name":"制动力分配(EBD/CBC等)",'className':'titleItem','key':'modelControll/brakeallot'},
                    {"name":"刹车辅助(EBA/BAS/BA等)",'className':'titleItem','key':'modelControll/brakeauxiliary'},
                    {"name":"牵引力控制(ASR/TCS/TRC)",'className':'titleItem','key':'modelControll/tractioncontroll'},
                    {"name":"车身稳定控制(ESP/DSC/VSC)",'className':'titleItem','key':'modelControll/bodystablecontroll'},
                    {"name":"上坡辅助",'className':'titleItem','key':'modelControll/upauxiliary'},
                    {"name":"自动驻车",'className':'titleItem','key':'modelControll/autopark'},
                    {"name":"陡坡缓降",'className':'titleItem','key':'modelControll/steepslopedown'},
                    {"name":"可变悬架",'className':'titleItem','key':'modelControll/variablehang'},
                    {"name":"空气悬架",'className':'titleItem','key':'modelControll/airhang'},
                    {"name":"可变转向比",'className':'titleItem','key':'modelControll/trunratio'},
                    {"name":"前桥限滑差速器",'className':'titleItem','key':' '},
                    {"name":"中央差速器锁止功能",'className':'titleItem','key':' '},
                    {"name":"后桥限滑差速器",'className':'titleItem','key':' '},
                    {"name":"差速锁",'className':'titleItem','key':' '},
                    {"name":"遥控钥匙",'className':'titleItem','key':'modelSafe/remotecontrolkey'},
                    {"name":"无钥匙进入",'className':'titleItem','key':'modelSafe/nokeystartsys'},
                    {"name":"智能胎压监视系统",'className':'titleItem','key':' '},
                    {"name":"零胎压继续行驶",'className':'titleItem','key':'modelSafe/notriekeeprun'},
                    {"name":"ISO FIX儿童座椅接口",'className':'titleItem','key':'modelSafe/isochildreninter'},
                    {"name":"驾驶室安全气囊",'className':'titleItem','key':'modelSafe/driveseatsafegasbag'},
                    {"name":"副驾驶安全气囊",'className':'titleItem','key':'modelSafe/copilotsafegasbag'},
                    {"name":"前排侧安全气囊",'className':'titleItem','key':'modelSafe/frontsidegasbag'},
                    {"name":"后排侧安全气囊",'className':'titleItem','key':'modelSafe/backsidegasbag'},
                    {"name":"前排头部气囊",'className':'titleItem','key':'modelSafe/frontheadgasbag'},
                    {"name":"后排头部气囊",'className':'titleItem','key':'modelSafe/backheadgasbag'},
                    {"name":"驾驶员膝部气囊",'className':'titleItem','key':'modelSafe/kneegasbag'},
                    {"name":"电子防盗系统",'className':'titleItem','key':'modelSafe/engineeleguard'},
                    {"name":"车内中控锁",'className':'titleItem','key':'modelSafe/incarmidlock'},
                    {"name":"无钥匙启动",'className':'titleItem','key':'modelSafe/nokeystartsys'},
                    {"name":"外饰装备",'className':'titleItem title','key':'title'},
                    {"name":"后视镜记忆",'className':'titleItem ','key':'modelGlass/rearviewmomory'},
                    {"name":"灯光特色功能",'className':'titleItem ','key':' '},
                    {"name":"防紫外线",'className':'titleItem ','key':'modelGlass/ultravioletproofglass'},
                    {"name":"外后视镜电动调节",'className':'titleItem ','key':'modelGlass/rearviewpoweradjust'},
                    {"name":"外后视镜电动折叠",'className':'titleItem ','key':'modelGlass/rearviewautofold'},
                    {"name":"防紫外线/隔热玻璃",'className':'titleItem ','key':'modelGlass/ultravioletproofglass'},
                    {"name":"运动外观套件",'className':'titleItem ','key':'modelOutconfig/sportoutsuite'},
                    {"name":"铝合金轮毂",'className':'titleItem ','key':'modelOutconfig/alloywheel'},
                    {"name":"侧滑门",'className':'titleItem ','key':' '},
                    {"name":"电动吸合门",'className':'titleItem ','key':'modelOutconfig/powerdoor'},
                    {"name":"后视镜加热",'className':'titleItem ','key':'modelGlass/rearviewheat'},
                    {"name":"电动后备箱",'className':'titleItem ','key':'modelGlass/rearviewheat'},
                    {"name":"感应后备箱",'className':'titleItem ','key':' '},
                    {"name":"车顶行李架",'className':'titleItem ','key':' '},
                    {"name":"远光灯",'className':'titleItem ','key':' '},
                    {"name":"近光灯",'className':'titleItem ','key':' '},
                    {"name":"日间行车灯",'className':'titleItem ','key':'modelLighting/dayrunlight'},
                    {"name":"自动车灯",'className':'titleItem ','key':' '},
                    {"name":"自适应远近光",'className':'titleItem ','key':' '},
                    {"name":"转向车头(辅助灯)",'className':'titleItem ','key':'modelLighting/trunauxiliarylight'},
                    {"name":"前雾灯",'className':'titleItem ','key':'modelLighting/frontfoglight'},
                    {"name":"大灯高度调节",'className':'titleItem ','key':' '},
                    {"name":"大灯清洗装置",'className':'titleItem ','key':'modelLighting/lightclean'},
                    {"name":"方向盘",'className':'titleItem title','key':'title'},
                    {"name":"真皮方向盘",'className':'titleItem ','key':'modelInconfig/dermissteering'},
                    {"name":"方向盘记忆功能",'className':'titleItem ','key':' '},
                    {"name":"多功能方向盘",'className':'titleItem ','key':'modelInconfig/multifunctionsteering'},
                    {"name":"换挡拨片",'className':'titleItem ','key':' '},
                    {"name":"电动调节方向盘",'className':'titleItem ','key':'modelInconfig/steeringpoweradjust'},
                    {"name":"方向盘加热",'className':'titleItem ','key':' '},
                    {"name":"定速巡航",'className':'titleItem ','key':'modelInconfig/cruisecontrol'},
                    {"name":"前驻车雷达",'className':'titleItem ','key':' '},
                    {"name":"后驻车雷达",'className':'titleItem ','key':' '},
                    {"name":"倒车影像",'className':'titleItem ','key':' '},
                    {"name":"控制台",'className':'titleItem title','key':'title'},
                    {"name":"全液晶仪表盘",'className':'titleItem','key':' '},
                    {"name":"HUD超视距抬头显示",'className':'titleItem','key':'modelInconfig/hudriseview'},
                    {"name":"行车电脑屏",'className':'titleItem','key':'modelInconfig/drivecomputer'},
                    {"name":"全液晶仪表盘",'className':'titleItem','key':' '},
                    {"name":"座椅",'className':'titleItem title','key':'title'},
                    {"name":"座椅布局",'className':'titleItem','key':' '},
                    {"name":"运动风格座椅",'className':'titleItem','key':'modelChair/sportseat'},
                    {"name":"座椅高低调节",'className':'titleItem','key':'modelChair/heighadjust'},
                    {"name":"腰部支撑调节",'className':'titleItem','key':'modelChair/driveseatwaistbrace'},
                    {"name":"肩部支撑调节",'className':'titleItem','key':'modelChair/shoulderbraceadjust'},
                    {"name":"主驾驶座电动调节",'className':'titleItem','key':' '},
                    {"name":"副驾驶座电动调节",'className':'titleItem','key':' '},
                    {"name":"第二排靠背角度调节",'className':'titleItem','key':'modelChair/secondrowangleadjust'},
                    {"name":"副驾驶位后排可调节按钮",'className':'titleItem','key':' '},
                    {"name":"第二排座椅移动",'className':'titleItem','key':'modelChair/secondrowseatmove'},
                    {"name":"后排座椅电动调节",'className':'titleItem','key':'modelChair/backseatproweradjust'},
                    {"name":"第二排独立座椅",'className':'titleItem','key':' '},
                    {"name":"座椅记忆功能",'className':'titleItem','key':' '},
                    {"name":"前排座椅加热",'className':'titleItem','key':'modelChair/frontseatheat'},
                    {"name":"后排座椅加热",'className':'titleItem','key':'modelChair/backseatheat'},
                    {"name":"前排座椅通风",'className':'titleItem','key':'modelChair/seatair'},
                    {"name":"后排座椅通风",'className':'titleItem','key':' '},
                    {"name":"第三排座椅",'className':'titleItem','key':'modelChair/thirdseat'},
                    {"name":"后排座椅放到方式",'className':'titleItem','key':' '},
                    {"name":"前排中央扶手",'className':'titleItem','key':'modelChair/frontcentrearmrest'},
                    {"name":"后排中央扶手",'className':'titleItem','key':'modelChair/backcentrearmrest'},
                    {"name":"后排杯架",'className':'titleItem','key':'modelChair/backcupholder'},
                    {"name":"可加热/制冷杯架",'className':'titleItem','key':'modelChair/backcupholder'},
                    {"name":"多媒体配置",'className':'titleItem title','key':'title'},
                    {"name":"道路救援呼叫",'className':'titleItem','key':' '},
                    {"name":"语音识别控制系统",'className':'titleItem','key':' '},
                    {"name":"GPS导航系统",'className':'titleItem','key':'modelMultimedia&gpsnavigation'},
                    {"name":"定位互动服务",'className':'titleItem','key':'modelMultimedia&locationinteractservice'},
                    {"name":"液晶中控大屏",'className':'titleItem','key':'modelMultimedia&controlcolourscreen'},
                    {"name":"屏幕尺寸",'className':'titleItem','key':' '},
                    {"name":"蓝牙/车载电话",'className':'titleItem','key':'modelMultimedia&carphone'},
                    {"name":"车载TV系统",'className':'titleItem','key':' '},
                    {"name":"手机互联/映射",'className':'titleItem','key':' '},
                    {"name":"后排液晶屏",'className':'titleItem','key':'modelMultimedia/backliquidscreen'},
                    {"name":"车联网",'className':'titleItem','key':' '},
                    {"name":"220V/230V电源",'className':'titleItem','key':' '},
                    {"name":"CD/DVD",'className':'titleItem','key':'modelMultimedia/mutidvd'},
                    {"name":"多媒体系统",'className':'titleItem','key':' '},
                    {"name":"CD支持MP3/WMA",'className':'titleItem','key':' '},
                    {"name":"音箱品牌",'className':'titleItem','key':' '},
                    {"name":"扬声器数量",'className':'titleItem','key':' '},
                    {"name":"玻璃/后视镜",'className':'titleItem title','key':'title'},
                    {"name":"车载冰箱",'className':'titleItem','key':'modelAir&vehicleFridge'},
                    {"name":"车内氛围灯",'className':'titleItem','key':'modelLighting&incaratmospherelight'},
                    {"name":"内置行车记录仪",'className':'titleItem','key':' '},
                    {"name":"多层隔音玻璃",'className':'titleItem','key':'modelGlass&ultravioletproofglass'},
                    {"name":"前电动车窗",'className':'titleItem','key':'modelGlass&frontpowerwindow'},
                    {"name":"后电动车窗",'className':'titleItem','key':'modelGlass&backpowerwindow'},
                    {"name":"车窗一键升降",'className':'titleItem','key':' '},
                    {"name":"车窗防夹手",'className':'titleItem','key':'modelGlass&windownocliphand'},
                    {"name":"后视镜自动防眩目",'className':'titleItem','key':'modelGlass&rearviewautoblinding'},
                    {"name":"流媒体车内后视镜",'className':'titleItem','key':' '},
                    {"name":"后风挡遮阳帘",'className':'titleItem','key':'modelGlass&backsunshade'},
                    {"name":"后排侧遮阳帘",'className':'titleItem','key':'modelGlass&backsidesunshade'},
                    {"name":"后排隐私玻璃",'className':'titleItem','key':'modelGlass&backsidesunshade'},
                    {"name":"遮阳板化妆镜",'className':'titleItem','key':'modelGlass&sunvisor'},
                    {"name":"后窗雨刷",'className':'titleItem','key':'modelGlass&backwiper'},
                    {"name":"雨刷传感器",'className':'titleItem','key':'modelGlass&wipersensor'},
                    {"name":"空调系统",'className':'titleItem title','key':'title'},
                    {"name":"空调控制方式",'className':'titleItem','key':' '},
                    {"name":"后排独立空调",'className':'titleItem','key':'modelAir&backAir'},
                    {"name":"后排独立出风口",'className':'titleItem','key':'modelAir&backAirOutlet'},
                    {"name":"温湿分区控制",'className':'titleItem','key':'modelAir&temperPartition'},
                    {"name":"车内空气调节/花粉过滤",'className':'titleItem','key':'modelAir&airFilter'},
                    {"name":"车载空气净化器",'className':'titleItem','key':' '},
                    {"name":"高科技配置",'className':'titleItem title','key':'title'},
                    {"name":"自动驾驶技术",'className':'titleItem','key':' '},
                    {"name":"整体主动转向",'className':'titleItem','key':'modelTech&activetrunsys'},
                    {"name":"主动车身控制",'className':'titleItem','key':'modelControll&bodystablecontroll'},
                    {"name":"疲劳提醒系统",'className':'titleItem','key':' '},
                    {"name":"远程启动发电机",'className':'titleItem','key':' '},
                    {"name":"自动泊车",'className':'titleItem','key':'modelTech&autoparkentry'},
                    {"name":"发动机启停技术",'className':'titleItem','key':' '},
                    {"name":"并线辅助",'className':'titleItem','key':'modelTech&plyingauxiliary'},
                    {"name":"车道偏离预警系统",'className':'titleItem','key':' '},
                    {"name":"主动刹车",'className':'titleItem','key':' '},
                    {"name":"夜视系统",'className':'titleItem','key':'modelTech&nightvisionsys'},
                    {"name":"中控液晶屏分屏显示",'className':'titleItem','key':'modelTech&centerliquidsplitscreen'},
                    {"name":"自适应巡航",'className':'titleItem','key':'modelTech&selfadaptcruise'},
                    {"name":"全景摄像头",'className':'titleItem','key':'modelTech&allviewcamera'},
                    {"name":"主动降噪",'className':'titleItem','key':' '},
                    {"name":"手机无线充电",'className':'titleItem','key':' '},
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