// 通道相关api

import request from '@/http/request'

/**
 * @param params
 * @return Promise
 */
export function getMatchList (params) {
  return request.request({
    url: '/api/match/matchConfig',
    method: 'get',
    params
  })
}

/**
 * @param id
 * @param params
 * @return Promise
 */
export function updateMatchData (id, params) {
  return request.request({
    url: `/api/match/matchConfig/${id}`,
    method: 'put',
    data: params
  })
}
