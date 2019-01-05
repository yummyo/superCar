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