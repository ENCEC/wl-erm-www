/*
 * @Author: Hongzf
 * @Date: 2022-07-22 16:25:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 18:23:33
 * @Description: 字典
 */
export const TASK_TYPE = {
  custom: '自定义',
  schedule: '定时',
  error: '错误'
}

export const TASK_STATUS = {
  '100': '未开始',
  '110': '进行中',
  '130': '成功',
  '80': '失败',
  '90': '取消'
}

export const DS_FORMAT = {
  'yyyyMMdd': 'yyyyMMdd',
  'yyyyMM': 'yyyyMM',
  'yyyy': 'yyyy',
  'yyyyMMddHH': 'yyyyMMddHH',
  'yyyyMMddHHmm': 'yyyyMMddHHmm'
}
// 性别
export const SEX = {
  '0': '男',
  '1': '女'
}
// 转正类型
// 性别
export const TYPE = {
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
export function getOptions(key) {
  const result = []
  for (const k in exports[key]) {
    result.push({ text: exports[key][k], value: k })
  }
  return result
}
