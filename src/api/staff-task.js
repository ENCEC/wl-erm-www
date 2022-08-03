/*
 * @Author: Hongzf
 * @Date: 2022-08-02 10:19:50
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 10:35:47
 * @Description: 员工管理-任务分配
 */

import request from '@/utils/request';
// 列表
export function queryTaskInfoPage(data) {
  return request({
    url: '/taskInfo/queryTaskInfoPage',
    method: 'post',
    data
  });
}
// 获取信息
export function getTaskInfoDetail(data) {
  return request({
    url: '/taskInfo/getTaskInfoDetail',
    method: 'post',
    data
  });
}
// 获取信息
export function getUemUser(query) {
  return request({
    url: '/taskInfo/getTaskInfoDetail',
    method: 'get',
    params: query
  });
}
// 管理员新增用户
export function saveUemUser(data) {
  return request({
    url: '/uemUserManage/saveUemUser',
    method: 'post',
    data
  });
}
// 修改用户信息
export function editUemUser(data) {
  return request({
    url: '/uemUserManage/editUemUser',
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
