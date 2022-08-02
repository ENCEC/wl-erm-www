<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-02 18:52:39
 * @Description:
-->
<template>
  <div class="table-wrap">
    <!-- 表格 Start -->
    <el-table
      highlight-current-row
      :data="records"
      height="350px"
      style="width: 100%"
      border
      size="mini"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column prop="resourceTitle" label="规范条目" />
      <el-table-column prop="parentResourceTitle" label="执行时间" />
      <el-table-column prop="resourceUrl" label="执行周期(工时)" min-width="130" />
      <el-table-column prop="creatorName" label="任务名称" />
      <el-table-column prop="resourceSort" label="执行顺序" />
      <el-table-column prop="isValid" label="负责人" min-width="130">
        <template slot-scope="scope">
          <el-associate
            v-model="scope.row.creatorName"
            :columns="associateColumns"
            value-prop="uemUserId"
            label-prop="name"
            clearable
            :query-method="queryMethod"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="计划完成日期" min-width="130" />
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
    editData: {
      type: Object,
      default: () => {}
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // editData: {},
      records: [{}],
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
        // console.log('【 currentPage 】-134', currentPage)
        // const data = {
        //   currentPage: currentPage,
        //   pageSize: pageSize,
        //   keyword: keyword
        // }
        // return new Promise((resolve, reject) => {
        //   ds.QTeacher.select(ds.QTeacher.teacherName, ds.QTeacher.sex).where(ds.QTeacher.teacherName._like$_(keyword)).paging(currentPage, pageSize).execute().then(res => {
        //     resolve({
        //       records: res.data.records,
        //       total: res.data.totalRecord,
        //       recordStart: res.data.recordStart,
        //       recordEnd: res.data.recordEnd
        //     })
        //   })
        // })
      }
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      queryResourceByPage({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize
      }).then(res => {
        this.records = res.data.records;
        this.total = res.data.totalRecord;
      });
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
