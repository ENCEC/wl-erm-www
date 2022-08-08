/*
 * @Author: Hongzf
 * @Date: 2022-08-08 10:55:42
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-08 17:00:13
 * @Description: 员工管理-我的任务
 */

import request from '@/utils/request';
const prefix = '/wl-erm'// process.env.WL_ERM_PREFIX
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
