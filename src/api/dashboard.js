/*
 * @Author: Hongzf
 * @Date: 2022-09-05 14:46:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-14 14:06:44
 * @Description: 仪表盘-接口
 */

import request from '@/utils/request';
// const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
// const shareFilePrefix = process.env.VUE_APP_SHARE_FILE_PREFIX
const authPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
// const trainPrefix = process.env.VUE_APP_WL_ERM_PREFIX

// 部门人员岗位情况分析
export function queryPostOfDept(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryPostOfDept',
    method: 'post',
    data
  });
}
// 项目人员配置情况
export function queryProjectStaff(data) {
  return request({
    url: authPrefix + '/uemProject/queryProjectStaff',
    method: 'post',
    data
  });
}
// 项目人员详细配置情况
export function queryProjectDetailedStaff(data) {
  return request({
    url: authPrefix + '/uemProject/queryProjectDetailedStaff',
    method: 'post',
    data
  });
}
// 员工工作年限分析
export function queryUemUserBySeniority(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserBySeniority',
    method: 'post',
    data
  });
}
// 员工学历分析
export function queryUemUserByEducation(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserByEducation',
    method: 'post',
    data
  });
}
// 员工类型情况
export function queryUemUserByJobStatus(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserByJobStatus',
    method: 'post',
    data
  });
}
// 员工转正占比
export function queryUemUserByRegularStaff(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserByRegularStaff',
    method: 'post',
    data
  });
}

// 员工离职占比
export function queryUemUserByLeaveStaff(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserByLeaveStaff',
    method: 'post',
    data
  });
}

// 实习生/应届生转正比
export function queryUemUserByInternsAndFreshGraduates(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserByInternsAndFreshGraduates',
    method: 'post',
    data
  });
}

// 人员趋势图
export function queryUemUserTrend(data) {
  return request({
    url: authPrefix + '/uemUserManage/queryUemUserTrend',
    method: 'post',
    data
  });
}
