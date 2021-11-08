// 核销订单相关api

import request from '@/http/request'

/**
 * 获取核销订单列表
 * @param params
 */
export function getResellerOrderList (params) {
  return request.request({
    url: '/api/resellerOrders',
    method: 'get',
    params
  })
}

/**
 * 获取订单详情
 * @param reseller_order_id
 */
export function getOrdertDetail (reseller_order_id) {
  return request.request({
    url: `/api/resellerOrders/${reseller_order_id}`,
    method: 'get'
  })
}

/**
 * 失败订单一键回调
 */
export function failOrderCallback () {
  return request.request({
    url: '/api/resellerOrders/resend',
    method: 'post'
  })
}

/**
 * 订单批量通知
 * @param params
 */
export function orderNotice (params) {
  return request.request({
    url: '/api/resellerOrders/batchNotify',
    method: 'post',
    data: params
  })
}
