<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 10:36:16
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 18:15:03
 * @Description: 系统管理-用户管理
-->

<template>
  <div class="app-container user-manage">
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
      :visible.sync="dialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
    <!-- 转正 -->
    <RegularDialog
      :visible.sync="regularDialogVisible"
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
import {
  queryUemUser,
  uemUserStartStop,
  deleteUemUser
} from '@/api/user-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'UserManage',
  components: {
    filterPanel,
    tableComponent,
    CreateDialog,
    RegularDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        account: undefined,
        name: undefined,
        isValid: undefined
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
      queryUemUser({
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
      this.openType = type
      this.editData = { uemUserId: item.uemUserId || '' };
      if (type === 'detail' || type === 'edit') {
        this.dialogVisible = true;
      }
      // 转正
      if (type === 'regular') {
        this.regularDialogVisible = true
      }
    },
    // 启用/禁用用户
    changeStatus(item) {
      const uemUserId = item.uemUserId;
      const isValid = item.isValid;
      uemUserStartStop({ uemUserId, isValid }).then(res => {
        this.$message.success('操作成功');
      });
    },
    // 删除用户信息
    handleDelete(uemUserId) {
      this.$confirm(
        '您确定要删除该用户吗？删除后该用户信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteUemUser({ uemUserId }).then(res => {
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
