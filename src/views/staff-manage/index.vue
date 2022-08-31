<!--
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-31 11:01:25
 * @Description: 员工管理-员工管理
-->

<template>
  <div class="app-container user-manage">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm">
      <!-- 入职部门 -->
      <template #uemDeptId>
        <Department v-model="filterForm.uemDeptId" clearable width="200px" placeholder="请选择入职部门" />
      </template>
      <!-- 入职岗位 -->
      <template #staffDutyId>
        <StaffDuty v-model="filterForm.staffDutyId" clearable width="200px" placeholder="请选择入职岗位" />
      </template>
    </filter-panel>
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
    <!-- 转正 -->
    <RegularDialog
      v-if="regularDialogVisible"
      :visible.sync="regularDialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
    <!--离职 辞退 -->
    <DismissDialog
      v-if="dismissDialogVisible"
      :visible.sync="dismissDialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import tableComponent from '@/components/TableComponent';
import Department from '@/components/CurrentSystem/Department.vue'
import StaffDuty from '@/components/CurrentSystem/StaffDuty.vue'
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import RegularDialog from './component/regular-dialog';
import DismissDialog from './component/dismiss-dialog';
import {
  queryStaffByPage,
  deleteStaff
} from '@/api/staff-manage';
import { queryTechnicalNameBySelect } from '@/api/common';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'StaffManage',
  components: {
    filterPanel,
    Department, StaffDuty,
    tableComponent,
    CreateDialog,
    RegularDialog,
    DismissDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        name: '',
        deptCode: '', // 入职部门
        staffDutyId: '', // 入职岗位
        technicalName: '', // 岗位职称
        jobStatus: ''
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
      dialogVisible: false,
      regularDialogVisible: false,
      dismissDialogVisible: false
    };
  },
  computed: {},
  created() {
    this.getTableData();
    this.getSelectOptions()
  },
  mounted() {},
  methods: {
    // 获取下拉信息
    async getSelectOptions() {
      // 岗位职称
      this.filterConfig.filterList[3].options = await queryTechnicalNameBySelect()
    },
    // 获取表格数据
    getTableData() {
      // this.listLoading = true;
      queryStaffByPage({
        pageNo: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        this.records = res.records;
        this.params.totalRecord = res.totalRecord;
        this.listLoading = false;
      });
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开弹框
    handleOpen(item = {}, type) {
      this.openType = type
      // 编辑/查看
      if (['detail', 'edit'].includes(type)) {
        this.dialogVisible = true;
      }
      // 转正
      if (type === 'regular') {
        this.regularDialogVisible = true
      }
      // 离职
      if (['quit', 'dismiss'].includes(type)) {
        this.dismissDialogVisible = true
      }
      this.editData = { uemUserId: item.uemUserId || '' };
    },
    // 删除用户信息
    handleDelete(uemUserId) {
      this.$confirm(
        '您确定要删除该员工信息吗？删除后该员工信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteStaff({ uemUserId }).then(() => {
          this.$message.success('操作成功');
          this.getTableData();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-manage {
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
