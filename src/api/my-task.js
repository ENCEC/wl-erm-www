/*
 * @Author: Hongzf
 * @Date: 2022-08-08 10:55:42
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-10 17:21:18
 * @Description: 员工管理-我的任务
 */

import request from '@/utils/request';
const prefix = process.env.VUE_APP_WL_ERM_PREFIX
// 列表-员工
export function queryStaffTaskInfo(data) {
  return request({
    url: prefix + '/taskInfo/queryStaffTaskInfo',
    method: 'post',
    data
  });
}
// 列表-统筹人
export function queryLeaderTaskInfo(data) {
  return request({
    url: prefix + '/taskInfo/queryLeaderTaskInfo',
    method: 'post',
    data
  });
}
// 列表-负责人
export function queryOrdinatorTaskInfo(data) {
  return request({
    url: prefix + '/taskInfo/queryOrdinatorTaskInfo',
    method: 'post',
    data
  });
}
// === 试用任务==
// 任务详情查询
export function queryTaskDetailInfo(data) {
  return request({
    url: prefix + '/taskInfo/queryTaskDetailInfo',
    method: 'post',
    data
  });
}
// 更新任务进度
export function updateTaskDetailProgress(data) {
  return request({
    url: prefix + '/taskInfo/updateTaskDetailProgress',
    method: 'post',
    data
  });
}
// 更新任务完成状态
export function updateTaskDetailStatus(data) {
  return request({
    url: prefix + '/taskInfo/updateTaskDetailStatus',
    method: 'post',
    data
  });
}

// === 转正任务 ==
// 根据任务id查询该申请人的转正申请
export function queryPositiveApply(query) {
  return request({
    url: prefix + '/taskInfo/queryPositiveApply',
    method: 'get',
    params: query
  });
}
// 查出规范条目所对应的规范细则 用作转正程序
export function queryAllStandardDetail(data) {
  return request({
    url: prefix + '/taskInfo/queryAllStandardDetail',
    method: 'post',
    data
  });
}
// 我的任务（项目经历初次审核） 添加基本转正信息
export function savePositiveInfo(data) {
  return request({
    url: prefix + '/taskInfo/savePositiveInfo',
    method: 'post',
    data
  });
}
// === 离职任务 ==
// 查询员工离职原因
export function queryLeaveInfo(query) {
  return request({
    url: prefix + '/taskInfo/queryLeaveInfo',
    method: 'get',
    params: query
  });
}