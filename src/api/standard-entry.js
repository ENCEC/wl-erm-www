import request from '@/utils/request'
const prefix = process.env.VUE_APP_WL_ERM_PREFIX// process.env.WL_ERM_PREFIX

// 查询职称
export function queryByTechnicalTitleName(data) {
  return request({
    url: prefix + '/standardEntry/sysTechnicalTitle/queryByTechnicalTitleName',
    method: 'post',
    data
  })
}

// 查询用户
export function queryUemUser(data) {
  return request({
    url: prefix + '/standardEntry/uemUserManage/queryUemUser',
    method: 'post',
    data
  })
}

// 查询岗位
export function querySysPost(data) {
  return request({
    url: prefix + '/standardEntry/sysPost/querySysPost',
    method: 'post',
    data
  })
}

// 新增条目
export function saveStandardEntry(data) {
  return request({
    url: prefix + '/standardEntry/saveStandardEntry',
    method: 'post',
    data
  })
}

// 查询条目
export function queryStandardEntry(data) {
  return request({
    url: prefix + '/standardEntry/queryStandardEntry',
    method: 'post',
    data
  })
}

// 查询角色
export function queryRoleByPage(data) {
  return request({
    url: prefix + '/standardEntry/sysRole/queryRoleByPage',
    method: 'post',
    data
  })
}

// 查询条目类型
export function querySysDictType(data) {
  return request({
    url: prefix + '/standardEntry/sysDictType/querySysDictType',
    method: 'post',
    data
  })
}

// 编辑条目
export function updateStandardEntry(data) {
  return request({
    url: prefix + '/standardEntry/updateStandardEntry',
    method: 'post',
    data
  })
}

// 删除条目
export function deleteStandardEntry(standardEntryId) {
  return request({
    url: prefix + '/standardEntry/deleteStandardEntry',
    method: 'get',
    params: {
      standardEntryId
    }
  })
}

// 启用/禁用条目
export function updateStatus({ standardEntryId, status }) {
  return request({
    url: prefix + '/standardEntry/updateStatus',
    method: 'get',
    params: {
      standardEntryId, status
    }
  })
}
