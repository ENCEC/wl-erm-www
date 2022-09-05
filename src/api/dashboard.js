/*
 * @Author: Hongzf
 * @Date: 2022-09-05 14:46:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-05 14:57:54
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
