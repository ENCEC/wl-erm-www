/*
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-19 09:50:17
 * @Description:
 */

import request from '@/utils/request';
const shareAuthPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
const wlTrainPrefix = process.env.VUE_APP_WL_ERM_PREFIX

// 列表
export function queryStaffByPage(data) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
// 查看---编辑信息
export function queryStaffById(query) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/queryStaffById',
    method: 'get',
    params: query
  });
}
// 新增
export function saveUemUser(data) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/saveUemUser',
    method: 'post',
    data
  });
}
// 修改
export function updateStaff(data) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/updateStaff',
    method: 'post',
    data
  });
}
// 删除
export function deleteStaff(query) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/deleteStaff',
    method: 'get',
    params: query
  });
}

// ===== 转正 =====
// 查看---转正信息
export function queryPositiveStaffInfo(query) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/queryPositiveStaffInfo',
    method: 'get',
    params: query
  });
}
// // 转正-提交
// export function savePositiveInfo(data) {
//   return request({
//     url: wlTrainPrefix + '/taskInfo/savePositiveInfoByStaff',
//     method: 'post',
//     data
//   });
// }

// ===== 离职，辞退 =====
// 查看---离职，辞退信息
export function queryStaffInfo(query) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/queryStaffInfo',
    method: 'get',
    params: query
  });
}
// 离职
export function saveResignInfo(data) {
  return request({
    url: wlTrainPrefix + '/taskInfo/saveResignInfo',
    method: 'post',
    data
  });
}
// 辞退
export function saveDismissInfo(data) {
  return request({
    url: wlTrainPrefix + '/taskInfo/saveDismissInfo',
    method: 'post',
    data
  });
}

