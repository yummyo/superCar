import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const index = (resolve) => {
  import('@/components/index').then((module) => {
    resolve(module)
  })
}

const recommend = (resolve) => {
  import('@/components/page/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const changeCar = (resolve) => {
  import('@/components/page/changeCar/changeCar').then((module) => {
    resolve(module)
  })
}

const market = (resolve) => {
  import('@/components/page/market/market').then((module) => {
    resolve(module)
  })
}

const userCenter = (resolve) => {
  import('@/components/page/userCenter/userCenter').then((module) => {
    resolve(module)
  })
}
const articleDetail = (resolve) => {
  import('@/components/page/recommend/articleDetail').then((module) => {
    resolve(module)
  })
}
const myAttention = (resolve) => {
  import('@/components/page/userCenter/myAttention').then((module) => {
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
      component: index,
      children:[
        {
          path: '/index/recommend',
          component:recommend
        },
        {
          path: '/index/changeCar',
          component:changeCar
        },
        {
          path: '/index/market',
          component:market
        },
        {
          path: '/index/userCenter',
          component:userCenter
        },
      ]
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: articleDetail,
    },
    {
      path: '/myAttention',
      name: 'myAttention',
      component: myAttention,
    }
  ]
})
// 页面跳转之前校验
router.beforeEach((to, from, next)=>{
  next();
})
export default router;