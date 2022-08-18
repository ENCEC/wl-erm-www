/*
 * @Author: Hongzf
 * @Date: 2022-08-01 13:52:08
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-18 11:51:55
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
        prop: 'uemDeptId',
        width: '200px',
        clearable: true,
        placeholder: '请选择入职部门',
        col: 8,
        optionLabel: 'deptName',
        optionValue: 'uemDeptId',
        optionKey: 'uemDeptId',
        options: []
      },
      // 入职岗位
      {
        type: 'select',
        label: '入职岗位',
        prop: 'postId',
        width: '200px',
        clearable: true,
        placeholder: '请选择入职岗位',
        col: 8,
        optionLabel: 'postName',
        optionValue: 'postId',
        optionKey: 'postId',
        options: []
      },
      // 岗位职称
      {
        type: 'select',
        label: '岗位职称',
        prop: 'technicalTitleId',
        width: '200px',
        clearable: true,
        placeholder: '请选择岗位职称',
        col: 8,
        optionLabel: 'technicalName',
        optionValue: 'technicalTitleId',
        optionKey: 'technicalTitleId',
        options: []
      },
      // 在职状态
      {
        type: 'select',
        label: '在职状态',
        prop: 'jobStatus',
        width: '200px',
        clearable: true,
        placeholder: '请选择在职状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [{ value: '', label: '全部' }, ..._this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')],
        changeSelect: (optionVal) => {
          _this.filterForm.jobStatus = optionVal
        } }
    ],
    operates: [
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
  pagination: true,
  height: '340px'
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
      width: '60px',
      formatter: (row, column) => {
        return row.sex ? '女' : '男'
      }
    },
    {
      prop: 'mobile',
      label: '联系电话'
    },
    {
      prop: 'deptName',
      label: '入职部门'
    },
    {
      prop: 'staffDuty',
      label: '入职岗位'
    },
    {
      prop: 'technicalName',
      label: '岗位职称'
    },
    {
      prop: 'jobStatus',
      label: '在职状态',
      width: '100',
      formatter: (row, column) => {
        return _this.$dict.getDictNameByCode('JOB_STATUS', row.jobStatus)
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
        method: (row, index) => {
          console.log('【 row 】-172', row)
          // console.log('【 index 】-163', index)
          _this.handleOpen(row, 'edit');
        }
      },
      {
        id: 'detail',
        label: '查看',
        type: 'text',
        show: true,
        disabled: false,
        method: (row) => {
          _this.handleOpen(row, 'detail');
        }
      },
      {
        id: 'regular',
        label: '转正',
        type: 'text',
        show: true,
        //   // show: (row, index) => {
        //   //   return row.status !== 'draft'
        //   // },
        disabled: false,
        method: (row, index) => {
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
        method: (row, index) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row, 'quit');
        }
      },
      {
        id: 'dismiss',
        label: '辞退',
        type: 'text',
        show: true,
        disabled: false,
        method: (row, index) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row, 'dismiss');
        }
      },
      {
        id: 'delete',
        label: '删除',
        // icon: 'el-icon-delete',
        type: 'text',
        show: true,
        plain: false,
        method: (row, index) => {
          _this.handleDelete(row.uemUserId)
        }
      }
    ],
    fixed: false,
    width: 250
  }; // 列操作按钮
};
