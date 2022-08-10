<!--
 * @Author: Hongzf
 * @Date: 2022-08-09 16:19:33
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-10 16:06:58
 * @Description:
-->

<template>
  <div class="table-wrap">
    <!-- 表格 Start -->
    <el-table
      ref="multipleTable"
      highlight-current-row
      :data="tableForm.tableData"
      height="200px"
      style="width: 590px"
      border
      size="mini"
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="entryName" label="规范条目" width="130" />
      <el-table-column prop="detailName" label="程序名称" />
      <el-table-column prop="actionSerialNum" label="执行顺序" width="80" />
      <!-- TODO：没字段 -->
      <el-table-column v-if="userType" prop="planEndDate" label="计划完成日期" width="120">
        <!-- <template slot-scope="scope">
          {{ scope.row.planEndDate? $moment(scope.row.planEndDate).format('YYYY-MM-DD') : '' }}
        </template> -->
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
  </div>
</template>
<script>
import { queryAllStandardDetail } from '@/api/my-task';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'TaskTable',
  mixins: [tableMix],
  props: {
    // 编辑信息
    // records: {
    //   type: Array,
    //   default: () => []
    // },
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
        tableData: []
      }
    };
  },
  computed: {},
  watch: {
    // records: {
    //   deep: true,
    //   immediate: true,
    //   handler(newVal) {
    //     if (this.type === 'detail') {
    //       // 详情的列表数据
    //       // console.log('【 详情的列表数据 】-161', newVal)
    //       this.tableForm.tableData = newVal
    //     }
    //   }
    // }
  },
  created() {
    this.getTableData()
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getTableData() {
      queryAllStandardDetail({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        taskType: this.taskType
      }).then(res => {
        console.log('【 res 】-135', res)
        const _res = res.data
        this.tableForm.tableData = res.data;
        this.params.totalRecord = _res.totalRecord;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
}
</style>
