import request from '@/utils/request'

// 查询职称
export function queryByTechnicalTitleName(data) {
  return request({
    url: '/standardEntry/sysTechnicalTitle/queryByTechnicalTitleName',
    method: 'post',
    data
  })
}

// 查询用户
export function queryUemUser(data) {
  return request({
    url: '/standardEntry/uemUserManage/queryUemUser',
    method: 'post',
    data
  })
}

// 查询岗位
export function querySysPost(data) {
  return request({
    url: '/standardEntry/sysPost/querySysPost',
    method: 'post',
    data
  })
}

// 新增条目
export function saveStandardEntry(data) {
  return request({
    url: '/standardEntry/saveStandardEntry',
    method: 'post',
    data
  })
}

// 查询条目
export function queryStandardEntry(data) {
  return request({
    url: '/standardEntry/queryStandardEntry',
    method: 'post',
    data
  })
}

// 查询角色
export function queryRoleByPage(data) {
  return request({
    url: '/standardEntry/sysRole/queryRoleByPage',
    method: 'post',
    data
  })
}

// 查询条目类型
export function querySysDictType(data) {
  return request({
    url: '/standardEntry/sysDictType/querySysDictType',
    method: 'post',
    data
  })
}

// 编辑条目
export function updateStandardEntry(data) {
  return request({
    url: '/standardEntry/updateStandardEntry',
    method: 'post',
    data
  })
}

// 删除条目
export function deleteStandardEntry(standardEntryId) {
  return request({
    url: '/standardEntry/deleteStandardEntry',
    method: 'get',
    params: {
      standardEntryId
    }
  })
}

// 启用/禁用条目
export function updateStatus({ standardEntryId, status }) {
  return request({
    url: '/standardEntry/updateStatus',
    method: 'get',
    params: {
      standardEntryId, status
    }
  })
}
