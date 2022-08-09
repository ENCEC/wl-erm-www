/*
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:04
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 14:27:06
 * @Description:
 */

export const filterConfig = _this => {
  const associateColumns = [
    {
      title: '姓名',
      field: 'name'
    }
  ]
  return {
    inline: false,
    gutter: 3, // 栅格的间隔
    col: 6, // 栅格的格数
    operateCol: 16,
    labelWidth: '100px',
    filterList: [
      {
        type: 'input',
        label: '标题',
        prop: 'taskTitle',
        width: '200px',
        clearable: true,
        placeholder: '请输入标题',
        col: 8
      },
      {
        type: 'associate',
        label: '分配对象',
        prop: 'executor',
        width: '200px',
        col: 8,
        valueProp: 'uemUserId',
        labelProp: 'name',
        columns: associateColumns,
        multiple: false,
        clearable: true,
        queryMethod: _this.queryMethod,
        changeSelect: () => {
          //   this.listQuery.status=optionVal
        }
      },
      {
        type: 'select',
        label: '任务类型',
        prop: 'taskType',
        width: '200px',
        clearable: true,
        placeholder: '请选择任务类型',
        col: 8,
        optionLabel: 'label',
        optionValue: 'label',
        optionKey: 'label',
        options: _this.$dict.getDictOptions('TASK_TYPE')
      },
      {
        type: 'select',
        label: '任务状态',
        prop: 'status',
        width: '200px',
        clearable: true,
        placeholder: '请选择任务状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [{ value: '', label: '全部' }, ..._this.$dict.getDictOptions('TASK_STATUS')],
        changeSelect: (optionVal) => {
          _this.filterForm.status = optionVal
        }
      }
    ],
    operates: [
      {
        type: 'primary',
        buttonLabel: '新增任务',
        btnType: 'primary',
        //   icon: 'el-icon-search',
        method: (item, index) => {
          console.log('【 item, index 】-88', item, index);
          _this.handleOpen({}, 'add');
        }
      },
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
      prop: 'taskTitle',
      label: '标题'
    },
    {
      prop: 'executorName',
      label: '执行人'

    },
    {
      prop: 'taskType',
      label: '任务类型'
      // formatter: (row, column) => {
      //   return _this.$dict.getDictNameByCode('TASK_TYPE', row.taskType)
      // }
    },
    {
      prop: 'status',
      label: '任务状态',
      formatter: (row, column) => {
        return _this.$dict.getDictNameByCode('TASK_STATUS', row.status)
      }
    },
    // TODO
    {
      prop: 'endDate',
      label: '完成时间',
      width: '100px'
    },
    {
      prop: 'dispatchersName',
      label: '分配人'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      formatter: (row, column) => {
        const val = row.createTime
        const date = val ? _this.$moment(val).format('YYYY-MM-DD') : '';
        return date
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
          console.log('【 index 】-171', index)
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
        id: 'delete',
        label: '删除',
        // icon: 'el-icon-delete',
        type: 'text',
        show: true,
        plain: false,
        method: (row) => {
          _this.handleDelete(row.taskInfoId)
        }
      }
    ],
    fixed: false,
    width: 200
  }; // 列操作按钮
};
