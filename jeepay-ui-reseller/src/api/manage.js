/*
 *  全系列 restful api格式, 定义通用req对象
 *
 *  @author terrfly
 *  @site https://www.jeepay.vip
 *  @date 2021/5/8 07:18
 */

import request from '@/http/request'

export const req = {

  // 通用列表查询接口
  list: (url, params) => {
    return request.request({ url: url, method: 'GET', params: params }, true, true, false)
  },

  // 通用新增接口
  add: (url, data) => {
    return request.request({ url: url, method: 'POST', data: data }, true, true, false)
  },

  // 通用查询单条数据接口
  getById: (url, bizId) => {
    return request.request({ url: url + '/' + bizId, method: 'GET' }, true, true, false)
  },

  // 通用修改接口
  updateById: (url, bizId, data) => {
    return request.request({ url: url + '/' + bizId, method: 'PUT', data: data }, true, true, false)
  },

  // 通用删除接口
  delById: (url, bizId) => {
    return request.request({ url: url + '/' + bizId, method: 'DELETE' }, true, true, false)
  }
}

// 全系列 restful api格式 (全局loading方式)
export const reqLoad = {

  // 通用列表查询接口
  list: (url, params) => {
    return request.request({ url: url, method: 'GET', params: params }, true, true, true)
  },

  // 通用新增接口
  add: (url, data) => {
    return request.request({ url: url, method: 'POST', data: data }, true, true, true)
  },

  // 通用查询单条数据接口
  getById: (url, bizId) => {
    return request.request({ url: url + '/' + bizId, method: 'GET' }, true, true, true)
  },

  // 通用修改接口
  updateById: (url, bizId, data) => {
    return request.request({ url: url + '/' + bizId, method: 'PUT', data: data }, true, true, true)
  },

  // 通用删除接口
  delById: (url, bizId) => {
    return request.request({ url: url + '/' + bizId, method: 'DELETE' }, true, true, true)
  }
}

/** 角色管理页面 **/
export const API_URL_ENT_LIST = '/api/sysEnts'
export const API_URL_ROLE_LIST = '/api/sysRoles'
export const API_URL_ROLE_ENT_RELA_LIST = '/api/sysRoleEntRelas'
export const API_URL_SYS_USER_LIST = '/api/sysUsers'
export const API_URL_USER_ROLE_RELA_LIST = '/api/sysUserRoleRelas'
/** 首页统计 **/
export const API_URL_MAIN_STATISTIC = '/api/resellerFundAccounts'
/** 核销订单列表 **/
export const API_URL_RESELLER_ORDER_LIST = '/api/resellerOrders'
/** 资金流水 */
export const API_URL_RESELLER_FUNDLINE_LIST = '/api/resellerFundLine'

/** 核销订单统计管理 **/
export const API_URL_RESELLER_ORDER_COUNT_LIST = '/api/resellerOrders/resellerCounterPage'

/** 上传图片/文件地址 **/
export const upload = {
  avatar: request.baseUrl + '/api/ossFiles/avatar',
  cert: request.baseUrl + '/api/ossFiles/cert'
}

