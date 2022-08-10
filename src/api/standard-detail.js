import request from '@/utils/request'
const prefix = process.env.VUE_APP_WL_ERM_PREFIX// process.env.WL_ERM_PREFIX
// const shareAuthPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX

// 查询细则
export function queryStandardDetail(data) {
  return request({
    url: prefix + '/standardDetail/queryStandardDetail',
    method: 'post',
    data
  })
}

// 添加细则
export function addStandardDetail(data) {
  return request({
    url: prefix + '/standardDetail/addStandardDetail',
    method: 'post',
    data
  })
}

// 禁用\启用细则
export function standardDetailStartStop(data) {
  return request({
    url: prefix + '/standardDetail/standardDetailStartStop',
    method: 'post',
    data
  })
}

// 更新细则
export function updateStandardDetail(data) {
  return request({
    url: prefix + '/standardDetail/updateStandardDetail',
    method: 'post',
    data
  })
}

// 删除细则
export function deleteStandardDetail(standardDetailId) {
  return request({
    url: prefix + '/standardDetail/deleteStandardDetail',
    method: 'get',
    params: {
      standardDetailId
    }
  })
}

// 规范条目
export function selectEntryNameSpecies() {
  return request({
    url: prefix + '/standardDetail/selectEntryNameSpecies',
    method: 'get'

  })
}

// 条目类型
export function selectItemTypeSpecies() {
  return request({
    url: prefix + '/standardDetail/selectItemTypeSpecies',
    method: 'get'

  })
}

