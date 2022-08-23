<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-23 13:38:06
 * @Description:
-->
<template>
  <div class="table-wrap">
    <el-form ref="taskFormRef" :model="tableForm" class="tableform-wrap" size="mini" label-width="auto" :rules="tableFormRules">
      <!-- 表格 Start -->
      <el-table
        ref="multipleTable"
        highlight-current-row
        :data="tableForm.tableData"
        :row-key="rowKey"
        :reserve-selection="true"
        height="220px"
        style="width: 100%"
        border
        stripe
        size="mini"
        @select="handleRowSelect"
        @selection-change="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column prop="entryName" label="规范条目" min-width="140" />
        <el-table-column prop="actionTime" label="执行时间" width="110">
          <template slot-scope="scope">
            <!-- {{ scope.row.standardEntryId }} -->
            {{ scope.row.actionTime && scope.row.actionTime.toString()?`入职后第${scope.row.actionTime}天`:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="actionPeriod" label="执行周期(工时)" width="105" />
        <el-table-column prop="detailName" label="任务名称" min-width="120" />
        <el-table-column prop="actionSerialNum" label="执行顺序" />
      </el-table>
      <!-- 表格 End -->
      <!-- 分页 -->
      <el-pagination
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
import { queryNotNeedStandardFullDetailByTaskType } from '@/api/staff-task';
import tableMix from '@/mixins/table-mixin';
// import { tempdata } from './rules';

export default {
  name: 'TaskTable',
  // components: { UserAssociate },
  mixins: [tableMix],
  props: {
    // 已勾选的数据
    records: {
      type: Array,
      default: () => []
    },
    // 任务类型
    taskType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // tempdata,
      // 表单数据
      tableForm: {
        tableData: []
      },
      // 验证规则
      tableFormRules: {}
    };
  },
  computed: {},
  watch: {
    taskType(newVal) {
      // 新增、编辑获取列表数据
      newVal && this.getTableData()
    }
    // records: {
    //   deep: true,
    //   immediate: true,
    //   handler(newVal) {
    //     // if (this.type === 'detail') {
    //     //   // 详情的列表数据
    //     // console.log('【 勾选列表 】-161', newVal)
    //     //   this.tableForm.tableData = newVal
    //     // } else {
    //     // 设置默认选中状态
    //     // this.$nextTick(() => {
    //     //   const tableRef = this.$refs.multipleTable
    //     //   this.handleToggleRowSelection(tableRef)
    //     // })
    //     // }
    //   }
    // }
  },
  created() {
    // 详情
    // if (this.type === 'detail') {
    //   // this.tableForm.tableData = this.records
    //   console.log('【 this.tableForm.tableData 】-141', this.tableForm.tableData)
    // } else {
    //   this.getTableData();
    // if (this.type !== 'detail') {
    //   this.handleToggleRowSelection()
    // }
  },
  mounted() {
    // await this.getTableData()
    // this.$nextTick(() => {
    //   const tableRef = this.$refs.multipleTable
    //   this.handleToggleRowSelection(tableRef)
    // })
  },
  methods: {
    rowKey(row) {
      return row.standardEntryId
    },
    // 判断复选框的勾选状态
    handleToggleRowSelection() {
      const tableRef = this.$refs.multipleTable
      // this.$nextTick(() => {
      // console.log('【tableRef】', tableRef)
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
      this.taskType && queryNotNeedStandardFullDetailByTaskType({
        pageNo: this.params.currentPage,
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
      // 是否是勾选操作
      const isChecked = selection.some((item) => {
        return item.standardEntryId === row.standardEntryId
      })
      // 勾选操作
      if (isChecked) {
        const isExit = this.records.some((item) => {
          return item.standardDetailId === row.standardDetailId
        })
        // 不存在数据则添加
        if (!isExit) {
          this.$emit('handleRowSelect', isChecked, row)
        } else {
          // 存在的话则勾选不成功
          this.$refs.multipleTable.toggleRowSelection(row, false)// 已存在,勾选-勾选失败
          this.$message.error('该数据已存在')
        }
      }
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange() {},
    // 全选
    handleSelectAll(allSelection) {
      // console.log('【 val 】-190', allSelection)
      // 过滤出新的数据
      const newSelection = allSelection.filter(multipleItem => {
        const isExit = this.records.some((item) => {
          return multipleItem.standardDetailId === item.standardDetailId
        })
        return !isExit// 过滤出新的不存在的数据
      })
      // console.log('【 newSelection 】-192', newSelection)
      this.$emit('handleSelectAll', newSelection)
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width:750px;
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
