/*
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-15 17:06:07
 * @Description:
 */

import request from '@/utils/request';
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX

// 列表
export function queryStaffByPage(data) {
  return request({
    url: prefix + '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
// 根据id获取详情信息
export function queryStaffById(query) {
  return request({
    url: prefix + '/uemUserManage/queryStaffById',
    method: 'get',
    params: query
  });
}
// 转正，离职，辞退---查看信息
export function queryStaffInfo(query) {
  return request({
    url: prefix + '/uemUserManage/queryStaffInfo',
    method: 'get',
    params: query
  });
}

// 新增
export function saveUemUser(data) {
  return request({
    url: prefix + '/uemUserManage/saveUemUser',
    method: 'post',
    data
  });
}
// 修改用户信息
export function updateStaff(data) {
  return request({
    url: prefix + '/uemUserManage/updateStaff',
    method: 'post',
    data
  });
}

// 转正
export function savePositiveInfo(data) {
  return request({
    url: prefix + '/uemUserManage/savePositiveInfo',
    method: 'post',
    data
  });
}
// 离职
export function saveResignInfo(data) {
  return request({
    url: prefix + '/uemUserManage/saveResignInfo',
    method: 'post',
    data
  });
}
// 辞退
export function saveDismissInfo(data) {
  return request({
    url: prefix + '/uemUserManage/saveDismissInfo',
    method: 'post',
    data
  });
}

// 删除
export function deleteStaff(query) {
  return request({
    url: prefix + '/uemUserManage/deleteStaff',
    method: 'get',
    params: query
  });
}
