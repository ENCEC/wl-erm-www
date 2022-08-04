import request from '@/utils/request'

// 查询细则
export function queryStandardDetail(data) {
  return request({
    url: '/standardDetail/queryStandardDetail',
    method: 'post',
    data
  })
}

// 添加细则
export function addStandardDetail(data) {
  return request({
    url: '/standardDetail/addStandardDetail',
    method: 'post',
    data
  })
}

// 禁用\启用细则
export function standardDetailStartStop(data) {
  return request({
    url: '/standardDetail/standardDetailStartStop',
    method: 'post',
    data
  })
}

// 更新细则
export function updateStandardDetail(data) {
  return request({
    url: '/standardDetail/updateStandardDetail',
    method: 'post',
    data
  })
}

// 删除细则
export function deleteStandardDetail(standardDetailId) {
  return request({
    url: '/standardDetail/deleteStandardDetail',
    method: 'get',
    params: {
      standardDetailId
    }
  })
}

// 规范条目
export function selectEntryNameSpecies() {
  return request({
    url: '/standardDetail/selectEntryNameSpecies',
    method: 'get'

  })
}

// 条目类型
export function selectItemTypeSpecies() {
  return request({
    url: '/standardDetail/selectItemTypeSpecies',
    method: 'get'

  })
}

