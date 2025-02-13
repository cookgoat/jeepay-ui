/**
 * 全局配置信息， 包含网站标题，  动态组件定义
 *
 * @author terrfly
 * @site https://www.jeepay.vip
 * @date 2021/5/8 07:18
 */

/** 应用配置项 **/
export default {
  APP_TITLE: 'Jeepay运营平台', // 设置浏览器title
  ACCESS_TOKEN_NAME: 'iToken' // 设置请求token的名字， 用于请求header 和 localstorage中存在名称
}

/**
 * 与后端开发人员的路由名称及配置项
 * 组件名称 ：{ 默认跳转路径（如果后端配置则已动态配置为准）， 组件渲染 }
 * */
export const asyncRouteDefine = {

  'CurrentUserInfo': { defaultPath: '/current/userinfo', component: () => import('@/views/current/UserinfoPage') }, // 用户设置

  'MainPage': { defaultPath: '/main', component: () => import('@/views/dashboard/main') },
  'SysUserPage': { defaultPath: '/users', component: () => import('@/views/sysuser/SysUserPage') },
  'RolePage': { defaultPath: '/roles', component: () => import('@/views/role/RolePage') },
  'EntPage': { defaultPath: '/ents', component: () => import('@/views/ent/EntPage') },
  'PayWayPage': { defaultPath: '/payways', component: () => import('@/views/payconfig/payWay/List') },
  'IfDefinePage': { defaultPath: '/ifdefines', component: () => import('@/views/payconfig/payIfDefine/List') },
  'IsvListPage': { defaultPath: '/isv', component: () => import('@/views/isv/IsvList') }, // 服务商列表
  'MchListPage': { defaultPath: '/mch', component: () => import('@/views/mch/MchList') }, // 商户列表
  'MchAppPage': { defaultPath: '/apps', component: () => import ('@/views/mchApp/List') }, // 商户应用列表
  'PayOrderListPage': { defaultPath: '/payOrder', component: () => import('@/views/order/pay/PayOrderList') }, // 支付订单列表
  'RefundOrderListPage': { defaultPath: '/refundOrder', component: () => import('@/views/order/refund/RefundOrderList') }, // 退款订单列表
  'TransferOrderListPage': { defaultPath: '/transferOrder', component: () => import('@/views/order/transfer/TransferOrderList') }, // 转账订单
  'MchNotifyListPage': { defaultPath: '/notify', component: () => import('@/views/order/notify/MchNotifyList') }, // 商户通知列表
  'SysConfigPage': { defaultPath: '/config', component: () => import('@/views/sys/config/SysConfig') }, // 系统配置
  'SysLogPage': { defaultPath: '/log', component: () => import('@/views/sys/log/SysLog') }, // 系统日志
  'ResellerOrderGroupPage': { defaultPath: '/resellerOrderGroup', component: () => import('@/views/reseller/ResellerList') }, // 核销列表
  'PretenderAccountGroupPage': { defaultPath: '/pretenderAccountGroup', component: () => import('@/views/pretender/PretenderList') }, // 伪装渠道列表
  'PretenderOrderGroupPage': { defaultPath: '/pretenderOrderGroup', component: () => import('@/views/pretender/order/OrderList') }, // 伪装渠道列表
  'pretenderProductGroupPage': { defaultPath: '/pretenderProductGroup', component: () => import('@/views/pretender/product/product-list') }, // 伪装渠道列表
  'ResellerAccountGroupPage': { defaultPath: '/resellerAccountGroup', component: () => import('@/views/reseller/account/AccountList') }, // 核销商管理
  'ResellerFundAccountGroupPage': { defaultPath: '/resellerFundAccountGroup', component: () => import('@/views/reseller/resellerFundAccount/resellerFundAccountList') }, // 核销资金管理
  'ResellerFundLineGroupPage': { defaultPath: '/resellerFundLineGroup', component: () => import('@/views/reseller/resellerFundAccount/resellerFundLineList') }, // 核销资金流水管理
  'ResellerProductGroupPage': { defaultPath: '/resellerProductGroup', component: () => import('@/views/reseller/product/ProductList') }, // 核销产品管理
  'matchConfigPage': { defaultPath: '/matchconfig', component: () => import('@/views/channelSetting/ChannelSetting') }, // 通道管理页面
  'ENT_RESELLER_RETURN_GROUP': { defaultPath: '/collection-list', component: () => import('@/views/collection/collectionList') },
  'AgentGroupPage': { defaultPath: '/agentList', component: () => import('@/views/agent/agentList') },
  'ENT_RESELLER_DETAIL_GROUP': { default: '/resellerDetailGroup', component: () => import('@/views/collection/resellerDetailGroup') }
}
