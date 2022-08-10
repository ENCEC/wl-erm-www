<template>
  <el-dialog
    title="转正申请"
    :visible.sync="dialogVisible"
    width="800px"
    @close="handleClose"
  >
    <el-form :model="form" label-position="right" label-width="100px">
      <el-row :gutter="100">
        <el-col :span="12">
          <el-form-item label="申请日期" prop="ApplyDate">
            <el-input v-model="form.ApplyDate" size="medium" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转正类型:" prop="OfferType">
            <el-radio-group v-model="form.OfferType">
              <el-radio
                v-for="item in positiveTypeOptions"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转正程序:">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="count" label="序号" width="50" />
              <el-table-column prop="entryName" label="规范条目" />
              <el-table-column prop="detailName" label="程序名称" />
              <el-table-column prop="actionSerialNum" label="执行顺序" />
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件:">
            <el-button type="primary">申请表下载</el-button>
            <el-button type="primary">上传</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批人:" prop="Approver">
            <el-associate
              v-model="form.Approver"
              :columns="approverColumns"
              value-prop="uemUserId"
              label-prop="name"
              clearable
              :query-method="approverQueryMethod"
              @change="handleApproverChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleSumbit">提 交</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { queryStandardDetail } from '@/api/standard-detail.js';
import { saveOffer, queryUemUser } from '@/api/staff-query.js';
// import { saveOffer, downloadExternalFile, uploadExternalFile, queryOfferInfo, queryLeaveInfo, queryDismissInfo, preservationUemUser, saveLeave, queryUemUser, getUemUser } from '@/api/staff-query.js';
const positiveTypeOptions = [
  { label: '正常转正', value: '正常转正' },
  { label: '提前转正', value: '提前转正' }
];
const approverColumns = [
  {
    field: 'account',
    title: '用户名'
  },
  {
    field: 'name',
    title: '姓名'
  },
  {
    field: 'mobile',
    title: '联系电话'
  },
  {
    field: 'email',
    title: '电子邮箱'
  }
];
export default {
  data() {
    return {
      dialogVisible: false,
      positiveTypeOptions,
      approverColumns,
      tableData: [],
      form: {
        uemUserName: 'qqqq',
        ApplyDate: '2022-5-20',
        OfferType: '正常转正',
        Approver: '6958961099819442176',
        standardDetailId: '6960887517290696704',
        standardEntryId: '6960875859204194304'
      }
    };
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    open() {
      debugger
      this.dialogVisible = true
    },
    getTableData() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        entryName: '员工转正'
      };
      queryStandardDetail(params).then((response) => {
        this.tableData = response.data.records;
        this.tableData.forEach((item, index) => {
          item.count =
            index + 1
        });
      });
    },
    handleSumbit() {
      saveOffer()
    },
    handleClose() {},
    approverQueryMethod(keyword, pageSize, currentPage) {
      return new Promise((resolve) => {
        queryUemUser({
          name: keyword,
          pageSize,
          pageNo: currentPage
        }).then((res) => {
          const records = res.data.records;
          resolve({
            records,
            total: res.data.totalRecord
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>

<style>
</style>
