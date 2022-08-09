<template>
  <div class="app-container">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="listQuery" />

    <el-dialog
      width="800px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      @close="handleDialogClose"
    >
      <form-panel
        ref="formPanel"
        :form-config="formConfig"
        :dialog-status="dialogStatus"
        :value="temp"
        :rules="rules"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="dialogStatus !== 'examine'"
          :loading="dialogButtonLoading"
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 表格组件 -->
    <table-component
      :data="list"
      :options="options"
      :pagination="listQuery"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
      @handleIndexChange="handleIndexChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import {
  queryByTechnicalTitleName,
  queryUemUser,
  querySysPost,
  saveStandardEntry,
  queryStandardEntry,
  queryRoleByPage,
  querySysDictType,
  updateStandardEntry,
  deleteStandardEntry,
  updateStatus
} from '@/api/standard-entry.js';
import tableComponent from '@/components/TableComponent';
import filterPanel from '@/components/FilterPanel';
import formPanel from '@/components/FormPanel';
// 条目状态
const statusTypeOptions = [
  { key: 1, display_name: '启用' },
  { key: 0, display_name: '禁用' },
  { key: '', display_name: '所有' }
];
// 条目类型
const entryTypeOptions = [];
// 适用岗位
const postOptions = [];
const userOptions = [];
// 执行角色
const roleOptions = [];
// 适用岗位联想控件
const postColumns = [
  {
    title: '岗位名称',
    field: 'postName'
  },
  {
    title: '岗位职责',
    field: 'remark'
  },
  {
    field: 'createBy',
    title: '创建人'
  },
  {
    field: 'createTime',
    title: '创建时间'
  }
];
const technicalColumns = [
  {
    title: '职称名称',
    field: 'technicalName'
  },
  {
    title: '所属岗位',
    field: 'postName'
  },
  {
    field: 'seniority',
    title: '工作年限'
  },
  {
    field: 'createBy',
    title: '创建时间'
  },
  {
    field: 'createTime',
    title: '创建人'
  }
];

const ordinatorColumns = [
  {
    field: 'account',
    title: '用户名'
  },
  {
    field: 'name',
    title: '姓名'
  },
  {
    field: 'mobile',
    title: '联系电话'
  },
  {
    field: 'email',
    title: '电子邮箱'
  }
];

