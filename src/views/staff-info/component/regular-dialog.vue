<template>
  <el-dialog
    title="转正申请"
    :visible.sync="dialogVisible"
    width="800px"
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
        <el-col :span="12">
          <el-form-item label="转正类型:" prop="offerType">
            <el-radio-group v-model="form.offerType">
              <el-radio
                v-for="item in positiveTypeOptions"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="转正程序:">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="count" label="序号" />
              <el-table-column prop="entryName" label="规范条目" />
              <el-table-column prop="detailName" label="程序名称" />
              <el-table-column prop="actionSerialNum" label="执行顺序" />
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件:">
            <el-button
              type="primary"
              @click="handleDownload"
            >申请表下载</el-button>
            <upload-file accept="" />
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
        @click="handleSumbit"
      >提 交</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { queryStandardDetail } from '@/api/standard-detail.js';
import { queryUemUser } from '@/api/standard-entry.js';
import {
  saveOffer,
  downloadExternalFile
} from '@/api/staff-query.js';
import UploadFile from '@/components/CurrentSystem/UploadFile';

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
  name: 'RegularDialog',
  components: {
    UploadFile
  },
  data() {
    return {
      buttonLoading: false,
      dialogVisible: false,
      positiveTypeOptions,
      approverColumns,
      tableData: [],
      form: {
        uemUserName: '',
        applyDate: '',
        offerType: '',
        approver: '',
        // standardDetailId: '6960887517290696704',
        standardEntryId: ''
      },
      rules: {
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'blur' }
        ],
        offerType: [
          { required: true, message: '请选择转正类型', trigger: 'blur' }
        ],
        approver: [
          { required: true, message: '请选择审批人', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['name'])
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
        entryName: '员工转正'
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
    handleDownload() {
      const params = {
        systemId: 'YYDM200013',
        fileKey: '4893fd6e-1101-44a5-a766-d5337b415249.txt'
      };
      downloadExternalFile(params).then((res) => {
        debugger
        console.log(res);
      }).catch((err) => {
        debugger
        console.log(err);
      })
    },
    handleSumbit() {
      this.$refs.regularForm.validate((valid) => {
        if (valid) {
          this.buttonLoading = true;
          const params = Object.assign({}, this.form, {
            uemUserName: this.name
          });
          saveOffer(params)
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
        offerType: '',
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
