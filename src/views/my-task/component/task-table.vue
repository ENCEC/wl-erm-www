<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-04 15:00:29
 * @Description:
-->
<template>
  <div class="table-wrap">
    <el-form ref="tableFormRef" :model="tableForm" class="tableform-wrap" size="mini" label-width="auto" :rules="tableFormRules">
      <!-- 表格 Start -->
      <el-table
        ref="multipleTable"
        highlight-current-row
        :data="tableForm.tableData"
        height="350px"
        style="width: 100%"
        border
        size="mini"
        @select="handleRowSelect"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="entryName" label="规范条目" />
        <el-table-column prop="actionTime" label="执行时间" min-width="110">
          <template slot-scope="scope">
            {{ scope.row.actionTime && scope.row.actionTime.toString()?`入职后第${scope.row.actionTime}天`:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="actionPeriod" label="执行周期(工时)" min-width="130" />
        <el-table-column prop="detailName" label="任务名称" />
        <el-table-column prop="actionSerialNum" label="执行顺序" />
        <el-table-column prop="planEndDate" label="计划完成日期" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.planEndDate? $moment(parseInt(scope.row.planEndDate)).format('YYYY-MM-DD') : '' }}
          </template>
        </el-table-column>
        <!-- 员工 -->
        <el-table-column v-if="userType===USER_TYPE.staff" prop="progress" label="完成进度(%)" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="scope.$index >= 0"
              :prop="`tableData[${scope.$index}].progress`"
              :rules="[
                { required:true, message: '请选择', trigger: ['blur','change'] }
              ]"
            >
              <el-select
                v-model="scope.row.progress"
                placeholder="请选择"
                clearable
                style="width:100px"
              >
                <el-option
                  v-for="(item) in progressOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 统筹人 -->
        <el-table-column v-if="userType===USER_TYPE.ordinator" prop="progress" label="完成进度(%)" min-width="100" />
        <el-table-column v-if="userType!==USER_TYPE.charge" prop="status" label="完成情况" />
        <el-table-column v-if="userType!==USER_TYPE.charge" prop="resultAccess" label="完成结果" />
        <!-- 负责人 -->
        <!-- TODO -->
        <el-table-column v-if="userType===USER_TYPE.charge" prop="resultAccess" label="完成结果" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="scope.$index >= 0"
              :prop="`tableData[${scope.$index}].resultAccess`"
              :rules="[
                { required:true, message: '请选择', trigger: ['blur','change'] }
              ]"
            >
              <el-select
                v-model="scope.row.resultAccess"
                placeholder="请选择"
                clearable
                style="width:100px"
              >
                <el-option
                  v-for="(item) in resultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column v-if="userType===USER_TYPE.charge" prop="status" label="完成情况" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="scope.$index >= 0"
              :prop="`tableData[${scope.$index}].status`"
              :rules="[
                { required:true, message: '请选择', trigger: ['blur','change'] }
              ]"
            >
              <el-select
                v-model="scope.row.status"
                placeholder="请选择"
                clearable
                style="width:100px"
              >
                <el-option
                  v-for="(item) in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- TODO -->
        <el-table-column prop="endDate" label="完成时间" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.endDate? $moment(parseInt(scope.row.endDate)).format('YYYY-MM-DD hh:mm:ss') : '' }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 End -->
      <!-- 分页 -->
      <el-pagination
        v-if="type !== 'detail'"
        class="pagination-wrap"
        :current-page.sync="params.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="total, prev, pager, next"
        :total="params.totalRecord"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-form>
  </div>
