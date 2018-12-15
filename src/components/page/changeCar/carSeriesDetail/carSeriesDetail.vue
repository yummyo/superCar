<template>
  <div class="carSeriesDetail">
    <!-- 公共头部 -->
    <contentHeader :listdata='articleContent'></contentHeader>
    <div class="carSeriesTitle"  @click="toDO(3)">
      <img :src="carData.imgUrl" alt="">
      <span class="totalStyle">共{{ carData.imgSize }}张</span>
    </div>
    <div class="content">
       <div>
          <ul>
            <li class="redStyle">{{carData.minGuidePrice}}万起</li>
            <li class="Generation">指导价:{{ carData.minGuidePrice }}-{{ carData.maxGuidePrice }}万</li>
          </ul>
          <ul>
            <li class="typesStyle">级别:{{carData.seriesName || '中性轿车'}}</li>
            <li class="typesStyle">油耗:{{carData.minOilWear}}-{{carData.maxOilWear}}L</li>
          </ul>
       </div>
       <div>
          <div class="book" @click="toDO(1)">预约试驾</div>
          <!-- <div class="book">置换</div> -->
          <div class="price" @click="toDO(2)">询底价</div>
       </div>
    </div>
    <div class="contentList">
        <ul>
          <li>降价</li>
          <li @click="toDO(7)">参配</li>
          <li @click="toDO(5)">点评</li>
          <li @click="toDO(6)">资讯</li>
          <li>经销商</li>
        </ul>
    </div>
    <div class="levelGroup">
      <!-- 待售 停售 -->
      <ul>
        <li :class="{levelGroup_li:true,active:nowChangeLi == index}"  v-for="(item,index) of carData.levelGroupList" :key="index" @click="levelGroupClick(item,index)">
          {{ setName(item.type) }}
        </li>
      </ul>
      <motorcycle-type v-if='carData.levelGroupList' :listData='nowChangeLiData'></motorcycle-type>
    </div>
    <div class="btn">
      <button @click="toDO(4)">我要点评</button>
    </div>
  </div>
</template>