export default {
  name: 'StandardEntry',
  components: { tableComponent, filterPanel, formPanel },
  data() {
    return {
      // 弹窗表格的加载状态
      dialogButtonLoading: false,
      formConfig: {
        inline: false,
        col: 12,
        labelPosition: 'right',
        ref: 'dataForm',
        labelWidth: '106px',
        style: 'width: 100%;',
        formItemList: [
          {
            type: 'input',
            prop: 'entryName',
            // width: "200px",
            label: '条目名称',
            placeholder: '请输入条目名称'
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'itemType',
            // width: "200px",
            label: '条目类型',
            placeholder: '请选择条目类型',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: entryTypeOptions
          },
          {
            type: 'associate',
            label: '适用岗位',
            prop: 'applyPostId',
            // width: "200px",
            col: 24,
            valueProp: 'postId',
            labelProp: 'postName',
            columns: postColumns,
            multiple: true,
            clearable: true,
            queryMethod: this.postQueryMethod,
            changeSelect: () => {
              //   this.listQuery.status=optionVal
            }
          },
          {
            type: 'associate',
            label: '适用岗位职称',
            prop: 'applyProfessorId',
            col: 24,
            // width: "200px",
            valueProp: 'technicalTitleId',
            labelProp: 'technicalName',
            columns: technicalColumns,
            multiple: true,
            clearable: true,
            queryMethod: this.technicalQueryMethod,
            changeSelect: () => {
              //   this.listQuery.status=optionVal
            }
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'actionRoleId',
            // width: "200px",
            label: '执行角色',
            placeholder: '请选择执行角色',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: roleOptions
          },
          {
            type: 'number',
            prop: 'actionTime',
            width: 'calc(100% - 80px)',
            prependText: '入职后第',
            min: 1,
            suffixText: '天',
            label: '执行时间',
            placeholder: '请输入执行时间'
          },
          {
            type: 'number',
            prop: 'actionPeriod',
            width: 'calc(100% - 32px)',
            prependText: '',
            suffixText: '工时',
            min: 1,
            label: '执行周期',
            placeholder: '请输入执行周期'
          },
          {
            type: 'radio',
            prop: 'isNeed',
            label: '是否必须',
            radioLabel: 'labelText',
            col: 8,
            radioArr: [
              {
                label: true,
                disabled: false,
                labelText: '是'
              },
              {
                label: false,
                disabled: false,
                labelText: '否'
              }
            ],
            changeSelect: (optionVal, item, index) => {
              console.log(optionVal, item, index);
            }
          },
          {
            type: 'associate',
            label: '统筹人',
            prop: 'ordinatorId',
            // width: "200px",
            valueProp: 'uemUserId',
            labelProp: 'name',
            columns: ordinatorColumns,
            multiple: true,
            clearable: true,
            queryMethod: this.ordinatorQueryMethod
            // changeSelect: () => {
            //   debugger;
            //   //   this.listQuery.status=optionVal
            // },
            // // blur: () => {
            // //   debugger;
            // //   //   this.listQuery.status=optionVal
            // // },
            // // focus: () => {
            // //   debugger;
            // //   //   this.listQuery.status=optionVal
            // // }
          },
          {
            type: 'textarea',
            prop: 'actionRemark',
            col: 24,
            label: '执行说明',
            autosize: { minRows: 2, maxRows: 4 },
            placeholder: '请输入执行说明'
          },
          {
            type: 'number',
            prop: 'actionSerialNum',
            min: 1,
            col: 12,
            label: '执行序号',
            placeholder: '请输入执行序号'
          }
        ]
      },

      filterConfig: {
        inline: false,
        gutter: 20, // 栅格的间隔
        col: 8, // 栅格的格数
        operateCol: 24,
        labelWidth: '80px',
        labelPosition: 'left',
        filterList: [
          {
            type: 'input',
            label: '条目名称',
            prop: 'entryName',
            // width: '200px',
            clearable: false,
            placeholder: '请输入条目名称'
            // col: 8,
          },
          {
            type: 'associate',
            label: '适用岗位',
            prop: 'applyPostId',
            // width: "200px",
            valueProp: 'postId',
            labelProp: 'postName',
            displayInit: 'postName',
            columns: postColumns,
            multiple: false,
            clearable: true,
            queryMethod: this.postQueryMethod,
            changeSelect: () => {
              //   this.listQuery.status=optionVal
            }
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'actionRoleId',
            // width: "200px",
            label: '执行角色',
            placeholder: '请选择执行角色',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: roleOptions
          },
          {
            type: 'select',
            label: '状态',
            prop: 'status',
            // col: 8,
            // width: '200px',
            clearable: true,
            placeholder: '请选择状态',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: statusTypeOptions,
            changeSelect: (optionVal) => {
              this.listQuery.status = optionVal;
            }
          }
        ],
        operates: [
          {
            type: 'primary',
            buttonLabel: '新增条目',
            btnType: 'primary',
            //   icon: 'el-icon-search',
            method: () => {
              this.handleAdd();
            }
          },
          {
            type: 'primary',
            buttonLabel: '查询',
            btnType: 'primary',
            //   icon: 'el-icon-edit',
            method: () => {
              this.getList();
            }
          },
          {
            type: 'primary',
            buttonLabel: '重置',
            btnType: 'primary',
            plain: true,
            //   icon: 'el-icon-download',
            method: () => {
              this.resetListQuery();
            }
          }
        ]
      },
      tableData: [],
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        pagination: true
      }, // table 的参数

      columns: [
        {
          prop: 'count',
          label: '序号',
          align: 'center',
          width: '80'
        },
        {
          prop: 'entryName',
          label: '条目名称',
          align: 'center'
        },
        {
          prop: 'applyPostId',
          label: '执行岗位',
          formatter: (row) => {
            return this.getApplyPostName(row.applyPostId);
          }
        },
        {
          prop: 'actionRoleId',
          label: '执行角色',
          formatter: (row) => {
            return this.getActionRoleName(row.actionRoleId);
          }
        },
        {
          prop: 'actionTime',
          label: '执行时间',
          formatter: (row) => {
            return `入职后第<span style="color:#DA251D">${row.actionTime}</span>天`;
          }
        },
        {
          prop: 'ordinatorId',
          label: '统筹人',
          formatter: (row) => {
            return this.getOrdinatorName(row.ordinatorId);
          }
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          width: '100',
          component: 'switch',
          method: (row, status) => {
            this.handleModifyStatus(row, status);
          }
        }
      ], // 需要展示的列
      operates: {
        list: [
          {
            id: '1',
            label: '编辑',
            type: 'text',
            show: true,
            // icon: 'el-icon-edit',
            // plain: true,
            disabled: false,
            method: (row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: '2',
            label: '查看',
            type: 'text',
            show: true,
            disabled: false,
            method: (row) => {
              this.handleExamine(row);
            }
          },
          {
            id: '3',
            label: '删除',
            type: 'text',
            // icon: 'el-icon-delete',
            // show: (index, row) => {
            //   return row.status !== 'draft'
            // },
            show: true,
            plain: false,
            method: (row) => {
              this.handleDelete(row);
            }
          }
        ],
        fixed: false,
        width: 230
      }, // 列操作按钮

      list: null,
      totalRecord: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        postName: '',
        status: ''
      },
      statusTypeOptions,
      entryTypeOptions,
      postOptions,
      userOptions,
      roleOptions,
      postColumns,
      technicalColumns,
      temp: {
        entryName: '',
        entryType: '',
        applyPostId: '',
        applyProfessorId: '',
        actionRoleId: '',
        actionTime: '',
        actionPeriod: '',
        isNeed: '',
        ordinatorId: '',
        actionRemark: '',
        actionSerialNum: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑条目',
        create: '新增条目',
        examine: '条目详细信息'
      },
      dialogPvVisible: false,
      rules: {
        entryName: [
          { required: true, message: '请输入条目名称', trigger: 'change' }
        ],
        applyPostId: [
          { required: true, message: '请选择适用岗位', trigger: 'change' }
        ],
        applyProfessorId: [
          { required: true, message: '请选择适用岗位职称', trigger: 'change' }
        ],
        isNeed: [
          { required: true, message: '请选择是否必须', trigger: 'change' }
        ],
        ordinatorId: [
          { required: true, message: '请选择统筹人', trigger: 'change' }
        ],
        actionRemark: [
          { required: true, message: '请输入执行说明', trigger: 'change' }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
    this.initPostSelect();
    this.initUserOptions();
    this.initRoleSelect();
    this.initEntryTypeSelect();
  },
  methods: {
    initEntryTypeSelect() {
      const params = {
        pageSize: 1000,
        currentPage: 1
      };
      querySysDictType(params)
        .then((res) => {
          res.data.records.forEach((item) => {
            this.entryTypeOptions.push({
              key: item.sysDictTypeId,
              display_name: item.dictTypeName
            });
          });
        })
        .catch(() => {
          this.$message.error('初始化条目类型失败');
        });
    },
    initUserOptions() {
      const params = {
        pageSize: 1000,
        currentPage: 1
      };
      queryUemUser(params)
        .then((res) => {
          res.data.records.forEach((item) => {
            this.userOptions.push({
              key: item.uemUserId,
              display_name: item.name
            });
          });
        })
        .catch(() => {
          this.$message.error('初始化统筹人失败');
        });
    },
    initPostSelect() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        status: '0'
      };
      querySysPost(params)
        .then((res) => {
          res.data.records.forEach((item) => {
            this.postOptions.push({
              key: item.postId,
              display_name: item.postName
            });
          });
        })
        .catch(() => {
          this.$message.error('初始化岗位失败');
        });
    },
    initRoleSelect() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        isValid: true
      };
      queryRoleByPage(params)
        .then((res) => {
          res.data.records.forEach((item) => {
            this.roleOptions.push({
              key: item.sysRoleId,
              display_name: item.roleName
            });
          });
        })
        .catch(() => {
          this.$message.error('初始化角色信息失败');
        });
    },
    handleIndexChange(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    changePagination() {},
    getList() {
      this.listLoading = true;
      queryStandardEntry(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.list.forEach((item, index) => {
          item.count =
            (this.listQuery.currentPage - 1) * this.listQuery.pageSize +
            index +
            1;
          item.applyPostId = item.applyPostId
            ? item.applyPostId.split(',')
            : [];
          item.applyProfessorId = item.applyProfessorId
            ? item.applyProfessorId.split(',')
            : [];
          item.ordinatorId = item.ordinatorId
            ? item.ordinatorId.split(',')
            : [];
        });
        this.totalRecord = response.data.totalRecord;
        this.listQuery.totalRecord = response.data.totalRecord;
        // Just to simulate the time of the request
        this.$nextTick(() => {
          this.listLoading = false;
        });
      });
      // this.list = [
      //   {
      //     entryName: "测试条目",
      //     entryType: "",
      //     applyPostId: "",
      //     applyProfessorId: "",
      //     actionRoleId: "",
      //     actionTime: 1,
      //     actionPeriod: "",
      //     status: 0,
      //     isNeed: 1,
      //     ordinatorId: "",
      //     actionRemark: "一些些",
      //     actionSerialNum: 2,
      //   },
      // ];
    },

    resetListQuery() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        entryName: '',
        applyPostId: '',
        actionRoleId: '',
        status: ''
      };
      this.getList();
    },
    handleModifyStatus(row) {
      const params = Object.assign({}, row);
      updateStatus(params)
        .then(() => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        })
        .catch(() => {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        });
    },
    handleAdd() {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    handleExamine(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = 'examine';
      this.formConfig.formItemList.push(
        {
          type: 'dateTimePicker',
          prop: 'createTime',
          label: '创建时间',
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'timestamp',
          subType: 'datetime',
          placeholder: '请选择创建时间',
          clearable: false
        },
        {
          type: 'input',
          prop: 'creatorName',
          // width: "200px",
          label: '创建人',
          placeholder: '请输入创建人名称'
        }
      );
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    createData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          this.dialogButtonLoading = true;
          tempData.applyPostId = tempData.applyPostId.join(',');
          tempData.applyProfessorId = tempData.applyProfessorId.join(',');
          tempData.ordinatorId = tempData.ordinatorId.join(',');
          saveStandardEntry(tempData)
            .then(() => {
              // this.handleResetForm();
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
              this.dialogFormVisible = false;
              this.dialogButtonLoading = false;
              this.getList();
            })
            .catch(() => {
              this.$message({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              });
              this.dialogButtonLoading = false;
            });
        }
      });
    },
    updateData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          this.dialogButtonLoading = true;
          tempData.applyPostId = tempData.applyPostId.join(',');
          tempData.applyProfessorId = tempData.applyProfessorId.join(',');
          tempData.ordinatorId = tempData.ordinatorId.join(',');
          updateStandardEntry(tempData)
            .then(() => {
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              // this.handleResetForm();
              this.dialogFormVisible = false;
              this.dialogButtonLoading = false;
              this.getList();
            })
            .catch(() => {
              this.$message({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000
              });
              this.dialogButtonLoading = false;
            });
        }
      });
    },
    handleDelete(row) {
      this.$confirm(
        '您确定要删除该规范条目信息吗?删除后该规范条目信息不可恢复。',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          deleteStandardEntry(row.standardEntryId)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleResetForm() {
      this.temp = {
        entryName: '',
        entryType: '',
        applyPostId: '',
        applyProfessorId: '',
        actionRoleId: '',
        actionTime: '',
        actionPeriod: '',
        isNeed: '',
        ordinatorId: '',
        actionRemark: '',
        actionSerialNum: ''
      };
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.handleResetForm();
      });
      if (this.dialogStatus === 'examine') {
        this.formConfig.formItemList.splice(-2, 2);
      }
      this.$refs['formPanel'].$refs['dataForm'].clearValidate();
    },
    getApplyPostName(ids) {
      const result = [];
      this.postOptions.forEach((item) => {
        ids.forEach((id) => {
          if (id === item.key) {
            result.push(item.display_name);
          }
        });
      });
      return result.join(',');
    },
    getActionRoleName(actionRoleId) {
      const find = this.roleOptions.find((item) => {
        return item.key === actionRoleId;
      });
      if (find) {
        return find.display_name;
      }
      return '';
    },
    getOrdinatorName(ids) {
      const result = [];
      this.userOptions.forEach((item) => {
        ids.forEach((id) => {
          if (id === item.key) {
            result.push(item.display_name);
          }
        });
      });
      return result.join(',');
    },
    postQueryMethod({ keyword, pageSize, currentPage }) {
      return new Promise((resolve) => {
        querySysPost({
          postName: keyword,
          pageSize,
          currentPage
        }).then((res) => {
          const records = res.data.records;
          resolve({
            records,
            total: res.data.totalRecord
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    technicalQueryMethod({ keyword, pageSize, currentPage }) {
      return new Promise((resolve) => {
        queryByTechnicalTitleName({
          technicalName: keyword,
          pageSize,
          currentPage
        }).then((res) => {
          const records = res.data.records;
          resolve({
            records,
            total: res.data.totalRecord
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    ordinatorQueryMethod({ keyword, pageSize, currentPage }) {
      return new Promise((resolve) => {
        queryUemUser({
          name: keyword,
          pageSize,
          pageNo: currentPage
        }).then((res) => {
          const records = res.data.records;
          resolve({
            records,
            total: res.data.totalRecord
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>
<style lang="scss" scope>
.limitHeight .el-textarea__inner {
  height: 36px;
}
</style>
