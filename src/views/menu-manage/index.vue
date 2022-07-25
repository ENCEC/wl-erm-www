<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 16:05:47
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 16:58:36
 * @Description: 系统管理-菜单管理
-->
<template>
  <div class="app-container menu-manage">
    <el-form ref="filterFormRef" :model="filterForm" :inline="true" size="mini">
      <el-form-item label="菜单标题" prop="menuTitle">
        <el-input
          v-model="filterForm.menuTitle"
          placeholder="请输入菜单标题"
          clearable
        />
      </el-form-item>
      <el-form-item label="父级菜单" prop="parentMenu">
        <el-select
          v-model="filterForm.parentMenu"
          placeholder="请选择父级菜单"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="filterForm.status"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="btn-wrap">
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="handleOpen"
          >新增菜单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="handleQuery"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="resetQueryForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格 Start -->
    <el-table
      highlight-current-row
      :data="records"
      height="350px"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" />
      <el-table-column prop="menuTitle" label="菜单标题" />
      <el-table-column prop="parentMenu" label="父级菜单" />
      <el-table-column prop="resourceAddress" label="资源地址" />
      <el-table-column prop="menuSort" label="菜单序号" />
      <el-table-column prop="createName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="teacherGender" label="状态">
        <template slot-scope="scope">
          {{ scope.row.teacherGender === 1 ? "启用" : "禁用" }}
        </template>
      </el-table-column>
      <el-table-column prop="teacherGender" label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <span @click="handleOpen(scope.row.id)">编辑</span>
            <span @click="changeStatus(1)">启用</span>
            <span @click="changeStatus(2)">禁用</span>
            <span @click="handleDelete(scope.row.id)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
    <!-- 分页 -->
    <el-pagination
      class="pagination-wrap"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 新增/修改用户 -->
    <CreateDialog :visible.sync="dialogShow" />
  </div>
</template>
<script>
import CreateDialog from './component/create-dialog';
import { queryUemUser } from '@/api/menu-manege';

export default {
  name: 'MenuManage',
  components: {
    CreateDialog
  },
  data() {
    return {
      options: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '禁用'
        }
      ],
      show: false,
      dialogShow: false,
      filterForm: {
        menuTitle: '',
        name: '',
        status: '',
        currentPage: 1,
        pageSize: 10
      },
      records: [{}],
      total: 100,
      currentRow: ''
    };
  },
  computed: {},
  created() {
    // this.getTableData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      queryUemUser(this.filterForm).then(res => {
        this.records = res.data.records;
        this.total = res.data.total;
      });
    },
    // 重置
    resetQueryForm() {
      this.$refs.filterFormRef.resetFields();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    handleClose() {
      this.dialogShow = false;
    },
    handleOpen() {
      this.dialogShow = true;
    },
    // 查询
    handleQuery() {
      console.log('【 查询 】-160');
    },
    // 重置密码
    resetPassword() {
      this.show = true;
    },
    // 启用禁用
    changeStatus(status) {
      console.log('【 status 】-178', status);
    },
    // 删除
    handleDelete(id) {
      console.log('【 id 】-178', id);
      this.$confirm(
        '您确定要删除该菜单信息吗？删除后该菜单信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-manage {
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