<script> 
import contentHeader from '@/common/view/contentHeader';
import { getCarModelListBySeries } from '@/api/changeCar/index'
import motorcycleType from './list/motorcycleType';
export default {
  data () {
    return{
      articleContent:{'content':this.$route.query.carSeriesName},
      carData: {},
      nowChangeLi:'0',
      nowChangeLiData:[]
    }
  },
  methods: {
    toDO(type){
      let _path = '';
      switch(type){
        case 1:
          // 预约试驾
          _path = 'makeDriver'
        break;
        case 2:
          // 询底价
          _path = 'floorPrice'
        break;
        case 3:
          // 图片列表
          _path = 'modelPictures'
        break;
        case 4:
          // 车系评论
          _path = 'carSeriesComment'
        break;
        case 5:
          // 车系评论列表
          _path = 'carSeriesCommentList'
        break;
        case 6:
          // 资讯页面
          _path = 'carArticleList'
        break;
        case 7:
          // 参配页面
          _path = 'paramDeploy'
        break;
      }
      this.$router.push({
        path:_path
      })
    },
    setName(val){
      switch(val*1){
        case 1:
          return '在售'
        break;
        case 2:
          return '待售'
        break;
        case 3:
          return '停售'
        break;
      }
    },
    levelGroupClick(item,index){
      this.nowChangeLi = index
      this.nowChangeLiData = item['carYearGroupList']
    }
  },
  created(){
    getCarModelListBySeries({
      data:{
        brandCode:this.$route.query.brandCode,
        seriesCode:this.$route.query.seriesCode
      }
    }).then(res => {
      res.data = {
        "id": null,
        "seriesCode": null,
        "seriesName": null,
        "seriesLevel": null,
        "minOilWear": "10.5", //最低油耗
        "maxOilWear": "10.8", //最高油耗
        "minGuidePrice": "32.80", //最低指导价
        "maxGuidePrice": "32.98", //最高指导价
        "imgUrl": null,
        "imgSize": 13, //图片大小
        "levelGroupList": [
          {
            "type": "1", //1-在售，2-待售，3-停售
            "carYearGroupList": [
              {
                "year": "2019", // 年款
                "carModelInfoBOList": [{ // 汽车车型列表
                    "model": {
                      "id": "377c35d2b5144f07ac574c164fe011a5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "level": "1",
                      "carYear": "2018",
                      "carName": "奥迪Q5 2018款 2.0T 汽油手动商务版",
                      "guidePrice": "32.98",
                      "maxSpeed": 210,
                      "officalSpeedup100": 0,
                      "actSpeedup100": 0,
                      "actStop100": "0",
                      "officalOilwear": "10.5",
                      "actOilwear": "0",
                      "carQuality": "五年或15万公里",
                      "carKeyword": "奥迪",
                      "marketTime": "2018.6",
                      "carDesc": "不可描述",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelAir": {
                      "id": "960c3b0628b4433b95cc90d5cfc1ec53",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "manualAir": "3",
                      "autoAir": "3",
                      "backAir": "3",
                      "backAirOutlet": "3",
                      "temperPartition": "3",
                      "airFilter": "3",
                      "vehicleFridge": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelBody": {
                      "id": "3c897fed357045a6af38cf91e9cb2918",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "length": "5100",
                      "width": "1840",
                      "heigh": "1970",
                      "wheelbase": "3080",
                      "frontWheelbase": "1570",
                      "backWheelbase": "1545",
                      "minOffGround": "160",
                      "weight": "2200",
                      "bodyStructure": "2",
                      "carDoorNum": "5",
                      "seatNum": "7",
                      "oilVolume": "80",
                      "luggageVolume": "300",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelChair": {
                      "id": "71db9a7e058c44f0b3519366000ed20c",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "dermisSeat": "3",
                      "sportSeat": "3",
                      "heighAdjust": "3",
                      "shoulderBraceAdjust": "3",
                      "frontSeatPowerdriven": "3",
                      "secondrowAngleAdjust": "3",
                      "secondrowSeatMove": "3",
                      "backSeatProwerAdjust": "3",
                      "prowerSeatMemory": "3",
                      "frontSeatHeat": "3",
                      "backSeatHeat": "3",
                      "seatAir": "3",
                      "seatMassage": "3",
                      "backSeatAlldown": "3",
                      "backSeatRatiodown": "3",
                      "thirdSeat": "3",
                      "driveseatWaistBrace": "3",
                      "frontCentreArmrest": "3",
                      "backCentreArmrest": "3",
                      "backCupholder": "3",
                      "prowerTrunk": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelChassis": {
                      "id": "a97d64ccdfea4ffaa78bc4c012885d13",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "driveType": "5",
                      "frontHangType": "扭杆弹簧独立悬架",
                      "backHangType": "螺旋弹簧式非独立悬架",
                      "supportType": "1",
                      "bodyStructure": "1",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelControll": {
                      "id": "014cd3c6d7a84caeaab544d605e514f4",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "absBrake": "3",
                      "brakeAllot": "3",
                      "brakeAuxiliary": "3",
                      "tractionControll": "3",
                      "bodyStableControll": "3",
                      "autoPark": "3",
                      "upAuxiliary": null,
                      "steepSlopeDown": "3",
                      "variableHang": "3",
                      "airHang": "3",
                      "trunRatio": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelEngine": {
                      "id": "cd03b0a56ffd406986216e3dd0d62fc5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "engineVersion": "2.0T 190马力 L4HFC4GA3-4D",
                      "outputVolume": "1997",
                      "inletForm": "3",
                      "engineArray": "5",
                      "cylinderNum": "4",
                      "airDoor": "4",
                      "compressRatio": "10:1",
                      "admissionGear": "1",
                      "bore": "-",
                      "travle": "-",
                      "maxHorsepower": "190",
                      "maxPower": "140",
                      "maxPowerSpeed": "5000",
                      "maxTorque": "290",
                      "maxTorqueSpeed": "1800-4000",
                      "oilType": "3",
                      "oilNum": "3",
                      "oliSupplyMode": "3",
                      "cylinderCapMaterial": "3",
                      "cylinderBoeyMaterial": "3",
                      "envirStandard": "3",
                      "engineSpecificTech": "-",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelGearbox": {
                      "id": "1daf6a4a9deb416ba8fdd8506d9104a5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "shelvesNum": "4",
                      "gearBox": "4",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelGlass": {
                      "id": "5680f13bbd23452997ba28a3f43c83e5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "frontPowerWindow": "3",
                      "backPowerWindow": "3",
                      "windowNoclipHand": "3",
                      "ultravioletProofGlass": "3",
                      "rearviewPowerAdjust": "3",
                      "rearviewHeat": "3",
                      "rearviewAutoBlinding": "3",
                      "backSunshade": "3",
                      "backSideSunshade": "3",
                      "sunVisor": "3",
                      "backWiper": "3",
                      "wiperSensor": "3",
                      "rearviewAutoFold": "3",
                      "rearviewMomory": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelInconfig": {
                      "id": "52623372b8e74d5896052a95ed3b1154",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "dermisSteering": "3",
                      "steeringUpdownAdjust": "3",
                      "steeringFrontbackAdjust": "3",
                      "steeringPowerAdjust": "3",
                      "multiFunctionSteering": "3",
                      "steeringShift": "3",
                      "cruiseControl": "3",
                      "parkAuxiliary": "3",
                      "backCarImage": "3",
                      "driveComputer": "3",
                      "hudRiseView": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelLighting": {
                      "id": "4899702ceda14f4f89986ec2181ae6a7",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "xenonLight": "3",
                      "dayRunLight": "3",
                      "autoHeadLight": "3",
                      "trunAuxiliaryLight": "3",
                      "frontFogLight": "3",
                      "lightClean": "3",
                      "incarAtmosphereLight": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelMultimedia": {
                      "id": "3304731ba2654bf7b83c98448d076b1d",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "gpsNavigation": "3",
                      "locationInteractService": "3",
                      "controlColourScreen": "3",
                      "manMachineInterSys": "3",
                      "builtinHarddisk": "3",
                      "carPhone": "3",
                      "carTv": "3",
                      "backLiquidScreen": "3",
                      "extAccessSound": "3",
                      "cd": "3",
                      "singleCd": "3",
                      "fictitiousMutiCd": "3",
                      "mutiCd": "3",
                      "mutiDvd": "3",
                      "dvd": "3",
                      "horn23": "3",
                      "horn45": "3",
                      "horn67": "3",
                      "hornLe8": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelOutconfig": {
                      "id": "bc674f0f9e624d95b287f9dd5ae82deb",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "lightHeighAdjust": "3",
                      "powerSkylight": "3",
                      "allViewSkylight": "3",
                      "sportOutSuite": "3",
                      "alloyWheel": "3",
                      "powerDoor": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelSafe": {
                      "id": "94be0713363b4ee992e2992b455b4f7e",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "driveSeatSafeGasbag": "3",
                      "copilotSafeGasbag": "3",
                      "frontSideGasbag": "3",
                      "backSideGasbag": "3",
                      "frontHeadGasbag": "3",
                      "backHeadGasbag": "3",
                      "kneeGasbag": "3",
                      "trieTesting": "3",
                      "notrieKeepRun": "3",
                      "safeBeltTips": "3",
                      "isoChildrenInter": "3",
                      "latchChildrenInter": "3",
                      "engineEleGuard": "3",
                      "incarMidLock": "3",
                      "remoteControlKey": "3",
                      "nokeyStartSys": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelTech": {
                      "id": "4906992504d94e7e94dd3923cb9b0565",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "autoParkEntry": "3",
                      "plyingAuxiliary": "3",
                      "activeSafeSys": "3",
                      "activeTrunSys": "3",
                      "nightVisionSys": "3",
                      "centerLiquidSplitScreen": "1",
                      "selfAdaptCruise": "1",
                      "allViewCamera": "1",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelWheel": {
                      "id": "8665300aaf4548f7aec0e500cc9cdfb6",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "frontBrakeType": "1",
                      "backBrakeType": "4",
                      "parkBrakeType": "1",
                      "frontTyreSpec": "225/60 R17",
                      "backTyreSpec": "225/60 R17",
                      "tireTyreSpec": null,
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    }
                  },
                  {
                    "model": {
                      "id": "acbdff75de5e4bd38a62b044f186c7b4",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "level": "1",
                      "carYear": "2018",
                      "carName": "2018奥迪Q5",
                      "guidePrice": "32.80",
                      "maxSpeed": 210,
                      "officalSpeedup100": 0,
                      "actSpeedup100": 0,
                      "actStop100": "0",
                      "officalOilwear": "10.8",
                      "actOilwear": "",
                      "carQuality": "",
                      "carKeyword": "",
                      "marketTime": "",
                      "carDesc": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelAir": {
                      "id": "85efee93c7264e3c932bf422e7adb786",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "manualAir": "",
                      "autoAir": "",
                      "backAir": "",
                      "backAirOutlet": "",
                      "temperPartition": "",
                      "airFilter": "",
                      "vehicleFridge": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelBody": {
                      "id": "a2aef1107af04b2b8078ba74ae283356",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "length": null,
                      "width": null,
                      "heigh": null,
                      "wheelbase": null,
                      "frontWheelbase": "",
                      "backWheelbase": "",
                      "minOffGround": "",
                      "weight": null,
                      "bodyStructure": "",
                      "carDoorNum": "",
                      "seatNum": "",
                      "oilVolume": "",
                      "luggageVolume": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelChair": {
                      "id": "3342f1fef71e43549f4e7beee77e9787",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "dermisSeat": "",
                      "sportSeat": "",
                      "heighAdjust": "",
                      "shoulderBraceAdjust": "",
                      "frontSeatPowerdriven": "",
                      "secondrowAngleAdjust": "",
                      "secondrowSeatMove": "",
                      "backSeatProwerAdjust": "",
                      "prowerSeatMemory": "",
                      "frontSeatHeat": "",
                      "backSeatHeat": "",
                      "seatAir": "",
                      "seatMassage": "",
                      "backSeatAlldown": "",
                      "backSeatRatiodown": "",
                      "thirdSeat": "",
                      "driveseatWaistBrace": "",
                      "frontCentreArmrest": "",
                      "backCentreArmrest": "",
                      "backCupholder": "",
                      "prowerTrunk": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelChassis": {
                      "id": "8a742b4741f8442c912510d73b5f707a",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "driveType": "",
                      "frontHangType": "",
                      "backHangType": "",
                      "supportType": "",
                      "bodyStructure": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelControll": {
                      "id": "b36c4b68e6b741dfa42ffed13321cbd2",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "absBrake": "",
                      "brakeAllot": "",
                      "brakeAuxiliary": "",
                      "tractionControll": "",
                      "bodyStableControll": "",
                      "autoPark": "",
                      "upAuxiliary": null,
                      "steepSlopeDown": "",
                      "variableHang": "",
                      "airHang": "",
                      "trunRatio": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelEngine": {
                      "id": "e05cdebf969f4c97b9d1ce14a05a7ca3",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "engineVersion": "",
                      "outputVolume": "",
                      "inletForm": "",
                      "engineArray": "",
                      "cylinderNum": "",
                      "airDoor": "",
                      "compressRatio": "",
                      "admissionGear": "",
                      "bore": null,
                      "travle": null,
                      "maxHorsepower": "",
                      "maxPower": "",
                      "maxPowerSpeed": "",
                      "maxTorque": "",
                      "maxTorqueSpeed": "",
                      "oilType": "",
                      "oilNum": "",
                      "oliSupplyMode": "",
                      "cylinderCapMaterial": "",
                      "cylinderBoeyMaterial": "",
                      "envirStandard": "",
                      "engineSpecificTech": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelGearbox": {
                      "id": "3b948c040b6642a9acbd5d04de9e163d",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "shelvesNum": "",
                      "gearBox": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelGlass": {
                      "id": "f06482b1abee42b1a4af28dd7ce89666",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "frontPowerWindow": "",
                      "backPowerWindow": "",
                      "windowNoclipHand": "",
                      "ultravioletProofGlass": "",
                      "rearviewPowerAdjust": "",
                      "rearviewHeat": "",
                      "rearviewAutoBlinding": "",
                      "backSunshade": "",
                      "backSideSunshade": "",
                      "sunVisor": "",
                      "backWiper": "",
                      "wiperSensor": "",
                      "rearviewAutoFold": "",
                      "rearviewMomory": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelInconfig": {
                      "id": "5ab47d654633482d8286ecf7fe1bf8c1",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "dermisSteering": "",
                      "steeringUpdownAdjust": "",
                      "steeringFrontbackAdjust": "",
                      "steeringPowerAdjust": "",
                      "multiFunctionSteering": "",
                      "steeringShift": "",
                      "cruiseControl": "",
                      "parkAuxiliary": "",
                      "backCarImage": "",
                      "driveComputer": "",
                      "hudRiseView": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelLighting": {
                      "id": "390b1d8485a14a6bac272d0e2c4c4905",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "xenonLight": "",
                      "dayRunLight": "",
                      "autoHeadLight": "",
                      "trunAuxiliaryLight": "",
                      "frontFogLight": "",
                      "lightClean": "",
                      "incarAtmosphereLight": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelMultimedia": {
                      "id": "058a362f952f455a8ade8fbff0c5dd54",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "gpsNavigation": "",
                      "locationInteractService": "",
                      "controlColourScreen": "",
                      "manMachineInterSys": "",
                      "builtinHarddisk": "",
                      "carPhone": "",
                      "carTv": "",
                      "backLiquidScreen": "",
                      "extAccessSound": "",
                      "cd": null,
                      "singleCd": "",
                      "fictitiousMutiCd": "",
                      "mutiCd": "",
                      "mutiDvd": "",
                      "dvd": null,
                      "horn23": "",
                      "horn45": "",
                      "horn67": "",
                      "hornLe8": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelOutconfig": {
                      "id": "898d9ed34bb24777b62ae7d59a04e5bb",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "lightHeighAdjust": "",
                      "powerSkylight": "",
                      "allViewSkylight": "",
                      "sportOutSuite": "",
                      "alloyWheel": "",
                      "powerDoor": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelSafe": {
                      "id": "ffab79ecb0b04b02895d9b4e44f62ba3",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "driveSeatSafeGasbag": "",
                      "copilotSafeGasbag": "",
                      "frontSideGasbag": "",
                      "backSideGasbag": "",
                      "frontHeadGasbag": "",
                      "backHeadGasbag": "",
                      "kneeGasbag": "",
                      "trieTesting": "",
                      "notrieKeepRun": "",
                      "safeBeltTips": "",
                      "isoChildrenInter": "",
                      "latchChildrenInter": "",
                      "engineEleGuard": "",
                      "incarMidLock": "",
                      "remoteControlKey": "",
                      "nokeyStartSys": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelTech": {
                      "id": "e2919e3d79ab456c9ae9f040c9ebb562",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "autoParkEntry": "",
                      "plyingAuxiliary": "",
                      "activeSafeSys": "",
                      "activeTrunSys": "",
                      "nightVisionSys": "",
                      "centerLiquidSplitScreen": "",
                      "selfAdaptCruise": "",
                      "allViewCamera": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    },
                    "modelWheel": {
                      "id": "80a82e1d0d28427a93e734f5249f34ca",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                      "frontBrakeType": "",
                      "backBrakeType": "",
                      "parkBrakeType": "",
                      "frontTyreSpec": "",
                      "backTyreSpec": "",
                      "tireTyreSpec": "",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T06:47:49.000+0000",
                      "updateUser": null,
                      "updateTime": null
                    }
                  }
                ]
              },
              {
                "year": "2018", // 年款
                "carModelInfoBOList": [{ // 汽车车型列表
                    "model": {
                      "id": "377c35d2b5144f07ac574c164fe011a5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "level": "1",
                      "carYear": "2018",
                      "carName": "奥迪Q5 2018款 2.0T 汽油手动商务版",
                      "guidePrice": "32.98",
                      "maxSpeed": 210,
                      "officalSpeedup100": 0,
                      "actSpeedup100": 0,
                      "actStop100": "0",
                      "officalOilwear": "10.5",
                      "actOilwear": "0",
                      "carQuality": "五年或15万公里",
                      "carKeyword": "奥迪",
                      "marketTime": "2018.6",
                      "carDesc": "不可描述",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelAir": {
                      "id": "960c3b0628b4433b95cc90d5cfc1ec53",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "manualAir": "3",
                      "autoAir": "3",
                      "backAir": "3",
                      "backAirOutlet": "3",
                      "temperPartition": "3",
                      "airFilter": "3",
                      "vehicleFridge": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelBody": {
                      "id": "3c897fed357045a6af38cf91e9cb2918",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "length": "5100",
                      "width": "1840",
                      "heigh": "1970",
                      "wheelbase": "3080",
                      "frontWheelbase": "1570",
                      "backWheelbase": "1545",
                      "minOffGround": "160",
                      "weight": "2200",
                      "bodyStructure": "2",
                      "carDoorNum": "5",
                      "seatNum": "7",
                      "oilVolume": "80",
                      "luggageVolume": "300",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelChair": {
                      "id": "71db9a7e058c44f0b3519366000ed20c",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "dermisSeat": "3",
                      "sportSeat": "3",
                      "heighAdjust": "3",
                      "shoulderBraceAdjust": "3",
                      "frontSeatPowerdriven": "3",
                      "secondrowAngleAdjust": "3",
                      "secondrowSeatMove": "3",
                      "backSeatProwerAdjust": "3",
                      "prowerSeatMemory": "3",
                      "frontSeatHeat": "3",
                      "backSeatHeat": "3",
                      "seatAir": "3",
                      "seatMassage": "3",
                      "backSeatAlldown": "3",
                      "backSeatRatiodown": "3",
                      "thirdSeat": "3",
                      "driveseatWaistBrace": "3",
                      "frontCentreArmrest": "3",
                      "backCentreArmrest": "3",
                      "backCupholder": "3",
                      "prowerTrunk": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelChassis": {
                      "id": "a97d64ccdfea4ffaa78bc4c012885d13",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "driveType": "5",
                      "frontHangType": "扭杆弹簧独立悬架",
                      "backHangType": "螺旋弹簧式非独立悬架",
                      "supportType": "1",
                      "bodyStructure": "1",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelControll": {
                      "id": "014cd3c6d7a84caeaab544d605e514f4",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "absBrake": "3",
                      "brakeAllot": "3",
                      "brakeAuxiliary": "3",
                      "tractionControll": "3",
                      "bodyStableControll": "3",
                      "autoPark": "3",
                      "upAuxiliary": null,
                      "steepSlopeDown": "3",
                      "variableHang": "3",
                      "airHang": "3",
                      "trunRatio": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelEngine": {
                      "id": "cd03b0a56ffd406986216e3dd0d62fc5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "engineVersion": "2.0T 190马力 L4HFC4GA3-4D",
                      "outputVolume": "1997",
                      "inletForm": "3",
                      "engineArray": "5",
                      "cylinderNum": "4",
                      "airDoor": "4",
                      "compressRatio": "10:1",
                      "admissionGear": "1",
                      "bore": "-",
                      "travle": "-",
                      "maxHorsepower": "190",
                      "maxPower": "140",
                      "maxPowerSpeed": "5000",
                      "maxTorque": "290",
                      "maxTorqueSpeed": "1800-4000",
                      "oilType": "3",
                      "oilNum": "3",
                      "oliSupplyMode": "3",
                      "cylinderCapMaterial": "3",
                      "cylinderBoeyMaterial": "3",
                      "envirStandard": "3",
                      "engineSpecificTech": "-",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelGearbox": {
                      "id": "1daf6a4a9deb416ba8fdd8506d9104a5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "shelvesNum": "4",
                      "gearBox": "4",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:14.000+0000"
                    },
                    "modelGlass": {
                      "id": "5680f13bbd23452997ba28a3f43c83e5",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "frontPowerWindow": "3",
                      "backPowerWindow": "3",
                      "windowNoclipHand": "3",
                      "ultravioletProofGlass": "3",
                      "rearviewPowerAdjust": "3",
                      "rearviewHeat": "3",
                      "rearviewAutoBlinding": "3",
                      "backSunshade": "3",
                      "backSideSunshade": "3",
                      "sunVisor": "3",
                      "backWiper": "3",
                      "wiperSensor": "3",
                      "rearviewAutoFold": "3",
                      "rearviewMomory": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelInconfig": {
                      "id": "52623372b8e74d5896052a95ed3b1154",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "dermisSteering": "3",
                      "steeringUpdownAdjust": "3",
                      "steeringFrontbackAdjust": "3",
                      "steeringPowerAdjust": "3",
                      "multiFunctionSteering": "3",
                      "steeringShift": "3",
                      "cruiseControl": "3",
                      "parkAuxiliary": "3",
                      "backCarImage": "3",
                      "driveComputer": "3",
                      "hudRiseView": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelLighting": {
                      "id": "4899702ceda14f4f89986ec2181ae6a7",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "xenonLight": "3",
                      "dayRunLight": "3",
                      "autoHeadLight": "3",
                      "trunAuxiliaryLight": "3",
                      "frontFogLight": "3",
                      "lightClean": "3",
                      "incarAtmosphereLight": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelMultimedia": {
                      "id": "3304731ba2654bf7b83c98448d076b1d",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "gpsNavigation": "3",
                      "locationInteractService": "3",
                      "controlColourScreen": "3",
                      "manMachineInterSys": "3",
                      "builtinHarddisk": "3",
                      "carPhone": "3",
                      "carTv": "3",
                      "backLiquidScreen": "3",
                      "extAccessSound": "3",
                      "cd": "3",
                      "singleCd": "3",
                      "fictitiousMutiCd": "3",
                      "mutiCd": "3",
                      "mutiDvd": "3",
                      "dvd": "3",
                      "horn23": "3",
                      "horn45": "3",
                      "horn67": "3",
                      "hornLe8": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:11.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelOutconfig": {
                      "id": "bc674f0f9e624d95b287f9dd5ae82deb",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "lightHeighAdjust": "3",
                      "powerSkylight": "3",
                      "allViewSkylight": "3",
                      "sportOutSuite": "3",
                      "alloyWheel": "3",
                      "powerDoor": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelSafe": {
                      "id": "94be0713363b4ee992e2992b455b4f7e",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "driveSeatSafeGasbag": "3",
                      "copilotSafeGasbag": "3",
                      "frontSideGasbag": "3",
                      "backSideGasbag": "3",
                      "frontHeadGasbag": "3",
                      "backHeadGasbag": "3",
                      "kneeGasbag": "3",
                      "trieTesting": "3",
                      "notrieKeepRun": "3",
                      "safeBeltTips": "3",
                      "isoChildrenInter": "3",
                      "latchChildrenInter": "3",
                      "engineEleGuard": "3",
                      "incarMidLock": "3",
                      "remoteControlKey": "3",
                      "nokeyStartSys": "3",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelTech": {
                      "id": "4906992504d94e7e94dd3923cb9b0565",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "autoParkEntry": "3",
                      "plyingAuxiliary": "3",
                      "activeSafeSys": "3",
                      "activeTrunSys": "3",
                      "nightVisionSys": "3",
                      "centerLiquidSplitScreen": "1",
                      "selfAdaptCruise": "1",
                      "allViewCamera": "1",
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    },
                    "modelWheel": {
                      "id": "8665300aaf4548f7aec0e500cc9cdfb6",
                      "brandCode": "AD",
                      "seriesCode": "Q5",
                      "modelId": "377c35d2b5144f07ac574c164fe011a5",
                      "frontBrakeType": "1",
                      "backBrakeType": "4",
                      "parkBrakeType": "1",
                      "frontTyreSpec": "225/60 R17",
                      "backTyreSpec": "225/60 R17",
                      "tireTyreSpec": null,
                      "isDelete": "N",
                      "createUser": "1234",
                      "createTime": "2018-11-20T09:44:12.000+0000",
                      "updateUser": "1234",
                      "updateTime": "2018-11-22T12:46:15.000+0000"
                    }
                  }
                ]
              },
            ]
          },
          {
            "type": "2", //1-在售，2-待售，3-停售
            "carYearGroupList": [{
              "year": "2018", // 年款
              "carModelInfoBOList": [{ // 汽车车型列表
                  "model": {
                    "id": "377c35d2b5144f07ac574c164fe011a5",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "level": "1",
                    "carYear": "2018",
                    "carName": "奥迪Q5 2018款 2.0T 汽油手动商务版",
                    "guidePrice": "32.98",
                    "maxSpeed": 210,
                    "officalSpeedup100": 0,
                    "actSpeedup100": 0,
                    "actStop100": "0",
                    "officalOilwear": "10.5",
                    "actOilwear": "0",
                    "carQuality": "五年或15万公里",
                    "carKeyword": "奥迪",
                    "marketTime": "2018.6",
                    "carDesc": "不可描述",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelAir": {
                    "id": "960c3b0628b4433b95cc90d5cfc1ec53",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "manualAir": "3",
                    "autoAir": "3",
                    "backAir": "3",
                    "backAirOutlet": "3",
                    "temperPartition": "3",
                    "airFilter": "3",
                    "vehicleFridge": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelBody": {
                    "id": "3c897fed357045a6af38cf91e9cb2918",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "length": "5100",
                    "width": "1840",
                    "heigh": "1970",
                    "wheelbase": "3080",
                    "frontWheelbase": "1570",
                    "backWheelbase": "1545",
                    "minOffGround": "160",
                    "weight": "2200",
                    "bodyStructure": "2",
                    "carDoorNum": "5",
                    "seatNum": "7",
                    "oilVolume": "80",
                    "luggageVolume": "300",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelChair": {
                    "id": "71db9a7e058c44f0b3519366000ed20c",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "dermisSeat": "3",
                    "sportSeat": "3",
                    "heighAdjust": "3",
                    "shoulderBraceAdjust": "3",
                    "frontSeatPowerdriven": "3",
                    "secondrowAngleAdjust": "3",
                    "secondrowSeatMove": "3",
                    "backSeatProwerAdjust": "3",
                    "prowerSeatMemory": "3",
                    "frontSeatHeat": "3",
                    "backSeatHeat": "3",
                    "seatAir": "3",
                    "seatMassage": "3",
                    "backSeatAlldown": "3",
                    "backSeatRatiodown": "3",
                    "thirdSeat": "3",
                    "driveseatWaistBrace": "3",
                    "frontCentreArmrest": "3",
                    "backCentreArmrest": "3",
                    "backCupholder": "3",
                    "prowerTrunk": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelChassis": {
                    "id": "a97d64ccdfea4ffaa78bc4c012885d13",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "driveType": "5",
                    "frontHangType": "扭杆弹簧独立悬架",
                    "backHangType": "螺旋弹簧式非独立悬架",
                    "supportType": "1",
                    "bodyStructure": "1",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelControll": {
                    "id": "014cd3c6d7a84caeaab544d605e514f4",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "absBrake": "3",
                    "brakeAllot": "3",
                    "brakeAuxiliary": "3",
                    "tractionControll": "3",
                    "bodyStableControll": "3",
                    "autoPark": "3",
                    "upAuxiliary": null,
                    "steepSlopeDown": "3",
                    "variableHang": "3",
                    "airHang": "3",
                    "trunRatio": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelEngine": {
                    "id": "cd03b0a56ffd406986216e3dd0d62fc5",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "engineVersion": "2.0T 190马力 L4HFC4GA3-4D",
                    "outputVolume": "1997",
                    "inletForm": "3",
                    "engineArray": "5",
                    "cylinderNum": "4",
                    "airDoor": "4",
                    "compressRatio": "10:1",
                    "admissionGear": "1",
                    "bore": "-",
                    "travle": "-",
                    "maxHorsepower": "190",
                    "maxPower": "140",
                    "maxPowerSpeed": "5000",
                    "maxTorque": "290",
                    "maxTorqueSpeed": "1800-4000",
                    "oilType": "3",
                    "oilNum": "3",
                    "oliSupplyMode": "3",
                    "cylinderCapMaterial": "3",
                    "cylinderBoeyMaterial": "3",
                    "envirStandard": "3",
                    "engineSpecificTech": "-",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelGearbox": {
                    "id": "1daf6a4a9deb416ba8fdd8506d9104a5",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "shelvesNum": "4",
                    "gearBox": "4",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:14.000+0000"
                  },
                  "modelGlass": {
                    "id": "5680f13bbd23452997ba28a3f43c83e5",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "frontPowerWindow": "3",
                    "backPowerWindow": "3",
                    "windowNoclipHand": "3",
                    "ultravioletProofGlass": "3",
                    "rearviewPowerAdjust": "3",
                    "rearviewHeat": "3",
                    "rearviewAutoBlinding": "3",
                    "backSunshade": "3",
                    "backSideSunshade": "3",
                    "sunVisor": "3",
                    "backWiper": "3",
                    "wiperSensor": "3",
                    "rearviewAutoFold": "3",
                    "rearviewMomory": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelInconfig": {
                    "id": "52623372b8e74d5896052a95ed3b1154",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "dermisSteering": "3",
                    "steeringUpdownAdjust": "3",
                    "steeringFrontbackAdjust": "3",
                    "steeringPowerAdjust": "3",
                    "multiFunctionSteering": "3",
                    "steeringShift": "3",
                    "cruiseControl": "3",
                    "parkAuxiliary": "3",
                    "backCarImage": "3",
                    "driveComputer": "3",
                    "hudRiseView": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelLighting": {
                    "id": "4899702ceda14f4f89986ec2181ae6a7",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "xenonLight": "3",
                    "dayRunLight": "3",
                    "autoHeadLight": "3",
                    "trunAuxiliaryLight": "3",
                    "frontFogLight": "3",
                    "lightClean": "3",
                    "incarAtmosphereLight": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelMultimedia": {
                    "id": "3304731ba2654bf7b83c98448d076b1d",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "gpsNavigation": "3",
                    "locationInteractService": "3",
                    "controlColourScreen": "3",
                    "manMachineInterSys": "3",
                    "builtinHarddisk": "3",
                    "carPhone": "3",
                    "carTv": "3",
                    "backLiquidScreen": "3",
                    "extAccessSound": "3",
                    "cd": "3",
                    "singleCd": "3",
                    "fictitiousMutiCd": "3",
                    "mutiCd": "3",
                    "mutiDvd": "3",
                    "dvd": "3",
                    "horn23": "3",
                    "horn45": "3",
                    "horn67": "3",
                    "hornLe8": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:11.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelOutconfig": {
                    "id": "bc674f0f9e624d95b287f9dd5ae82deb",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "lightHeighAdjust": "3",
                    "powerSkylight": "3",
                    "allViewSkylight": "3",
                    "sportOutSuite": "3",
                    "alloyWheel": "3",
                    "powerDoor": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:12.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelSafe": {
                    "id": "94be0713363b4ee992e2992b455b4f7e",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "driveSeatSafeGasbag": "3",
                    "copilotSafeGasbag": "3",
                    "frontSideGasbag": "3",
                    "backSideGasbag": "3",
                    "frontHeadGasbag": "3",
                    "backHeadGasbag": "3",
                    "kneeGasbag": "3",
                    "trieTesting": "3",
                    "notrieKeepRun": "3",
                    "safeBeltTips": "3",
                    "isoChildrenInter": "3",
                    "latchChildrenInter": "3",
                    "engineEleGuard": "3",
                    "incarMidLock": "3",
                    "remoteControlKey": "3",
                    "nokeyStartSys": "3",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:12.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelTech": {
                    "id": "4906992504d94e7e94dd3923cb9b0565",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "autoParkEntry": "3",
                    "plyingAuxiliary": "3",
                    "activeSafeSys": "3",
                    "activeTrunSys": "3",
                    "nightVisionSys": "3",
                    "centerLiquidSplitScreen": "1",
                    "selfAdaptCruise": "1",
                    "allViewCamera": "1",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:12.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  },
                  "modelWheel": {
                    "id": "8665300aaf4548f7aec0e500cc9cdfb6",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "377c35d2b5144f07ac574c164fe011a5",
                    "frontBrakeType": "1",
                    "backBrakeType": "4",
                    "parkBrakeType": "1",
                    "frontTyreSpec": "225/60 R17",
                    "backTyreSpec": "225/60 R17",
                    "tireTyreSpec": null,
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T09:44:12.000+0000",
                    "updateUser": "1234",
                    "updateTime": "2018-11-22T12:46:15.000+0000"
                  }
                },
                {
                  "model": {
                    "id": "acbdff75de5e4bd38a62b044f186c7b4",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "level": "1",
                    "carYear": "2018",
                    "carName": "2018奥迪Q5",
                    "guidePrice": "32.80",
                    "maxSpeed": 210,
                    "officalSpeedup100": 0,
                    "actSpeedup100": 0,
                    "actStop100": "0",
                    "officalOilwear": "10.8",
                    "actOilwear": "",
                    "carQuality": "",
                    "carKeyword": "",
                    "marketTime": "",
                    "carDesc": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelAir": {
                    "id": "85efee93c7264e3c932bf422e7adb786",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "manualAir": "",
                    "autoAir": "",
                    "backAir": "",
                    "backAirOutlet": "",
                    "temperPartition": "",
                    "airFilter": "",
                    "vehicleFridge": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelBody": {
                    "id": "a2aef1107af04b2b8078ba74ae283356",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "length": null,
                    "width": null,
                    "heigh": null,
                    "wheelbase": null,
                    "frontWheelbase": "",
                    "backWheelbase": "",
                    "minOffGround": "",
                    "weight": null,
                    "bodyStructure": "",
                    "carDoorNum": "",
                    "seatNum": "",
                    "oilVolume": "",
                    "luggageVolume": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelChair": {
                    "id": "3342f1fef71e43549f4e7beee77e9787",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "dermisSeat": "",
                    "sportSeat": "",
                    "heighAdjust": "",
                    "shoulderBraceAdjust": "",
                    "frontSeatPowerdriven": "",
                    "secondrowAngleAdjust": "",
                    "secondrowSeatMove": "",
                    "backSeatProwerAdjust": "",
                    "prowerSeatMemory": "",
                    "frontSeatHeat": "",
                    "backSeatHeat": "",
                    "seatAir": "",
                    "seatMassage": "",
                    "backSeatAlldown": "",
                    "backSeatRatiodown": "",
                    "thirdSeat": "",
                    "driveseatWaistBrace": "",
                    "frontCentreArmrest": "",
                    "backCentreArmrest": "",
                    "backCupholder": "",
                    "prowerTrunk": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelChassis": {
                    "id": "8a742b4741f8442c912510d73b5f707a",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "driveType": "",
                    "frontHangType": "",
                    "backHangType": "",
                    "supportType": "",
                    "bodyStructure": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelControll": {
                    "id": "b36c4b68e6b741dfa42ffed13321cbd2",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "absBrake": "",
                    "brakeAllot": "",
                    "brakeAuxiliary": "",
                    "tractionControll": "",
                    "bodyStableControll": "",
                    "autoPark": "",
                    "upAuxiliary": null,
                    "steepSlopeDown": "",
                    "variableHang": "",
                    "airHang": "",
                    "trunRatio": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelEngine": {
                    "id": "e05cdebf969f4c97b9d1ce14a05a7ca3",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "engineVersion": "",
                    "outputVolume": "",
                    "inletForm": "",
                    "engineArray": "",
                    "cylinderNum": "",
                    "airDoor": "",
                    "compressRatio": "",
                    "admissionGear": "",
                    "bore": null,
                    "travle": null,
                    "maxHorsepower": "",
                    "maxPower": "",
                    "maxPowerSpeed": "",
                    "maxTorque": "",
                    "maxTorqueSpeed": "",
                    "oilType": "",
                    "oilNum": "",
                    "oliSupplyMode": "",
                    "cylinderCapMaterial": "",
                    "cylinderBoeyMaterial": "",
                    "envirStandard": "",
                    "engineSpecificTech": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelGearbox": {
                    "id": "3b948c040b6642a9acbd5d04de9e163d",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "shelvesNum": "",
                    "gearBox": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelGlass": {
                    "id": "f06482b1abee42b1a4af28dd7ce89666",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "frontPowerWindow": "",
                    "backPowerWindow": "",
                    "windowNoclipHand": "",
                    "ultravioletProofGlass": "",
                    "rearviewPowerAdjust": "",
                    "rearviewHeat": "",
                    "rearviewAutoBlinding": "",
                    "backSunshade": "",
                    "backSideSunshade": "",
                    "sunVisor": "",
                    "backWiper": "",
                    "wiperSensor": "",
                    "rearviewAutoFold": "",
                    "rearviewMomory": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelInconfig": {
                    "id": "5ab47d654633482d8286ecf7fe1bf8c1",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "dermisSteering": "",
                    "steeringUpdownAdjust": "",
                    "steeringFrontbackAdjust": "",
                    "steeringPowerAdjust": "",
                    "multiFunctionSteering": "",
                    "steeringShift": "",
                    "cruiseControl": "",
                    "parkAuxiliary": "",
                    "backCarImage": "",
                    "driveComputer": "",
                    "hudRiseView": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelLighting": {
                    "id": "390b1d8485a14a6bac272d0e2c4c4905",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "xenonLight": "",
                    "dayRunLight": "",
                    "autoHeadLight": "",
                    "trunAuxiliaryLight": "",
                    "frontFogLight": "",
                    "lightClean": "",
                    "incarAtmosphereLight": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelMultimedia": {
                    "id": "058a362f952f455a8ade8fbff0c5dd54",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "gpsNavigation": "",
                    "locationInteractService": "",
                    "controlColourScreen": "",
                    "manMachineInterSys": "",
                    "builtinHarddisk": "",
                    "carPhone": "",
                    "carTv": "",
                    "backLiquidScreen": "",
                    "extAccessSound": "",
                    "cd": null,
                    "singleCd": "",
                    "fictitiousMutiCd": "",
                    "mutiCd": "",
                    "mutiDvd": "",
                    "dvd": null,
                    "horn23": "",
                    "horn45": "",
                    "horn67": "",
                    "hornLe8": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelOutconfig": {
                    "id": "898d9ed34bb24777b62ae7d59a04e5bb",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "lightHeighAdjust": "",
                    "powerSkylight": "",
                    "allViewSkylight": "",
                    "sportOutSuite": "",
                    "alloyWheel": "",
                    "powerDoor": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelSafe": {
                    "id": "ffab79ecb0b04b02895d9b4e44f62ba3",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "driveSeatSafeGasbag": "",
                    "copilotSafeGasbag": "",
                    "frontSideGasbag": "",
                    "backSideGasbag": "",
                    "frontHeadGasbag": "",
                    "backHeadGasbag": "",
                    "kneeGasbag": "",
                    "trieTesting": "",
                    "notrieKeepRun": "",
                    "safeBeltTips": "",
                    "isoChildrenInter": "",
                    "latchChildrenInter": "",
                    "engineEleGuard": "",
                    "incarMidLock": "",
                    "remoteControlKey": "",
                    "nokeyStartSys": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelTech": {
                    "id": "e2919e3d79ab456c9ae9f040c9ebb562",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "autoParkEntry": "",
                    "plyingAuxiliary": "",
                    "activeSafeSys": "",
                    "activeTrunSys": "",
                    "nightVisionSys": "",
                    "centerLiquidSplitScreen": "",
                    "selfAdaptCruise": "",
                    "allViewCamera": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  },
                  "modelWheel": {
                    "id": "80a82e1d0d28427a93e734f5249f34ca",
                    "brandCode": "AD",
                    "seriesCode": "Q5",
                    "modelId": "acbdff75de5e4bd38a62b044f186c7b4",
                    "frontBrakeType": "",
                    "backBrakeType": "",
                    "parkBrakeType": "",
                    "frontTyreSpec": "",
                    "backTyreSpec": "",
                    "tireTyreSpec": "",
                    "isDelete": "N",
                    "createUser": "1234",
                    "createTime": "2018-11-20T06:47:49.000+0000",
                    "updateUser": null,
                    "updateTime": null
                  }
                }
              ]
            }]
          },
        ]
      }
      this.carData = res.data
      this.nowChangeLi = '0'
      this.nowChangeLiData = res.data['levelGroupList'][0]['carYearGroupList']
    })
  },
  components: {
    contentHeader,motorcycleType
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .carSeriesDetail
    padding-bottom 3rem
  .carSeriesTitle
    position relative
    width 100%
    height 15rem
    img
      width 100%
    .totalStyle
      display inline-block
      padding .5rem 1rem
      background rgba(0,0,0,0.5)
      position absolute
      bottom 4px
      right 0
      color white 
      font-weight bold
  .content
    >div
      display flex
      justify-content space-between
      padding 0 1rem
      font-weight bold
      li
        padding .5rem 0
      .redStyle
        color red 
        text-align left
        font-size 1.2rem   
      .Generation
        color #949494
        font-size 1rem
      .typesStyle
        font-size 1.2rem
        color #656565
      .book
        border 2px solid #EFEFEF
        padding .2rem .5rem
        border-radius 5px
        color #1F71AD
        width 4rem
      .price
        border 2px solid #EFEFEF
        padding .2rem .5rem
        border-radius 5px
        color #fff
        background #FD9927
        width 4rem
 .contentList
    margin-top 1rem
    background #F8F8F8
    padding 1rem 0
    border-top 2px solid #EFEFEF
    ul
      display flex 
      justify-content space-between
      color #646464
      li
        width 20%
        border-left 2px solid #EFEFEF
      li:last-clild 
        border-right none
  .contentName
    text-align left
    font-size 1.8rem
    div:nth-child(1) 
      padding 1rem .8rem
      color #1F71AD
    div:nth-child(2)
      padding .5rem .5rem
      background #F8F8F8
      color #989898
  .levelGroup
    text-align left
    border 1px solid #ddd
    // 代售列表
    ul
      li
        padding .5rem 1rem
        display inline-block
        font-size 1.3rem
        color #ddd
        &.active
          color #000
  div.btn
    position fixed
    bottom 0
    left 0
    right 0
    height 2rem
    button
      width 90%
      height 100%
      border none
      background #FC9927
      color #fff
      border-radius 5px
</style>
