
const state={
  showText:"state测试文本",
  toDoList:[],
  //用户登录状态 1已登录 0 未登录
  userLogin : 0,
  userInfo:{},
  // 默认选中的
  pageShow:"recommend",
  // 车型详情logo大图
  carDetailImg:'',
  // 车辆图片列表
  carImgList:{},
  // 用户定位信息
  userSite:{},
  // 微信用户信息
  weChatUserInfo:{},
  //iframe显示
  iframeData:{iframeState:false,iframeSrc:''},
  historySearchData:[],
  //下方按钮列表
  tobarList:[
    {
      'name':'推荐',
      'key':'recommend'
    },
    {
      'name':'选车',
      'key':'changeCar'
    },
    {
      'name':'商城',
      'key':'market'
    },
    {
      'name':'我的',
      'key':'userCenter'
    },
  ]
}
export default state
