/*
 * @Author: Hongzf
 * @Date: 2022-08-01 13:52:08
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-19 18:15:03
 * @Description:
 */
// 编辑
export const formRules = {
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  idCard: [
    {
      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      message: '身份证号格式错误',
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
  entryDate: [
    {
      required: true,
      message: '请选择入职时间',
      trigger: 'change'
    }
  ],
  uemDeptId: [
    {
      required: true,
      message: '请选择入职部门',
      trigger: 'change'
    }
  ],
  staffDutyCode: [
    {
      required: true,
      message: '请选择入职岗位',
      trigger: 'change'
    }
  ],
  technicalTitleId: [
    {
      required: true,
      message: '请选择岗位职称',
      trigger: 'change'
    }
  ],
  projectId: [
    {
      required: true,
      message: '请选择归属项目',
      trigger: 'change'
    }
  ]
};

const commonRules = {
  name: [
    {
      required: true,
      message: '请输入姓名',
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
  entryDate: [
    {
      required: true,
      message: '请选择入职时间',
      trigger: 'change'
    }
  ],
  jobStatus: [
    {
      required: true,
      message: '在职状态不能为空',
      trigger: 'change'
    }
  ],
  deptName: [
    {
      required: true,
      message: '请选择入职部门',
      trigger: 'change'
    }
  ],
  staffDuty: [
    {
      required: true,
      message: '请选择入职岗位',
      trigger: 'change'
    }
  ]
}
// 转正
export const regularFormRules = {
  ...commonRules,
  offerDate: [
    {
      required: true,
      message: '请选择转正日期',
      trigger: 'change'
    }
  ],
  offerType: [{
    required: true,
    message: '请选择转正类型',
    trigger: 'change'
  }],
  faceScore: [
    {
      required: true,
      message: '请输入转员工答辩成绩',
      trigger: 'blur'
    }
  ],
  interviewerId: [
    {
      required: true,
      message: '请选择面谈人',
      trigger: 'change'
    }
  ],
  approver: [
    {
      required: true,
      message: '请选择审批人',
      trigger: 'change'
    }
  ]
}
// 离职、辞退
export const dissmissFormRules = {
  ...commonRules,
  // 离职
  leaveDate: [
    {
      required: true,
      message: '请选择离职日期',
      trigger: 'change'
    }
  ],
  leaveReason: [
    {
      required: true,
      message: '请输入离职原因',
      trigger: 'blur'
    }
  ],
  // 辞退
  dismissReason: [
    {
      required: true,
      message: '请输入辞退原因',
      trigger: 'blur'
    }
  ],
  dismissDate: [
    {
      required: true,
      message: '请选择辞退日期',
      trigger: 'change'
    }
  ]
};
