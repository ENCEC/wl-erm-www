/*
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:04
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-06 11:09:31
 * @Description:
 */

export const formRules = {
  account: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入联系电话',
      trigger: 'blur'
    },
    {
      pattern: /^1(3|4|5|7|8|9)\d{9}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      message: '性别不能为空',
      trigger: 'change'
    }
  ],
  email: [
    {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '电子邮箱格式错误',
      trigger: 'blur'
    }
  ],
  jobStatus: [
    {
      required: true,
      message: '在职状态不能为空',
      trigger: 'change'
    }
  ],
  seniority: [
    {
      required: true,
      message: '请输入工作年限',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]*$/,
      message: '请输入数字',
      trigger: 'blur'
    }
  ],
  staffDutyCode: [
    {
      required: true,
      message: '请选择入职岗位',
      trigger: 'change'
    }
  ],
  projectId: [
    {
      required: true,
      message: '请选择归属项目',
      trigger: 'change'
    }
  ],
  // 最终审批
  approvalTime: [
    {
      required: true,
      message: '请选择审批时间',
      trigger: 'change'
    }
  ],
  approvalResult: [
    {
      required: true,
      message: '请选择审批结果',
      trigger: 'change'
    }
  ],
  positiveComments: [
    {
      required: true,
      message: '请输入转正评语',
      trigger: 'blur'
    }
  ]
};
