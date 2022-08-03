/*
 * @Author: Hongzf
 * @Date: 2022-08-03 12:39:32
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 15:06:36
 * @Description:
 */

export const formRules = {
  taskTitle: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    }
  ],
  executor: [
    {
      required: true,
      message: '请选择执行人',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: '请选择在职状态',
      trigger: 'change'
    }
  ],
  taskType: [
    {
      required: true,
      message: '请选择任务类型',
      trigger: 'change'
    }
  ]
};
