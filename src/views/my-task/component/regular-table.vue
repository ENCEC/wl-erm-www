<!--
 * @Author: Hongzf
 * @Date: 2022-08-09 16:19:33
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-31 14:11:39
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
      stripe
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="entryName" label="规范条目" width="130" />
      <el-table-column prop="detailName" label="程序名称" />
      <el-table-column prop="actionSerialNum" label="执行顺序" width="80" />
      <!-- 员工才显示计划完成日期 -->
      <el-table-column v-if="userType == USER_TYPE.STAFF" prop="planEndDate" label="计划完成日期" width="120">
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
import { USER_TYPE } from '@/store/constant'

export default {
  name: 'RegularTable',
  props: {
    // 弹窗类型
    type: {
      type: String,
      default: ''
    },
    // 任务类型
    taskType: {
      type: String,
      default: ''
    },
    // 用户类型
    userType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      USER_TYPE,
      // 表单数据
      tableForm: {
        tableData: []
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getTableData()
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getTableData() {
      queryAllStandardDetail().then(res => {
        this.tableForm.tableData = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
