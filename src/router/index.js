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
  import('@/components/page/recommend/information/commentList').then((module) => {
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
// 我的收藏
const myCollect = (resolve) => {
  import('@/components/page/userCenter/myCollect').then((module) => {
    resolve(module)
  })
}
// 车系详情
const carSeriesDetail = (resolve) => {
  import('@/components/page/changeCar/carSeriesDetail/carSeriesDetail').then((module) => {
    resolve(module)
  })
}
// 登录页面
const login = (resolve) => {
  import('@/components/page/login/login').then((module) => {
    resolve(module)
  })
}
// 注册页面
// 输入手机号
const registerNumber = (resolve) => {
  import('@/components/page/register/registerNumber').then((module) => {
    resolve(module)
  })
}
//输入短信验证码
const registerCode = (resolve) => {
  import('@/components/page/register/registerCode').then((module) => {
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
      path: "/login",
      name: "login",
      component: login,
      meta: {
        auth: false
      }
    },
    {
      path: "/registerNumber",
      name: "registerNumber",
      component: registerNumber,
      meta: {
        auth: false
      }
    },
    {
      path: "/registerCode",
      name: "registerCode",
      component: registerCode,
      meta: {
        auth: false
      }
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
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/index/changeCar',
          component:changeCar,
          meta: {
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/index/market',
          component:market,
          meta: {
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/index/userCenter',
          component:userCenter,
          meta: {
            auth: true,
            keepAlive: true
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
      path: '/myCollect',
      name: 'myCollect',
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