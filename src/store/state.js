
const state={
  showText:"state测试文本",
  toDoList:[],
  //用户登录状态 1已登录 0 未登录
  userLogin : 0,
  // 默认选中的
  pageShow:"recommend",
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
