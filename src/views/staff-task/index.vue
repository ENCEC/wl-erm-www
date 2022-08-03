<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:04
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 15:04:54
 * @Description: 员工管理-任务分配
-->

<template>
  <div class="app-container staff-task">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <table-component
      :data="records"
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
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import tableComponent from '@/components/TableComponent';
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import {
  queryTaskInfoPage,
  uemUserStartStop,
  deleteTaskInfo
} from '@/api/staff-task';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'StaffTask',
  components: {
    filterPanel,
    tableComponent,
    CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        account: undefined,
        name: undefined,
        isValid: ''
      },
      // 表格
      records: [],
      listLoading: false,
      tableConfig,
      columns: columns(this),
      operates: operates(this),
      // 弹框
      editData: {},
      show: false,
      openType: '',
      dialogVisible: false,
      regularDialogVisible: false
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
      this.listLoading = true;
      queryTaskInfoPage({
        pageNo: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        this.records = res.data.records;
        this.params.totalRecord = res.data.totalRecord;
        this.listLoading = false;
      });
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开弹框
    handleOpen(item = {}, type) {
      console.log('【 item  】-102', item)
      this.openType = type
      this.editData = { taskInfoId: item.taskInfoId || '' };
      // 编辑/查看
      if (['detail', 'edit', 'add'].includes(type)) {
        this.dialogVisible = true;
      }
      // 转正
      if (type === 'regular') {
        this.regularDialogVisible = true
      }
    },
    // 启用/禁用用户
    changeStatus(item) {
      const taskInfoId = item.taskInfoId;
      const isValid = item.isValid;
      uemUserStartStop({ taskInfoId, isValid }).then(res => {
        this.$message.success('操作成功');
      });
    },
    // 删除用户信息
    handleDelete(taskInfoId) {
      this.$confirm(
        '您确定要删除该任务信息吗？删除后该任务信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteTaskInfo({ taskInfoId }).then(res => {
          this.$message.success('操作成功');
          this.getTableData();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.staff-task {
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
  // 重置密码
  .password-dialog {
    height: 55px;
    text-align: center;
    .password {
      color: rgb(194, 22, 22);
    }
  }
}
</style>