const api = {
  user: '/user',
  role_list: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

/** 获取权限树状结构图 **/
export function getEntTree () {
  return request.request({ url: '/api/sysEnts/showTree', method: 'GET' })
}

/** 更新用户角色信息 */
export function uSysUserRoleRela (sysUserId, roleIdList) {
  return request.request({
    url: 'api/sysUserRoleRelas/relas/' + sysUserId,
    method: 'POST',
    data: { roleIdListStr: JSON.stringify(roleIdList) }
  })
}

export function getRoleList (parameter) {
  return request({
    url: '/api/sysRoles',
    method: 'get',
    params: parameter
  })
}

/** 根据支付接口查询支付参数配置 **/
export function getMchPayConfigUnique (infoId, ifCode) {
  return request.request({
    url: '/api/mch/payConfigs/' + infoId + '/' + ifCode,
    method: 'get'
  })
}

/** 支付体验配置 **/
export function payTest (appId) {
  return request.request({
    url: 'api/paytest/payways/' + appId,
    method: 'GET'
  })
}

/** 支付体验下单配置 **/
export function payTestOrder (parameter) {
  return request.request({
    url: '/api/paytest/payOrders',
    method: 'POST',
    data: parameter
  })
}

/** 根据支付方式查询可用支付接口 **/
export function getAvailablePayInterfaceList (appId, wayCode) {
  return request.request({
    url: '/api/mch/payPassages/availablePayInterface/' + appId + '/' + wayCode,
    method: 'GET'
  })
}

export function orderFundOverallViewByChildReseller (params) {
  return request.request({
    url: API_URL_RESELLER_ORDER_LIST + '/orderFundOverallViewByChildReseller',
    method: 'GET',
    params: params
  })
}

export function xcoverallResellerCount (params) {
  return request.request({
    url: API_URL_RESELLER_ORDER_LIST + '/overallResellerCount',
    method: 'GET',
    params: params
  })
}

export function jdoverallResellerCount (params) {
  return request.request({
    url: API_URL_RESELLER_ORDER_LIST + '/overallResellerCount',
    method: 'GET',
    params: params
  })
}

export function jdstatByCurrentUser (params) {
  return request.request({
    url: API_URL_RESELLER_ORDER_LIST + '/orderFundOverallView',
    method: 'GET',
    params: params
  })
}

export function xcstatByCurrentUser (params) {
  return request.request({
    url: API_URL_RESELLER_ORDER_LIST + '/orderFundOverallView',
    method: 'GET',
    params: params
  })
}

export function statByToday () {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/statByToday',
    method: 'GET'
  })
}

export function statByAll () {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/statByAll',
    method: 'GET'
  })
}

export function getMainUserInfo () {
  return request.request({
    url: API_URL_MAIN_STATISTIC + '/userDetail',
    method: 'GET'
  })
}

export function updateUserPass (parameter) {
  return request.request({
    url: '/api/current/modifyPwd',
    method: 'put',
    data: parameter
  })
}

export function updateUserInfo (parameter) {
  return request.request({
    url: '/api/current/user',
    method: 'put',
    data: parameter
  })
}

export function getUserInfo () {
  return request.request({
    url: '/api/current/user',
    method: 'get'
  })
}

export function downLoadExcel () {
  return request.request({
    url: '/api/resellerOrders/exportResellerCounter',
    method: 'get'
  })
}

/** 获取到webSocket的前缀 （ws://localhost） **/
export function getWebSocketPrefix () {
  // 获取网站域名 +  端口号
  let domain = document.location.protocol + '//' + document.location.host

  // 判断api_base_url 是否设置
  if (process.env.VUE_APP_API_BASE_URL && process.env.VUE_APP_API_BASE_URL !== '/') {
    domain = process.env.VUE_APP_API_BASE_URL
  }

  if (domain.startsWith('https:')) {
    return 'wss://' + domain.replace('https://', '')
  } else {
    return 'ws://' + domain.replace('http://', '')
  }
}

/** 查询支付宝授权地址URL **/
export function queryAlipayIsvsubMchAuthUrl (mchAppId) {
  return request.request({
    url: '/api/mch/payConfigs/alipayIsvsubMchAuthUrls/' + mchAppId,
    method: 'GET'
  })
}

/** 查询商户转账支出的接口 **/
export function queryMchTransferIfCode (appId) {
  return request.request({
    url: 'api/mchTransfers/ifCodes/' + appId,
    method: 'GET'
  })
}

/** 获取渠道用户ID二维码地址 **/
export function getChannelUserQrImgUrl (ifCode, appId, extParam) {
  return request.request({
    url: '/api/mchTransfers/channelUserId',
    method: 'GET',
    params: { ifCode, appId, extParam }
  })
}

/** 转账 **/
export function doTransfer (parameter) {
  return request.request({
    url: '/api/mchTransfers/doTransfer',
    method: 'POST',
    data: parameter
  }, true, true, true)
}

/** 查询当前应用支持的支付接口 **/
export function getIfCodeByAppId (appId) {
  return request.request({
    url: '/api/mch/payConfigs/ifCodes/' + appId,
    method: 'GET'
  }, true, true, true)
}
