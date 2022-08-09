/*
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 11:09:35
 * @Description: 下拉框接口
 */

import request from '@/utils/request';
// const prefix = process.env.VUE_APP_WL_ERM_PREFIX
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX

// 部门-下拉
export function queryDepartmentBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/queryDepartmentBySelect',
    method: 'post',
    data
  });
}
// 项目-下拉
export function queryProjectNameBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/queryProjectNameBySelect',
    method: 'post',
    data
  });
}
// 岗位-下拉
export function queryStaffDutyBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/queryStaffDutyBySelect',
    method: 'post',
    data
  });
}
// 职称-下拉
export function queryTechnicalNameBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/queryTechnicalNameBySelect',
    method: 'post',
    data
  });
}
// 用户列表
export function queryUser(data) {
  return request({
    // url: '/uemUserManage/queryUemUser',
    url: prefix + '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
