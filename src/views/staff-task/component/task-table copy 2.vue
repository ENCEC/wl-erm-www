<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 14:44:51
 * @Description:
-->
<template>
  <div class="table-wrap">
    <el-form ref="tableFormRef" :model="tableForm" class="tableform-wrap" size="mini" label-width="auto" :rules="tableFormRules">
      <!-- 表格 Start -->
      <el-table
        highlight-current-row
        :data="tableForm.tableData"
        height="350px"
        style="width: 100%"
        border
        size="mini"
        @select="handleRowSelect"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="type==='detail'" type="index" label="序号" width="50" />
        <el-table-column v-if="type!=='detail'" type="selection" width="40" />
        <!-- TODO -->
        <el-table-column prop="taskTitle" label="规范条目" />
        <el-table-column v-if="type!=='detail'" prop="actionTime" label="执行时间" />
        <el-table-column v-if="type!=='detail'" prop="actionPeriod" label="执行周期(工时)" min-width="130" />
        <el-table-column prop="taskName" label="任务名称" />
        <el-table-column prop="actionSerialNum" label="执行顺序" />
        <el-table-column v-if="type==='detail'" prop="ordinator" label="负责人" />
        <el-table-column v-if="type!=='detail'" prop="ordinator" label="负责人" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="type!=='detail' && scope.$index >= 0"
              :prop="`tableData[${scope.$index}].ordinator`"
              :rules="[
                { required: scope.row.required, message: '请选择姓名', trigger: ['blur','change'] }
              ]"
            >
              <!-- :rules="[
                { required: true, message: '请选择姓名', trigger: ['blur','change'] }
              ]" -->
              <UserAssociate v-model="scope.row.ordinator" :disabled="scope.row.checked" />
              <!-- <el-associate
                v-model="scope.row.ordinator"
                :columns="associateColumns"
                value-prop="uemUserId"
                label-prop="name"
                clearable
                :query-method="queryMethod"
              /> -->
              <!-- <el-input v-model="scope.row.ordinator" placeholder="" /> -->
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="planEndDate" label="计划完成日期" min-width="120" />
        <el-table-column v-if="type==='detail'" prop="endDate" label="实际完成日期" min-width="120" />
        <el-table-column v-if="type==='detail'" prop="progress" label="完成进度(%)" min-width="100" />
        <!-- TODO -->
        <el-table-column v-if="type==='detail'" prop="resultAccess" label="完成结果" />
        <el-table-column v-if="type==='detail'" prop="status" label="完成情况" />
      </el-table>
      <!-- 表格 End -->
      <!-- 分页 -->
      <el-pagination
        v-if="type !== 'detail'"
        class="pagination-wrap"
        :current-page.sync="params.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="total, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-form>
  </div>
</template>
<script>
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
// import {
//   queryUser
// } from '@/api/select';
import { queryResourceByPage, updateResourceStatus } from '@/api/menu-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'TaskTable',
  components: { UserAssociate },
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
    }
  },
  data() {
    return {
      // 表单数据
      tableForm: {
        tableData: [{
          taskTitle: 'taskTitle',
          ordinator: '',
          required: true,
          checked: true
        },
        {
          taskTitle: 'taskTitle',
          ordinator: '',
          required: true,
          checked: true
        }]
      },
      // 验证规则
      tableFormRules: {
        ordinator: [
          { required: true, message: '请选择姓名', trigger: 'change' }
        ]
      },
      total: 0
      // associateColumns: [
      //   {
      //     title: '姓名',
      //     field: 'name'
      //   }
      // ],
      // queryMethod({
      //   keyword,
      //   pageSize,
      //   currentPage

      // }) {
      //   console.log('【  pageSize,currentPage 】-108', pageSize, currentPage)
      //   return new Promise((resolve) => {
      //     queryUser({
      //       name: keyword,
      //       pageSize,
      //       pageNo: currentPage
      //     }).then((res) => {
      //       // console.log('【 res 】-111', res)
      //       const records = res.records
      //       resolve({
      //         records,
      //         total: res.totalRecord
      //       });
      //     });
      //   }).catch((err) => {
      //     console.log(err);
      //   });
      // }
    };
  },
  computed: {},
  created() {
    console.log('【 this.type 】-138', this.type)
    if (this.type === 'detail') {
      this.tableForm.tableData = this.records
      console.log('【 this.tableForm.tableData 】-141', this.tableForm.tableData)
    } else {
      // this.getTableData();
    }
  },
  methods: {
    // 获取表格数据
    getTableData() {
      queryResourceByPage({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize
      }).then(res => {
        this.tableForm.tableData = res.data.records;
        this.total = res.data.totalRecord;
      });
    },
    // 勾选数据行的 Checkbox 时触发的事件
    handleRowSelect(selection, row) {
      row.checked = !row.checked
      console.log('【 selection, row 】-178', selection, row)
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('getSelectedData', val)
      this.$emit('update:selectedList', val)
    },
    validateTableForm() {
      console.log('【 ======validateTableForm===== 】-154')
      this.$refs.tableFormRef.validate(valid => {
        console.log('【 ======validateTableForm===== 】-154', valid)
        // if (!valid)
        return valid
      })
    },
    // 启用禁用
    changeStatus(item) {
      const sysResourceId = item.sysResourceId
      const isValid = item.isValid
      updateResourceStatus({ sysResourceId, isValid }).then(res => {
        this.$message.success('操作成功');
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
