/*
 * @Author: Hongzf
 * @Date: 2022-08-08 18:45:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-10 18:32:53
 * @Description:
 */

// 转正申请
export const regularFormRules = {
  // 进行中
  faceTime: [
    {
      required: true,
      message: '请选择面谈时间',
      trigger: 'change'
    }
  ],
  resultAccess: [
    {
      required: true,
      message: '请选择面谈结果',
      trigger: 'change'
    }
  ],
  faceScore: [
    {
      required: true,
      message: '请输入转员工答辩成绩',
      trigger: 'blur'
    }
  ],
  approver: [
    {
      required: true,
      message: '请选择提交审批人',
      trigger: 'change'
    }
  ],
  faceRemark: [
    {
      required: true,
      message: '请输入面谈评语',
      trigger: 'blur'
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
// 转正申请
export const quitFormRules = {
  // 进行中
  faceTime: [
    {
      required: true,
      message: '请选择面谈时间',
      trigger: 'change'
    }
  ],
  resultAccess: [
    {
      required: true,
      message: '请选择面谈结果',
      trigger: 'change'
    }
  ],
  faceScore: [
    {
      required: true,
      message: '请输入转员工答辩成绩',
      trigger: 'blur'
    }
  ],
  approver: [
    {
      required: true,
      message: '请选择提交审批人',
      trigger: 'change'
    }
  ],
  faceRemark: [
    {
      required: true,
      message: '请输入面谈评语',
      trigger: 'blur'
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
