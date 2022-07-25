/*
 * @Author: Hongzf
 * @Date: 2022-07-25 13:53:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 16:01:25
 * @Description: 系统管理-用户管理
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
