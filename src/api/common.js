/*
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-30 11:35:34
 * @Description: 公共部分-接口
 */

import request from '@/utils/request';
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
const shareFilePrefix = process.env.VUE_APP_SHARE_FILE_PREFIX
// 字典-下拉
export function querySysDictCodeByDictType(data) {
  return request({
    url: prefix + '/sysDictType/querySysDictCodeByDictType',
    method: 'post',
    data
  });
}
// 部门-下拉
export function queryDepartmentBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/queryUemDept',
    method: 'get',
    data
  });
}
// 项目-下拉
export function queryProjectNameBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/queryUemProject',
    method: 'get',
    data
  });
}
// 岗位-下拉
export function queryStaffDutyBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/querySysPost',
    method: 'get',
    data
  });
}
// 职称-下拉
export function queryTechnicalNameBySelect(data) {
  return request({
    url: prefix + '/uemUserManage/querySysTechnicalTitle',
    method: 'get',
    data
  });
}
// 用户列表-下属
export function querySubordinateUser(data) {
  return request({
    url: prefix + '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
// 用户列表-全部
export function queryAllWorkUserList(data) {
  return request({
    url: prefix + '/uemUserManage/queryAllWorkUserList',
    method: 'post',
    data
  });
}
// 下载文件
export function downloadExternalFile(data) {
  return request({
    url: prefix + '/uemUserManage/downloadExternalFile',
    // url: shareFilePrefix + '/externalFile/downloadExternalFile',
    method: 'post',
    data
  });
}

// 删除文件
export function deleteFile(data) {
  return request({
    url: shareFilePrefix + '/externalFile/deleteFile',
    method: 'post',
    data
  });
}
