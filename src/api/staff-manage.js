/*
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 15:28:39
 * @Description:
 */

import request from '@/utils/request';
// 列表
export function queryStaffByPage(data) {
  return request({
    url: '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
// 根据id获取详情信息
export function queryStaffById(query) {
  return request({
    url: '/uemUserManage/queryStaffById',
    method: 'get',
    params: query
  });
}
// 新增
export function saveUemUser(data) {
  return request({
    url: '/uemUserManage/saveUemUser',
    method: 'post',
    data
  });
}
// 修改用户信息
export function updateStaff(data) {
  return request({
    url: '/uemUserManage/updateStaff',
    method: 'post',
    data
  });
}

// 启用/禁用用户
export function uemUserStartStop(data) {
  return request({
    url: '/uemUserManage/uemUserStartStop',
    method: 'post',
    data
  });
}
// 删除用户信息
export function deleteUemUser(data) {
  return request({
    url: '/uemUserManage/deleteUemUser',
    method: 'post',
    data
  });
}
// 管理员重置用户密码
export function resetUemUserPassword(data) {
  return request({
    url: '/uemUserManage/resetUemUserPassword',
    method: 'post',
    data
  });
}
