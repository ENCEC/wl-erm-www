/*
 * @Author: Hongzf
 * @Date: 2022-08-01 17:25:40
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 18:05:01
 * @Description: 字典
 */
import * as dicts from '@/store/constant'

const getDictOptions = (dicName) => {
  const arr = []
  // console.log('【 dicts 】-13', dicts)
  const dicObj = dicts[dicName]
  for (const key in dicts[dicName]) {
    arr.push({ label: dicObj[key], value: key })
  }
  return arr
}
export default {
  getDictOptions
}
