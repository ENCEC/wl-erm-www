<template>
  <el-dialog
    title="离职申请"
    :visible.sync="dialogVisible"
    width="800px"
    center
    border
    :close-on-click-modal="false"
    top="10vh"
    z-index="10000"
    :append-to-body="true"
    @close="handleClose"
  >
    <el-form
      ref="regularForm"
      :model="form"
      label-position="right"
      :rules="rules"
      label-width="100px"
    >
      <el-row :gutter="100">
        <el-col :span="12">
          <el-form-item label="申请日期" prop="applyDate">
            <el-date-picker
              v-model="form.applyDate"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="离职原因:">
            <el-input
              v-model="form.leaveReason"
              type="textarea"
              :rows="4"
              placeholder="请输入离职原因"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批人:" prop="approver">
            <el-associate
              v-model="form.approver"
              :columns="approverColumns"
              value-prop="uemUserId"
              label-prop="name"
              clearable
              :query-method="approverQueryMethod"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-loading="buttonLoading"
        type="primary"
        size="medium"
        @click="handleSumbit"
      >提 交</el-button>
      <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { queryStandardDetail } from '@/api/standard-detail.js';
import { queryUemUser } from '@/api/standard-entry.js';
import { saveLeave } from '@/api/staff-query.js';
// import { saveOffer, downloadExternalFile, uploadExternalFile, queryOfferInfo, queryLeaveInfo, queryDismissInfo, preservationUemUser, saveLeave, queryUemUser, getUemUser } from '@/api/staff-query.js';

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
  name: 'RegularDialog',
  data() {
    return {
      buttonLoading: false,
      dialogVisible: false,
      approverColumns,
      tableData: [],
      form: {
        uemUserName: '',
        applyDate: '',
        approver: '',
        leaveReason: '',
        // standardDetailId: '6960887517290696704',
        standardEntryId: ''
      },
      rules: {
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'blur' }
        ],
        leaveReason: [
          { required: true, message: '请输入离职原因', trigger: 'blur' }
        ],
        approver: [
          { required: true, message: '请选择审批人', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['name', 'userId'])
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    getTableData() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        entryName: '员工离职'
      };
      queryStandardDetail(params).then((response) => {
        this.tableData = response.data.records || [];
        if (this.tableData.length > 0) {
          this.form.standardEntryId = this.tableData[0].standardEntryId;
        }
        this.tableData.forEach((item, index) => {
          item.count = index + 1;
        });
      });
    },
    handleSumbit() {
      this.$refs.regularForm.validate((valid) => {
        if (valid) {
          this.buttonLoading = true;
          const params = Object.assign({}, this.form, {
            uemUserName: this.name,
            uemUserId: this.userId
          });
          saveLeave(params)
            .then(() => {
              this.$message.success('申请成功');
              this.dialogVisible = false;
              this.buttonLoading = false;
            })
            .catch(() => {
              this.$message.error('申请失败');
              this.buttonLoading = false;
            });
        }
      });
    },
    handleClose() {
      this.$nextTick(() => {
        this.resetForm();
        this.$refs.regularForm.clearValidate();
      });
    },
    resetForm() {
      this.form = {
        uemUserName: '',
        applyDate: '',
        leaveReason: '',
        approver: '',
        standardEntryId: ''
      };
    },
    approverQueryMethod({ keyword, pageSize, currentPage }) {
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
