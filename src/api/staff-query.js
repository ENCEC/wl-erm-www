
import request from '@/utils/request';
const prefix = process.env.VUE_APP_WL_ERM_PREFIX
const shareAuthPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
const shareFilePrefix = process.env.VUE_APP_SHARE_FILE_PREFIX

// 转正申请
export function saveOffer(data) {
  return request({
    url: prefix + '/taskDetailInfo/saveOffer',
    method: 'post',
    data
  });
}
// 下载文件
export function downloadExternalFile(data) {
  return request({
    url: shareFilePrefix + '/externalFile/downloadExternalFile',
    method: 'post',
    data
  });
}
// // 8083端口上传文件
// export function uploadExternalFile(data) {
//   return request({
//     url: shareFilePrefix + '/externalFile/uploadExternalFile',
//     method: 'post',
//     data
//   });
// }

// 8082端口上传文件
export function uploadExternalFile(data) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/uploadExternalFile',
    method: 'post',
    data
  });
}

// 查看转正评语
export function queryOfferInfo({ dispatchers, name }) {
  return request({
    url: prefix + '/taskDetailInfo/queryOffer',
    method: 'get',
    params: {
      dispatchers, name
    }
  });
}
// 查看离职评语
export function queryLeaveInfo(uemUserId) {
  return request({
    url: prefix + '/uemUserManage/queryLeaveInfo',
    method: 'get',
    params: {
      uemUserId
    }
  });
}
// 查看辞退评语
export function queryDismissInfo(uemUserId) {
  return request({
    url: prefix + '/uemUserManage/queryDismissInfo',
    method: 'get',
    params: {
      uemUserId
    }
  });
}
// 保存员工信息
export function preservationUemUser(data) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/preservationUemUser',
    method: 'post',
    data
  });
}

// 离职申请
export function saveLeave(data) {
  return request({
    url: prefix + '/taskDetailInfo/saveLeave',
    method: 'post',
    data
  });
}
// 查询员工
export function queryUemUser(data) {
  return request({
    url: shareAuthPrefix + '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
// 查看员工
export function saveDismissInfo(uemUserId) {
  return request({
    url: prefix + '/uemUserManage/getUemUser',
    method: 'get',
    params: {
      uemUserId
    }
  });
}

