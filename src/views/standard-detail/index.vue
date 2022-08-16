<template>
  <div class="app-container">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="listQuery" />

    <el-dialog
      width="800px"
      z-index="10000"
      :append-to-body="true"
      :close-on-click-modal="false"
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
          size="medium"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >提交</el-button>
        <el-button size="medium" @click="dialogFormVisible = false">取消</el-button>
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
  queryStandardDetail,
  standardDetailStartStop,
  addStandardDetail,
  updateStandardDetail,
  deleteStandardDetail
} from '@/api/standard-detail.js';
import {
  querySysDictType,
  queryStandardEntry
} from '@/api/standard-entry.js';
import tableComponent from '@/components/TableComponent';
import filterPanel from '@/components/FilterPanel';
import formPanel from '@/components/FormPanel';
// 条目状态
const statusTypeOptions = [
  { key: true, display_name: '启用' },
  { key: false, display_name: '禁用' },
  { key: '', display_name: '所有' }
];
// 条目类型
const entryTypeOptions = [];
// 规范条目
const entryOptions = [];

export default {
  name: 'StandardDetail',
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
        labelWidth: '80px',
        style: 'width: 100%;',
        formItemList: [
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
            options: entryTypeOptions,
            changeSelect: (optionVal) => {
              this.handleEntryTypeChange(optionVal)
            }
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'entryName',
            // width: "200px",
            label: '规范条目',
            placeholder: '请选择规范条目',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: entryOptions,
            changeSelect: () => {
              if (!this.temp.itemType) { this.temp.entryName = ''; }
              this.$message.error('请先选择条目类型')
            }
          },
          {
            type: 'textarea',
            prop: 'detailName',
            col: 24,
            label: '细则名称',
            autoSize: { minRows: 2, maxRows: 4 },
            placeholder: '请输入细则名称'
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
        operateCol: 16,
        labelWidth: '100px',
        labelPosition: 'right',
        filterList: [
          {
            type: 'input',
            label: '细则名称',
            prop: 'detailName',
            width: '200px',
            clearable: false,
            placeholder: '请输入细则名称'
            // col: 8,
          },

          {
            type: 'select',
            class: 'filter-item',
            prop: 'entryName',
            width: '200px',
            label: '规范条目',
            placeholder: '请选择规范条目',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: entryOptions
          },
          {
            type: 'select',
            label: '状态',
            prop: 'status',
            labelWidth: '40px',
            // col: 8,
            width: '200px',
            clearable: true,
            placeholder: '请选择状态',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: statusTypeOptions,
            changeSelect: (optionVal) => {
              this.listQuery.status = optionVal;
            }
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'itemType',
            width: '200px',
            label: '条目类型',
            placeholder: '请选择条目类型',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: entryTypeOptions
          }
        ],
        operates: [
          {
            type: 'primary',
            buttonLabel: '新增细则',
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
          prop: 'itemType',
          label: '条目类型',
          align: 'center'
        },
        {
          prop: 'entryName',
          label: '规范条目'
        },
        {
          prop: 'actionSerialNum',
          label: '执行序号',
          align: 'center'
        },
        {
          prop: 'detailName',
          label: '细则名称'
        },
        {
          prop: 'creatorName',
          label: '创建人'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          formatter: (row) => {
            return row.createTime.substring(0, 11);
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
        detailName: '',
        entryName: '',
        status: '',
        itemType: ''
      },
      statusTypeOptions,
      entryTypeOptions,
      entryOptions,
      temp: {
        itemType: '',
        entryName: '',
        actionSerialNum: '',
        detailName: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑细则',
        create: '新增细则',
        examine: '细则详细信息'
      },
      dialogPvVisible: false,
      rules: {
        detailName: [
          { required: true, message: '请输入细则名称', trigger: 'change' }
        ],
        entryName: [
          { required: true, message: '请选择规范条目', trigger: 'change' }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
    this.initEntryOptions();
    this.initEntryTypeSelect();
  },
  methods: {
    initEntryTypeSelect() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        dictTypeCode: '条目类型'
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
    async handleEntryTypeChange(entryType) {
      debugger
      await this.initEntryOptions()
      this.entryOptions = this.entryOptions.filter((item) => {
        debugger
        return item.itemType === entryType
      })
    },
    initEntryOptions() {
      const params = {
        pageSize: 1000,
        currentPage: 1
      };
      queryStandardEntry(params)
        .then((res) => {
          const arr = []
          res.data.records.forEach((item) => {
            arr.push({
              key: item.standardEntryId,
              display_name: item.entryName,
              itemType: item.itemType
            });
          });
          this.entryOptions = arr
        })
        .catch(() => {
          this.$message.error('初始化规范条目失败');
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
      queryStandardDetail(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.list.forEach((item, index) => {
          item.count =
            (this.listQuery.currentPage - 1) * this.listQuery.pageSize +
            index +
            1;
        });
        this.totalRecord = response.data.totalRecord;
        this.listQuery.totalRecord = response.data.totalRecord;
        // Just to simulate the time of the request
        this.listLoading = false;
      });
    },

    resetListQuery() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        standardDetailId: '',
        entryName: '',
        status: '',
        itemType: ''
      };
      this.getList();
    },
    handleModifyStatus(row) {
      const params = Object.assign({}, row);
      standardDetailStartStop(params)
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
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    createData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogButtonLoading = true;
          addStandardDetail(this.temp)
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
              this.dialogFormVisible = false;
            });
        }
      });
    },
    updateData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateStandardDetail(tempData)
            .then(() => {
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              // this.handleResetForm();
              this.dialogFormVisible = false;
              this.getList();
            })
            .catch(() => {
              this.$message({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000
              });
              this.dialogFormVisible = false;
            });
        }
      });
    },
    handleDelete(row) {
      this.$confirm(
        '您确定要删除该规范条目信息吗?删除后该岗位信息不可恢复',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          deleteStandardDetail(row.standardDetailId)
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
        itemType: '',
        entryName: '',
        actionSerialNum: '',
        detailName: ''
      };
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.handleResetForm();
        this.initEntryOptions()
      });
      this.$refs['formPanel'].$refs['dataForm'].clearValidate();
    }
    // getStandardEntryName(entryName) {
    //   const find = this.entryOptions.find((item) => {
    //     return item.key === entryName;
    //   });
    //   return find.display_name ? find.display_name : "";
    // },
  }
};
</script>
<style lang="scss" scope>
.limitHeight .el-textarea__inner {
  height: 36px;
}
</style>
