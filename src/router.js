import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * @param {String} path 文件路径
 * @param {String} title 路由标题
 * @return {Object} 返回路由配置中的  name, component, meta: {title}
 * 
 */
const _import = (path, title) => {
  const name = path.replace(/.*\/(\w+)$/g, '$1');
  // const path = name.replace(/([A-Z]{1}[a-z]+)([A-Z]{1}[a-z]+)?/, '/$1/$2')
  return {
    name,
    component: () => import('@/views/' + path + '.vue'),
    meta: { title }
  }
}


const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      ..._import('home/Home', '首页')
    },
    {
      path: '/home',
      ..._import('home/Home', '首页')
    },
    {
      path: '/application',
      ..._import('home/Application', '新申请'),
    },
    {
      path: '/payment',
      ..._import('home/Payment', '实时付款'),
    },
    {
      path: '/collection',
      ..._import('home/Collection', '实时收款'),
    },
    {
      path: '/approval',
      ..._import('home/Approval', '我审批的')
    },
    {
      path: '/approvaldetail',
      ..._import('home/Approvaldetail', '待处理详情')
    },
    {
      path: '/managedetail',
      ..._import('home/Managedetail', '已处理详情')
    },
    {
      path: '/ccdetail',
      ..._import('home/Ccdetail', '抄送我详情')
    },
    {
      path: '/submitdetail',
      ..._import('home/Submitdetail', '已提交详情')
    },
    {
      path: '/submit',
      ..._import('home/Submit', '已提交')
    },
    {
      path: '/check',
      ..._import('home/Check', '余额查询')
    },
    {
      path: '/management',
      ..._import('home/Management', '交易管理')
    },
    {
      path: '/fild',
      ..._import('home/Fild', '通讯录')
    },
    // {
    //   path: '/404',
    //   name: '404',
    //   ..._import('login/404', '404')
    // },
    // 批量代付申请
    {
      path: '/batchPay',
      name: 'batchPay',
      ..._import('newApply/batchPay', '批量代付')
    },
    {
      path: '/batchCollect',
      name: 'batchCollect',
      ..._import('newApply/batchCollect', '批量代收')
    },
    // 通讯录
    {
      path: '/addressBook',
      name: 'addressBook',
      ..._import('addressBook/index', '通讯录')
    },
    {
      path: '/secondList',
      name: 'secondList',
      ..._import('addressBook/secondList', '二级通讯录')
    },
    {
      path: '/thirdList',
      name: 'thirdList',
      ..._import('addressBook/thirdList', '三级通讯录')
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      ..._import('addressBook/personalInfo', '个人信息')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router


