/*
 * @Author: Hongzf
 * @Date: 2022-07-22 16:25:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 18:29:12
 * @Description: 字典
 */

// 禁用启用
export const VALID_STATUS = {
  '': '所有',
  'false': '禁用',
  'true': '启用'
}
// 任务状态
export const TASK_STATUS = {
  '0': '待完成',
  '1': '执行中',
  '2': '已完成'
}
// 任务类型
export const TASK_TYPE = {
  'TASK_TRAIL': '试用任务',
  'TASK_STUDY': '学习任务',
  'TASK_TRAIN': '培训任务',
  'TASK_OTHER': '其他任务'
}
// 性别
export const SEX = {
  '0': '男',
  '1': '女'
}
// 转正类型
export const OFFER_TYPE = {
  '0': '正常转正',
  '1': '提前转正'
}
// 在职状态 （0：试用员工 1：正式员工 2：离职员工）
export const JOB_STATUS = {
  '0': '试用员工',
  '1': '正式员工',
  '2': '离职员工'
}
// 婚姻状况（0：未婚 1：已婚 2：离婚）
export const MARITAL_STATUS = {
  '0': '未婚',
  '1': '已婚',
  '2': '离婚'
}

// 学历（0：专科 1：本科 2：研究生 3：博士生）
export const EDUCATION = {
  '0': '专科',
  '1': '本科',
  '2': '研究生',
  '3': '博士生'
}
// 任务状态
// export const TASK_STATUS = {
//   '100': '未开始',
//   '110': '进行中',
//   '130': '成功',
//   '80': '失败',
//   '90': '取消'
// }
// 任务类型
// export const TASK_TYPE = {
//   custom: '自定义',
//   schedule: '定时',
//   error: '错误'
// }
export const DS_FORMAT = {
  'yyyyMMdd': 'yyyyMMdd',
  'yyyyMM': 'yyyyMM',
  'yyyy': 'yyyy',
  'yyyyMMddHH': 'yyyyMMddHH',
  'yyyyMMddHHmm': 'yyyyMMddHHmm'
}
export function getOptions(key) {
  const result = []
  for (const k in exports[key]) {
    result.push({ text: exports[key][k], value: k })
  }
  return result
}
