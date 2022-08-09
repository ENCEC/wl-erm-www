<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:04
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 13:39:36
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
  deleteTaskInfo
} from '@/api/staff-task';
import {
  queryUser
} from '@/api/select';
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
        taskTitle: '',
        executor: '',
        taskType: '',
        status: ''
      },
      // 表格
      records: [],
      listLoading: false,
      tableConfig,
      columns: columns(this),
      operates: operates(this),
      // 弹框
      editData: {},
      openType: '',
      dialogVisible: false
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    queryMethod({
      keyword,
      pageSize,
      currentPage

    }) {
      return new Promise((resolve) => {
        queryUser({
          name: keyword,
          pageSize,
          pageNo: currentPage
        }).then((res) => {
          const records = res.records
          resolve({
            records,
            total: res.totalRecord
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取表格数据
    getTableData() {
      // this.listLoading = true;
      queryTaskInfoPage({
        pageNo: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        const obj = res.data
        this.records = obj.records;
        this.params.totalRecord = obj.totalRecord;
        this.listLoading = false;
      });
    },
    // 打开弹框
    handleOpen(item = {}, type) {
      this.openType = type
      this.editData = { taskInfoId: item.taskInfoId || '' };
      // if (['detail', 'edit', 'add'].includes(type)) {
      this.dialogVisible = true;
      // }
    },
    // 删除
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
}
</style>
