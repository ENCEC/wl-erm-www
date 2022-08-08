<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-08 16:16:54
 * @Description: 我的任务
-->

<template>
  <div class="app-container my-task">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <table-component
      :data="tableData"
      :options="tableConfig"
      :pagination="params"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
      @handleIndexChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
    <!-- 表格 End -->
    <!-- 编辑 -->
    <CreateDialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
    <!-- 转正 -->
    <RegularDialog
      v-if="regularDialogVisible"
      :visible.sync="regularDialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
    <!--离职 辞退 -->
    <QuitDialog
      v-if="quitDialogVisible"
      :visible.sync="quitDialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import tableComponent from '@/components/TableComponent';
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import RegularDialog from './component/regular-dialog';
import QuitDialog from './component/quit-dialog';
import {
  queryStaffTaskInfo,
  queryLeaderTaskInfo,
  queryOrdinatorTaskInfo
} from '@/api/my-task';
import tableMix from '@/mixins/table-mixin';
import { USER_TYPE } from '@/store/constant'

export default {
  name: 'MyTask',
  components: {
    filterPanel,
    tableComponent,
    CreateDialog,
    RegularDialog,
    QuitDialog
  },
  mixins: [tableMix],
  data() {
    return {
      USER_TYPE,
      userType: 1,
      // 任务状态
      MY_TASK_STATUS: {
        check: 1, // 审批中
        on: 2, // 进行中
        completed: 3 // 已完成
      },
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        taskTitle: '',
        status: ''
      },
      // 表格
      columns: columns(this),
      operates: operates(this),
      listLoading: false,
      tableConfig,
      tableData: [{
        name: '转正申请',
        taskType: '转正'
      },
      {
        name: '离职申请',
        taskType: '离职'
      }],
      // 弹框
      editData: {},
      openType: '',
      dialogVisible: false,
      regularDialogVisible: false,
      quitDialogVisible: false
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getTableData() {
      const funcInfo = {
        1: queryStaffTaskInfo,
        2: queryOrdinatorTaskInfo,
        3: queryLeaderTaskInfo
      }
      const funcName = funcInfo[this.userType]
      // this.listLoading = true;
      funcName({
        pageNo: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        const _res = res.data
        this.tableData = _res.records;
        this.params.totalRecord = _res.totalRecord;
        this.listLoading = false;
      });
    },
    // 打开弹框
    handleOpen(item = {}, type) {
      this.openType = type
      this.editData = {
        taskInfoId: item.taskInfoId || '',
        taskTitle: item.taskTitle
      };
      const TASK_TYPE = {
        TEST: '试用任务',
        POSITIVE: '员工转正',
        QUIT: '员工离职'
      }
      this.dialogVisible = true;

      // 编辑/查看
      if (item.taskType === TASK_TYPE.TEST) {
        this.dialogVisible = true;
      }
      // 转正
      if (item.taskType === TASK_TYPE.POSITIVE) {
        this.regularDialogVisible = true
      }
      // 离职
      if (item.taskType === TASK_TYPE.QUIT) {
        this.quitDialogVisible = true
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.my-task {
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
