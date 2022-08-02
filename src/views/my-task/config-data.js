/*
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:04
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-02 16:09:29
 * @Description:
 */

export const filterConfig = _this => {
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
        prop: 'name',
        width: '200px',
        clearable: true,
        placeholder: '请输入标题',
        col: 8
      },
      {
        type: 'input',
        label: '分配对象',
        prop: 'name2',
        width: '200px',
        clearable: true,
        placeholder: '请输入分配对象',
        col: 8
      },
      // 入职部门
      {
        type: 'select',
        label: '任务类型',
        prop: 'isValid2',
        width: '200px',
        clearable: true,
        placeholder: '请选择任务类型',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: _this.$dict.getDictOptions('VALID_STATUS')
      },
      // 入职岗位
      {
        type: 'select',
        label: '任务状态',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择任务状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          { value: '', label: '全部' },
          ..._this.$dict.getDictOptions('TASK_STATUS')
        ],
        changeSelect: optionVal => {
          _this.filterForm.isValid = optionVal;
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
  pagination: true
};

// 表格列
export const columns = _this => {
  return [
    {
      prop: 'name',
      label: '标题',
      formatter: (row, column) => {
        return row.sex ? '男' : '女';
        // TODO
      },
      render: (h, ctx) => {
        // console.log('【 h, ctx 】-121', h, ctx)
        return h(
          'el-button',
          {
            // domProps: {
            //   innerText: ctx.row.name
            // },
            props: {
              type: 'text',
              size: 'small'
              // ghost: true
            },
            on: {
              click: () => {
                _this.handleOpen(ctx.row, 'edit');
              }
            }
          },
          ctx.row.name
        );
      }
    },
    {
      prop: 'mobile',
      label: '任务类型'
    },
    {
      prop: 'email',
      label: '发布日期'
    },
    {
      prop: 'email',
      label: '计划完成日期'
    },
    {
      prop: 'email',
      label: '任务创建人'
    },
    {
      prop: 'email',
      label: '任务状态'
    },
    {
      prop: 'email',
      label: '完成时间'
    }
  ];
};

export const operates = _this => {
  return {
    list: [
      { show: false }
      // {
      //   id: 'edit',
      //   label: '编辑',
      //   type: 'text',
      //   show: true,
      //   disabled: false,
      //   method: (index, row) => {
      //     console.log('【 index 】-163', index);
      //     _this.handleOpen(row, 'edit');
      //   }
      // },
      // {
      //   id: 'detail',
      //   label: '查看',
      //   type: 'text',
      //   show: true,
      //   disabled: false,
      //   method: (index, row) => {
      //     console.log('【 index 】-163', index);
      //     _this.handleOpen(row, 'detail');
      //   }
      // },
      // {
      //   id: 'delete',
      //   label: '删除',
      //   // icon: 'el-icon-delete',
      //   type: 'text',
      //   show: true,
      //   plain: false,
      //   method: (index, row) => {
      //     _this.handleDelete(row.uemUserId);
      //   }
      // }
    ],
    fixed: false,
    width: 200
  }; // 列操作按钮
};
