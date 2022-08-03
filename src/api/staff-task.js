/*
 * @Author: Hongzf
 * @Date: 2022-08-02 10:19:50
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 15:05:16
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

// 获取详情
export function getTaskInfoDetail(data) {
  return request({
    url: '/taskInfo/getTaskInfoDetail',
    method: 'post',
    data
  });
}

// 新增
export function saveTaskInfo(data) {
  return request({
    url: '/taskInfo/saveTaskInfo',
    method: 'post',
    data
  });
}

// 修改
export function updateTaskInfo(data) {
  return request({
    url: '/taskInfo/updateTaskInfo',
    method: 'post',
    data
  });
}

// 删除
export function deleteTaskInfo(data) {
  return request({
    url: '/taskInfo/deleteTaskInfo',
    method: 'post',
    data
  });
}
