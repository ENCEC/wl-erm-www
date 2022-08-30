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
            <el-table class="table-regular" border stripe :data="tableData" style="width: 100%">
              <el-table-column prop="count" label="序号" width="50" />
              <el-table-column prop="entryName" label="规范条目" width="120" />
              <el-table-column prop="detailName" label="程序名称" />
              <el-table-column prop="actionSerialNum" label="执行顺序" width="100" />
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件:" prop="staffApplication">
            <el-button
              type="primary"
              @click="handleDownload"
            >申请表下载</el-button>
            <upload-file-multiple ref="regularUploadFile" accept=".pdf" :resume="form.staffApplication" type="转正申请表" :user-id="userId" :user-name="name" @fileListChange="fileListChange" />
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
import { queryAllWorkUserList } from '@/api/common';
import { saveOffer, downloadExternalFile, batchUploadFile } from '@/api/staff-query.js';
import UploadFileMultiple from '@/components/CurrentSystem/UploadFileMultiple';

// import { saveOffer, downloadExternalFile, uploadExternalFile, queryOfferInfo, queryDismissInfo, preservationUemUser, saveLeave, queryUemUser, getUemUser } from '@/api/staff-query.js';
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
    UploadFileMultiple
  },
  data() {
    var validateStaffApplication = (rule, value, callback) => {
      if (this.fileList.length < 2) {
        callback(new Error('请上传试用期考核表和试用期工作总结'));
      }
      callback();
    };
    return {
      buttonLoading: false,
      dialogVisible: false,
      positiveTypeOptions: this.$dict.getDictOptions('OFFER_TYPE'),
      approverColumns,
      tableData: [],
      fileList: [],
      form: {
        uemUserName: '',
        applyDate: '',
        offerType: '',
        approver: '',
        staffApplication: ''
        // standardDetailId: '6960887517290696704',
        // standardEntryId: ''
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
        ],
        staffApplication: [
          { validator: validateStaffApplication, trigger: 'blur' }
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
    fileListChange(list) {
      this.fileList = [].concat(list)
    },
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
        // if (this.tableData.length > 0) {
        //   this.form.standardEntryId = this.tableData[0].standardEntryId;
        // }
        this.tableData.forEach((item, index) => {
          item.count = index + 1;
        });
      });
    },
    async handleDownload() {
      await this.downloadMethod('fed56a9f-02fa-45ac-8fc7-a4c2c68fe309.doc')
      await this.downloadMethod('2b34de16-d50f-4962-beec-04b42e67d052.doc')
    },
    downloadMethod(fileKey) {
      const params = {
        systemId: 'YYDM200013',
        fileKey: fileKey
      };
      downloadExternalFile(params)
        .then((res) => {
          const fileName = res.fileName;
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
            type: 'application/msword;chartset=UTF-8'
          });
          const url = window.URL.createObjectURL(blob);
          // 在新窗口打开该文件用这个
          // window.open(url);
          const a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', fileName);
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
    handleUploadFileMultiple() {
      var fileType = ['pdf', 'pdf']
      const params = {
        systemId: 'YYDM200013',
        fileType: fileType,
        file: this.fileList
      };
      this.formdata = new FormData();
      this.formdata.append('fileType', params.fileType);
      this.formdata.append('systemId', params.systemId);
      this.formdata.append('file', params.file[0]);
      this.formdata.append('file', params.file[1]);
      this.formdata.append('uemUserId', this.userId);
      batchUploadFile(this.formdata)
        .then((res) => {
        })
        .catch(() => {
          // this.fileList = []
          this.$message.error('文件上传失败');
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
                this.handleUploadFileMultiple()
                this.dialogVisible = false;
                this.buttonLoading = false;
              } else {
                this.$message.error(res.errorMessages[0]);
                this.buttonLoading = false;
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
        this.$refs.regularUploadFile.reset()
        this.resetForm();
        this.$refs.regularForm.clearValidate();
      });
    },
    resetForm() {
      this.form = {
        uemUserName: '',
        applyDate: '',
        offerType: '',
        approver: ''
        // standardEntryId: ''
      };
    },
    // 文件上传后
    handleResumeChange(resume) {
      this.form.staffApplication = resume || '';
    },
    // 文件删除后
    handleDeleteChange() {
      this.form.staffApplication = '';
    },
    approverQueryMethod({ keyword, pageSize, currentPage }) {
      return new Promise((resolve) => {
        queryAllWorkUserList({
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
.table-regular{

}
</style>
