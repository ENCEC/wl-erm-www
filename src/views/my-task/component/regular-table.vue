
<template>
  <div class="table-wrap">
    <!-- 表格 Start -->
    <el-table
      ref="multipleTable"
      highlight-current-row
      :data="tableForm.tableData"
      height="200px"
      style="width: 100%"
      border
      size="mini"
      @select="handleRowSelect"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="entryName" label="规范条目" />
      <el-table-column prop="detailName" label="程序名称" />
      <el-table-column prop="actionSerialNum" label="执行顺序" />
      <el-table-column prop="planEndDate" label="计划完成日期" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.planEndDate? $moment(scope.row.planEndDate).format('YYYY-MM-DD') : '' }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
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
      }
    };
  },
  computed: {},
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
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
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
