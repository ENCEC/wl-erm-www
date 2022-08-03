<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 13:34:17
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="type==='detail'" type="index" label="序号" width="50" />
        <el-table-column v-if="type!=='detail'" type="selection" width="40" />
        <el-table-column prop="resourceTitle" label="规范条目" />
        <el-table-column v-if="type!=='detail'" prop="parentResourceTitle" label="执行时间" />
        <el-table-column v-if="type!=='detail'" prop="resourceUrl" label="执行周期(工时)" min-width="130" />
        <el-table-column prop="creatorName" label="任务名称" />
        <el-table-column prop="resourceSort" label="执行顺序" />
        <el-table-column v-if="type==='detail'" prop="resourceSort" label="负责人" />
        <el-table-column v-if="type!=='detail'" prop="isValid" label="负责人" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="type === 'edit' && scope.$index >= 0"
              :prop="`tableData[${scope.$index}].creatorName`"
            >
              <el-associate
                v-model="scope.row.creatorName"
                :columns="associateColumns"
                value-prop="uemUserId"
                label-prop="name"
                clearable
                :query-method="queryMethod"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="计划完成日期" min-width="120" />
        <el-table-column v-if="type==='detail'" prop="resourceSort4" label="实际完成日期" min-width="120" />
        <el-table-column v-if="type==='detail'" prop="resourceSort3" label="完成进度(%)" min-width="100" />
        <el-table-column v-if="type==='detail'" prop="resourceSort1" label="完成结果" />
        <el-table-column v-if="type==='detail'" prop="resourceSort2" label="完成情况" />
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
import {
  queryStaffByPage
} from '@/api/staff-manage';
import { queryResourceByPage, updateResourceStatus } from '@/api/menu-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'MenuManage',
  components: {},
  mixins: [tableMix],
  // inheritAttrs: false,
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
      tableForm: {
        tableData: [], // 表单数据
        remarks: ''
      },
      tableFormRules: {
        creatorName: [
          // { required: true, message: 'checkNum', trigger: 'blur' }
          { required: true, message: '请选择姓名', trigger: 'blur' }
        ]
      },
      // editData: {},
      total: 0,
      associateColumns: [
        {
          title: '姓名',
          field: 'name'
        }
        // {
        //   title: '教师性别',
        //   field: 'sex'
        // }
      ],
      queryMethod({
        keyword,
        pageSize,
        currentPage

      }) {
        console.log('【  pageSize,currentPage 】-108', pageSize, currentPage)
        return new Promise((resolve) => {
          queryStaffByPage({
            name: keyword,
            pageSize,
            currentPage
          }).then((res) => {
            // console.log('【 res 】-111', res)
            const records = res.records
            resolve({
              records,
              total: res.totalRecord
            });
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    };
  },
  computed: {},
  created() {
    console.log('【 this.type 】-138', this.type)
    if (this.type === 'detail') {
      this.tableForm.tableData = this.records
      console.log('【 this.tableForm.tableData 】-141', this.tableForm.tableData)
    } else {
      this.getTableData();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
