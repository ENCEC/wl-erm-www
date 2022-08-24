<template>
  <el-dialog
    title="转正申请"
    :visible.sync="dialogVisible"
    width="800px"
    center
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
            <el-table stripe :data="tableData" style="width: 100%">
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
            <upload-file accept=".pdf" :resume="form.staffApplication" type="转正申请表" :user-id="userId" :user-name="name" />
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
import { saveOffer, downloadExternalFile } from '@/api/staff-query.js';
import UploadFile from '@/components/CurrentSystem/UploadFile';

// import { saveOffer, downloadExternalFile, uploadExternalFile, queryOfferInfo, queryLeaveInfo, queryDismissInfo, preservationUemUser, saveLeave, queryUemUser, getUemUser } from '@/api/staff-query.js';
// const positiveTypeOptions = [
//   { label: '正常转正', value: '正常转正' },
//   { label: '提前转正', value: '提前转正' }
// ];
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
      positiveTypeOptions: this.$dict.getDictOptions('OFFER_TYPE'),
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
        // fileKey:''
        fileKey: '120df0ff-8d74-4868-a5b9-bcb34333df0e.pdf'
      };
      downloadExternalFile(params)
        .then((res) => {
          const fileName = res.file.substring(0, res.file.lastIndexOf('.'));
          console.log(res);
          const base = res.file; // 你要传入的base64数据
          const bstr = window.atob(base);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 确定解析格式，可能可以变成img，没有深入研究
          const blob = new Blob([u8arr], {
            type: 'application/pdf;chartset=UTF-8'
          });
          const url = window.URL.createObjectURL(blob);
          // 在新窗口打开该pdf用这个
          window.open(url);
          // 下载dpf用这个
          const a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', fileName + '.pdf');
          a.setAttribute('target', '_blank'); // 打开一个新的窗口
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // 删除url绑定
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err);
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
          saveOffer(params)
            .then((res) => {
              if (res.success) {
                this.$message.success(res.data);
                this.dialogVisible = false;
                this.buttonLoading = false;
              } else {
                this.$message.error(res.errorMessages[0]);
              }
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

<style lang="scss">
</style>
