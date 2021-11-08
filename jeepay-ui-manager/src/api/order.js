// 订单-支付订单相关api

import request from '@/http/request'

/**
 * 查询支付订单列表
 * @param params
 * @return Promise
 */
export function getPayOrderList (params) {
  return request.request({
    url: '/api/payOrder',
    method: 'get',
    params
  })
}

/**
 * 获取详情
 * @param payOrderId
 */
export function getOrderDetail (payOrderId) {
  return request.request({
    url: `/api/payOrder/${payOrderId}`,
    method: 'get'
  })
}

/**
 * 获取查单详情
 * @param channelOrderNo
 */
export function getChannelDetail (channelOrderNo) {
  return request.request({
    url: `/api/pay/query/${channelOrderNo}`,
    method: 'get'
  })
}

/**
 * 一键回调
 */
export function batchResend () {
  return request.request({
    url: '/api/mchNotify/batchResend',
    method: 'post'
  })
}
