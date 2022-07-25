/*
 * @Author: Hongzf
 * @Date: 2022-07-25 16:57:39
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 16:58:08
 * @Description: 系统管理-菜单管理
 */

import request from '@/utils/request';
// 用户管理列表
export function queryUemUser(data) {
  return request({
    url: '/uemUserManage/queryUemUser',
    method: 'post',
    data
  });
}
