/*
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-01 14:39:12
 * @Description:
 */
import CryptoJS from 'crypto-js'
import { Message } from 'element-ui'

export function transformPaginationData(data) {
  return {
    pageSize: data.pageSize,
    pageNo: data.pageNum,
    totalCount: data.total,
    totalPage: data.pages,
    data: data.list
  }
}

export function emptyPaginationData() {
  return {
    pageSize: 20,
    pageNo: 1,
    totalCount: 0,
    totalPage: 0,
    data: []
  }
}

export function paginationDataHandler(component, res) {
  if (res.code === 0) {
    return transformPaginationData(res.data)
  } else {
    component.$message.error(res.msg)
    return emptyPaginationData()
  }
}

export function getInputCursorPosition(input) {
  let cursurPosition = -1;
  if (input.selectionStart) {
    cursurPosition = input.selectionStart;
  } else {
    var range = document.selection.createRange();
    range.moveStart('character', -input.value.length);
    cursurPosition = range.text.length;
  }
  return cursurPosition
}
// ase128加密
export function aesEncrypt(content) {
  const key = 'c1953a7wPB234x6l'// 秘钥
  const keyHex = key ? CryptoJS.enc.Utf8.parse(key) : CryptoJS.enc.Utf8.parse('D034FAF5309799E5')
  const message = typeof content === 'string' ? content : JSON.stringify(content)
  const srcs = CryptoJS.enc.Utf8.parse(message);
  const encrypted = CryptoJS.AES.encrypt(srcs, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
// PDF下载
export function downloadFile(fileData, fileName) {
  // console.log('【 downloadFile 】-64', fileData)
  const base = fileData// 你要传入的base64数据
  let bstr
  try {
    bstr = window.atob(base);
  } catch {
    Message.error('下载失败')
    return false
  }
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // 确定解析格式，可能可以变成img，没有深入研究
  const blob = new Blob([u8arr], {
    type: 'application/pdf;chartset=UTF-8'
  });
  const url = window.URL.createObjectURL(blob);
  // 在新窗口打开该pdf用这个
  window.open(url);
  // 下载dpf用这个
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', fileName + '.pdf');
  a.setAttribute('target', '_blank'); // 打开一个新的窗口
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // 删除url绑定
  window.URL.revokeObjectURL(url);
}

// DOC下载
export function downloadDocFile(fileData, fileName) {
  // console.log('【 downloadFile 】-64', fileData)
  const base = fileData// 你要传入的base64数据
  const bstr = window.atob(base);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // 确定解析格式，可能可以变成img，没有深入研究
  const blob = new Blob([u8arr], {
    type: 'application/msword;chartset=UTF-8'
  });
  const url = window.URL.createObjectURL(blob);
  // 在新窗口打开该pdf用这个
  // window.open(url);
  // 下载dpf用这个
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', fileName + '.pdf');
  a.setAttribute('target', '_blank'); // 打开一个新的窗口
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // 删除url绑定
  window.URL.revokeObjectURL(url);
}
