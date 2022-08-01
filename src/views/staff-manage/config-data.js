/*
 * @Author: Hongzf
 * @Date: 2022-08-01 13:52:08
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 18:12:53
 * @Description:
 */

export const filterConfig = _this => {
  return {
    inline: false,
    gutter: 3, // 栅格的间隔
    col: 9, // 栅格的格数
    operateCol: 8,
    labelWidth: '100px',
    filterList: [
      {
        type: 'input',
        label: '姓名',
        prop: 'name',
        width: '200px',
        clearable: true,
        placeholder: '请输入姓名',
        col: 8
      },
      // 入职部门
      {
        type: 'select',
        label: '入职部门',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择入职部门',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          {
            value: true,
            label: '启用'
          },
          {
            value: false,
            label: '禁用'
          }
        ]
      },
      // 入职岗位
      {
        type: 'select',
        label: '入职岗位',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择入职岗位',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          {
            value: true,
            label: '启用'
          },
          {
            value: false,
            label: '禁用'
          }
        ]
      },
      // 岗位职称
      {
        type: 'select',
        label: '岗位职称',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择岗位职称',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          {
            value: true,
            label: '启用'
          },
          {
            value: false,
            label: '禁用'
          }
        ]
      },
      // 在职状态
      {
        type: 'select',
        label: '在职状态',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择在职状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          {
            value: '',
            label: '所有'
          },
          {
            value: true,
            label: '试用员工'
          },
          {
            value: false,
            label: '正式员工'
          }
        ]
      }
    ],
    operates: [
      // {
      //   type: 'primary',
      //   buttonLabel: '新增用户',
      //   btnType: 'primary',
      //   //   icon: 'el-icon-search',
      //   method: (item, index) => {
      //     console.log('【 item, index 】-88', item, index);
      //     _this.handleOpen();
      //   }
      // },
      {
        type: 'primary',
        buttonLabel: '查询',
        btnType: 'primary',
        method: () => {
          _this.handleQuery();
        }
      },
      {
        type: 'primary',
        buttonLabel: '重置',
        btnType: 'primary',
        plain: true,
        method: () => {
          _this.resetQueryForm(_this.filterForm);
        }
      }
    ]
  };
};

// table 的配置参数
export const tableConfig = {
  border: true,
  stripe: true, // 是否为斑马纹 table
  loading: false, // 是否添加表格loading加载动画
  highlightCurrentRow: true, // 是否支持当前行高亮显示
  mutiSelect: false, // 是否支持列表项选中功能
  indexShow: true,
  pagination: true
};

// 表格列
export const columns = _this => {
  return [
    {
      prop: 'name',
      label: '姓名'

    },
    {
      prop: 'sex',
      label: '性别',
      formatter: (row, column) => {
        return row.sex ? '男' : '女'
        // TODO
      }
    },
    {
      prop: 'mobile',
      label: '联系电话'
    },
    {
      prop: 'email',
      label: '入职部门'
    },
    {
      prop: 'email',
      label: '入职岗位'
    },
    {
      prop: 'email',
      label: '岗位职称'
    },
    {
      prop: 'isValid',
      label: '员工状态',
      width: '100',
      component: 'switch',
      method: (row, status) => {
        _this.changeStatus(row);
      }
    }
  ];
};

export const operates = _this => {
  return {
    list: [
      {
        id: 'edit',
        label: '编辑',
        type: 'text',
        show: true,
        disabled: false,
        method: (index, row) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row, 'edit');
        }
      },
      {
        id: 'detail',
        label: '查看',
        type: 'text',
        show: true,
        disabled: false,
        method: (index, row) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row, 'detail');
        }
      },
      {
        id: 'detail',
        label: '转正',
        type: 'text',
        show: true,
        //   // show: (index, row) => {
        //   //   return row.status !== 'draft'
        //   // },
        disabled: false,
        method: (index, row) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row, 'regular');
        }
      },
      {
        id: 'quit',
        label: '离职',
        type: 'text',
        show: true,
        disabled: false,
        method: (index, row) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row);
        }
      },
      {
        id: 'dismiss',
        label: '辞退',
        type: 'text',
        show: true,
        disabled: false,
        method: (index, row) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row);
        }
      },
      // {
      //   id: 'resetPassword',
      //   label: '重置密码',
      //   type: 'text',
      //   // icon: 'el-icon-delete',
      //   show: true,
      //   plain: false,
      //   method: (index, row) => {
      //     _this.resetPassword(row.uemUserId);
      //   }
      // },
      {
        id: 'delete',
        label: '删除',
        // icon: 'el-icon-delete',
        type: 'text',
        show: true,
        plain: false,
        method: (index, row) => {
          _this.handleDelete(row.uemUserId)
        }
      }
    ],
    fixed: false,
    width: 230
  }; // 列操作按钮
};
