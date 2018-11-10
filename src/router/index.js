import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const index = (resolve) => {
  import('@/components/index').then((module) => {
    resolve(module)
  })
}
// 推荐******************************************************
const recommend = (resolve) => {
  import('@/components/page/recommend/recommend').then((module) => {
    resolve(module)
  })
}
// 文章详情
const articleDetail = (resolve) => {
  import('@/components/page/recommend/articleDetail').then((module) => {
    resolve(module)
  })
}
// 评论列表
const commentList = (resolve) => {
  import('@/common/view/commentList').then((module) => {
    resolve(module)
  })
}
// 选车******************************************************
const changeCar = (resolve) => {
  import('@/components/page/changeCar/changeCar').then((module) => {
    resolve(module)
  })
}
// 商城******************************************************
const market = (resolve) => {
  import('@/components/page/market/market').then((module) => {
    resolve(module)
  })
}
// 用户页面******************************************************
const userCenter = (resolve) => {
  import('@/components/page/userCenter/userCenter').then((module) => {
    resolve(module)
  })
}
// 我的关注
const myAttention = (resolve) => {
  import('@/components/page/userCenter/myAttention').then((module) => {
    resolve(module)
  })
}
// 车系详情
const carSeriesDetail = (resolve) => {
  import('@/common/view/carSeriesDetail').then((module) => {
    resolve(module)
  })
}
const router = new Router({
  routes: [
    {
      path: '/',
      redirect:"/index/recommend"
    },
    {
      path: '/index',
      name: 'index',
      redirect:"/index/recommend",
      component: index,
      children:[
        {
          path: '/index/recommend',
          component:recommend,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/index/changeCar',
          component:changeCar,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/index/market',
          component:market,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/index/userCenter',
          component:userCenter,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
      ]
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: articleDetail,
    },
    {
      path: '/commentList',
      name: 'commentList',
      component: commentList,
    },
    {
      path: '/myAttention',
      name: 'myAttention',
      component: myAttention,
    },
    {
      path: '/carSeriesDetail',
      name: 'carSeriesDetail',
      component: carSeriesDetail,
    }
  ]
})
// 页面跳转之前校验
router.beforeEach((to, from, next)=>{
  next();
})
export default router;