</template>
<script>
import { queryStandardFullDetailByTaskType } from '@/api/staff-task';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'TaskTable',
  mixins: [tableMix],
  props: {
    // 编辑信息
    records: {
      type: Array,
      default: () => []
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    },
    // 任务类型
    taskType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      USER_TYPE: {
        staff: 1,
        ordinator: 2,
        charge: 3
      },
      userType: 3,
      // 表单数据
      tableForm: {
        tableData: [
          {}
        //   {
        //   taskTitle: 'taskTitle',
        //   ordinator: '6958664088091697152',
        //   required: true,
        //   checked: true,
        //   actionPeriod: 1,
        //   actionSerialNum: 0,
        //   actionTime: 2,
        //   // applyDate: null,
        //   // approvalDate: null,
        //   // approver: null,
        //   // endDate: null,
        //   // executor: null
        //   // faceRemark: null
        //   // faceTime: null
        //   // leader: null
        //   // offerRemark: null
        //   // offerType: null
        //   // ordinator: null
        //   // pageNo: null
        //   // pageSize: null
        //   planEndDate: 1636732800000,
        //   planStartDate: 1636732800000,
        //   progress: null,
        //   resultAccess: null,
        //   standardDetailId: '11',
        //   standardDetailName: '细则名称1',
        //   standardEntryId: '1111',
        //   standardEntryName: '规范条目11111',
        //   startDate: null,
        //   status: 0,
        //   taskDetailId: '6960507338410762240',
        //   taskInfoId: '6960507337878085632',
        //   taskName: null
        // },
        // {
        //   taskTitle: 'taskTitle',
        //   ordinator: '',
        //   required: true,
        //   checked: true
        // }
        ]
      },
      // 验证规则
      tableFormRules: {
        // ordinator: [
        //   { required: true, message: '请选择姓名', trigger: 'change' }
        // ]
      },
      resultOptions: this.$dict.getDictOptions('COMPLETE_RESULT'),
      statusOptions: this.$dict.getDictOptions('COMPLETION')
    };
  },
  computed: {
    // 在职状态 （0：试用员工 1：正式员工 2：离职员工）
    progressOptions() {
      const arr = []
      for (let i = 0; i <= 100; i = i + 10) {
        arr.push({
          value: i,
          label: i
        })
      }
      return arr
    }
  },
  watch: {
    taskType(newVal) {
      // 新增、编辑获取列表数据
      if (this.type !== 'detail') {
        // newVal && this.getTableData()
      }
    },
    records: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (this.type === 'detail') {
          // 详情的列表数据
          // console.log('【 详情的列表数据 】-161', newVal)
          this.tableForm.tableData = newVal
        } else {
          // 设置默认选中状态
          this.$nextTick(() => {
            const tableRef = this.$refs.multipleTable
            this.handleToggleRowSelection(tableRef)
          })
        }
      }
    }
  },
  created() {
    // console.log('【 this.type 】-138', this.type)
    // 详情
    // if (this.type === 'detail') {
    //   // this.tableForm.tableData = this.records
    //   console.log('【 this.tableForm.tableData 】-141', this.tableForm.tableData)
    // } else {
    //   this.getTableData();
    if (this.type !== 'detail') {
      this.handleToggleRowSelection()
    }
  },
  async mounted() {
    // await this.getTableData()
    // this.$nextTick(() => {
    //   const tableRef = this.$refs.multipleTable
    //   this.handleToggleRowSelection(tableRef)
    // })
  },
  methods: {
    // 判断复选框的勾选状态
    handleToggleRowSelection(tableRef) {
      // this.$nextTick(() => {
      console.log('【tableRef】', tableRef)
      this.tableForm.tableData.forEach((tableItem) => {
        this.records.forEach((selectedItem) => {
          // console.log('【selectedItem】', selectedItem)
          if (tableItem.standardEntryId === selectedItem.standardEntryId) {
            // 相等则为选中状态
            tableRef && tableRef.toggleRowSelection(tableItem, true)
          }
        })
      })
      // })
    },
    // 获取表格数据
    getTableData() {
      queryStandardFullDetailByTaskType({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        taskType: this.taskType
      }).then(res => {
        const _res = res.data
        this.tableForm.tableData = _res.records;
        this.params.totalRecord = _res.totalRecord;
      });
    },
    // 勾选数据行的 Checkbox 时触发的事件
    handleRowSelect(selection, row) {
      row.checked = !row.checked// 选中的情况下才能选择负责人
      // console.log('【 selection, row 】-178', selection, row)
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('getSelectedData', val)
      this.$emit('update:selectedList', val)
    },
    validateTableForm() {
      let isTableFormValid = false
      this.$refs.tableFormRef.validate(valid => {
        isTableFormValid = valid
      })
      return isTableFormValid
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
  // 操作栏
  .operate-wrap {
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
  // 分页
  .pagination-wrap {
    margin: 10px;
    float: right;
  }
}
</style>
