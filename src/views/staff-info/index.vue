<template>
  <div class="app-container">
    <el-form
      ref="staffInfoForm"
      v-loading="formLoading"
      :model="form"
      label-position="right"
      label-width="100px"
      :rules="rules"
    >
      <div class="staff-info-wrap">
        <div class="staff-info-module">
          <div class="staff-info-module-title">基本信息</div>
          <el-divider />
          <div class="staff-info-form">
            <el-row :gutter="100">
              <el-col :span="12">
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    v-model="form.name"
                    placeholder="请输入姓名"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 性别（0男，1女） -->
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="form.sex">
                    <el-radio :label="false">男</el-radio>
                    <el-radio :label="true">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="100">
              <el-col :span="12">
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    v-model="form.birthday"
                    format="yyyy-MM-dd"
                    class="input-width"
                    placeholder="请选择出生日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 在职状态（0：试用员工 1：正式员工 2：离职员工） -->
                <el-form-item label="在职状态:" prop="jobStatus">
                  <el-radio-group v-model="form.jobStatus">
                    <el-radio
                      v-for="item in jobStatusOptions"
                      :key="'jobStatus' + item.value"
                      :label="item.value"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="100">
              <el-col :span="12">
                <el-form-item label="身份证号码:" prop="idCard">
                  <el-input
                    v-model="form.idCard"
                    placeholder="请输入身份证号码"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="mobile">
                  <el-input
                    v-model="form.mobile"
                    placeholder="请输入联系电话"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="100">
              <el-col :span="12">
                <el-form-item label="现住址:" prop="address">
                  <el-input
                    v-model="form.address"
                    placeholder="请输入现住址"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="户籍地址:" prop="sourceAddress">
                  <el-input
                    v-model="form.sourceAddress"
                    placeholder="请输入户籍地址"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="100">
              <el-col :span="12">
                <el-form-item label="婚姻状况:" prop="maritalStatus">
                  <el-select
                    v-model="form.maritalStatus"
                    placeholder="请选择婚姻状况"
                    clearable
                    class="input-width"
                  >
                    <el-option
                      v-for="item in maritalStatusOptions"
                      :key="'maritalStatus' + item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- TODO -->
                <el-form-item label="政治面貌:" prop="politicalStatus">
                  <el-select
                    v-model="form.politicalStatus"
                    placeholder="请选择政治面貌"
                    clearable
                    class="input-width"
                  >
                    <el-option
                      v-for="(item, index) in politicsOptions"
                      :key="'politicalStatus' + index"
                      :label="politicsOptions[index].label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="100">
              <el-col :span="12">
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input
                    v-model="form.email"
                    placeholder="请输入电子邮箱"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作年限:" prop="seniority">
                  <el-input
                    v-model="form.seniority"
                    placeholder="请输入工作年限"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="staff-info-module">
          <div class="staff-info-module-title margin">毕业学校信息</div>
          <el-divider />
          <el-row :gutter="100">
            <el-col :span="12">
              <el-form-item label="学历:" prop="education">
                <el-select
                  v-model="form.education"
                  placeholder="请选择学历"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="item in educationOptions"
                    :key="'education' + item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间:" prop="graduateDate">
                <el-date-picker
                  v-model="form.graduateDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择毕业时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="100">
            <el-col :span="12">
              <el-form-item label="毕业学校:" prop="graduateSchool">
                <el-input
                  v-model="form.graduateSchool"
                  placeholder="请输入毕业学校"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在校专业:" prop="speciality">
                <el-input
                  v-model="form.speciality"
                  placeholder="请输入在校专业"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="staff-info-module">
          <div class="staff-info-module-title margin">入职信息</div>
          <el-divider />
          <el-row :gutter="100">
            <el-col :span="12">
              <el-form-item label="入职时间:" prop="entryDate">
                <el-date-picker
                  v-model="form.entryDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择入职时间"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位职称:" prop="technicalTitleId">
                <el-select
                  v-model="form.technicalTitleId"
                  placeholder="请选择岗位职称"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in technicalOptions"
                    :key="'technicalTitleId' + item.technicalTitleId + index"
                    :label="item.technicalName"
                    :value="item.technicalTitleId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="100">
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <!-- <StaffDuty v-model="form.staffDutyCode" class="input-width" /> -->
                <el-select
                  v-model="form.staffDutyCode"
                  placeholder="请选择入职岗位"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in staffDutyOptions"
                    :key="'staffDutyCode' + item.postId + index"
                    :label="item.postName"
                    :value="item.postId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人简历:">
                <upload-file
                  ref="sysUploadFile"
                  accept=".pdf"
                  :resume="form.resume"
                  type="个人简历"
                  :user-id="form.uemUserId"
                  :user-name="form.name"
                  @resumeChange="handleResumeChange"
                  @deleteResume="handleDeleteChange"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="100">
            <el-col :span="12">
              <!-- TODO 联想控件 -->
              <el-form-item label="归属项目:" prop="projectId">
                <el-select
                  v-model="form.projectId"
                  placeholder="请选择归属项目"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in projectTypeOptions"
                    :key="'projectId' + index + item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="operate-button">
          <el-button
            type="primary"
            :loading="buttonLoading"
            @click="handleSave"
          >保存</el-button>
          <el-button
            v-if="form.jobStatus === '0'"
            class="regular-btn"
            type="primary"
            @click="handleRegular"
          >转正申请</el-button>
          <el-button
            v-if="form.jobStatus === '1'"
            class="dismiss-btn"
            type="primary"
            @click="handleDismiss"
          >离职申请</el-button>
        </div>
      </div>
    </el-form>
    <!-- <RegularDialog ref="dialogRegular" /> -->
    <regular-dialog ref="dialogRegular" />
    <dismiss-dialog ref="dialogDismiss" />
  </div>
</template>

<script>
import { queryStaffById } from '@/api/staff-manage';
import { preservationUemUser } from '@/api/staff-query.js';
import {
  queryTechnicalNameBySelect,
  queryProjectNameBySelect,
  queryStaffDutyBySelect
} from '@/api/select-02';
import RegularDialog from './component/regular-dialog';
import DismissDialog from './component/dismiss-dialog';
import UploadFile from '@/components/CurrentSystem/UploadFile';
import { mapGetters } from 'vuex';
export default {
  name: 'StaffInfo',
  components: {
    RegularDialog,
    DismissDialog,
    UploadFile
  },

  data() {
    return {
      // 表单加载状态
      formLoading: false,
      // 保存按钮加载状态
      buttonLoading: false,
      form: {
        uemUserId: '',
        account: '',
        name: '',
        sex: '',
        birthday: '',
        resume: '', // 简历地址
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        idCard: '',
        mobile: '',
        address: '', // 现住址
        sourceAddress: '', // 户籍地址
        maritalStatus: '', // 婚姻状况（0：未婚 1：已婚 2：离婚）
        politicalStatus: '', // 政治面貌
        education: '', // 学历（0：专科 1：本科 2：研究生 3：博士生）
        graduateDate: '', // 毕业时间
        graduateSchool: '', //
        speciality: '', // 在校专业
        entryDate: '', // 入职时间
        uemDeptId: '', // 入职部门
        staffDutyCode: '', // 入职岗位
        technicalTitleId: '', // 岗位职称
        email: '',
        seniority: '', // 工作年限
        projectId: '' // 归属项目
      },
      // sexOptions: this.$dict.getDictOptions('SEX'), // 性别
      maritalStatusOptions: this.$dict.getDictOptions('MARITAL_STATUS'), // 婚姻状况
      educationOptions: this.$dict.getDictOptions('EDUCATION'), // 学历
      jobStatusOptions: this.$dict.getDictOptions('JOB_STATUS'), // 在职状态
      politicsOptions: this.$dict.getDictOptions('POLITICAL_STATUS'), // 政治面貌

      technicalOptions: [], // 岗位职称
      staffDutyOptions: [], // 入职岗位
      projectTypeOptions: [], // 归属项目

      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        jobStatus: [
          { required: true, message: '请选择在职状态', trigger: 'change' }
        ],
        idCard: [
          {
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          },
          {
            pattern:
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '请输入正确的身份证号码',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入现住址', trigger: 'change' }
        ],
        // sourceAddress: [{ required: true, message: "请输入户籍地址", trigger: change }],
        email: [
          {
            required: true,
            message: '请输入电子邮箱',
            trigger: 'blur'
          },
          {
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '电子邮箱格式错误',
            trigger: 'blur'
          }
        ],
        seniority: [
          { required: true, message: '请输入工作年限', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
        graduateDate: [
          { required: true, message: '请选择毕业时间', trigger: 'change' }
        ],
        graduateSchool: [
          { required: true, message: '请输入毕业学校', trigger: 'change' }
        ],
        speciality: [
          { required: true, message: '请输入在校专业', trigger: 'change' }
        ],
        entryDate: [
          { required: true, message: '请选择入职时间', trigger: 'change' }
        ],
        technicalTitleId: [
          { required: true, message: '请选择岗位职称', trigger: 'change' }
        ],
        staffDutyCode: [
          { required: true, message: '请选择入职岗位', trigger: 'change' }
        ],
        projectId: [
          { required: true, message: '请选择归属项目', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getStaffInfo();
    this.getSelectOptions();
  },
  methods: {
    // 文件上传后
    handleResumeChange(resume) {
      debugger;
      this.form.resume = resume || '';
    },
    // 文件删除后
    handleDeleteChange() {
      debugger;
      this.form.resume = '';
    },

    // 获取下拉信息
    async getSelectOptions() {
      this.technicalOptions = await queryTechnicalNameBySelect();
      this.projectTypeOptions = await queryProjectNameBySelect();
      this.staffDutyOptions = await queryStaffDutyBySelect();
    },
    handleRegular() {
      this.$refs.dialogRegular.open();
    },
    handleDismiss() {
      this.$refs.dialogDismiss.open();
    },
    getStaffInfo() {
      this.formLoading = true;
      queryStaffById({
        uemUserId: this.userId
      })
        .then((res) => {
          for (const key in this.form) {
            if (key === 'sex') {
              this.form[key] = res[key] || false;
            } else {
              this.form[key] = res[key] || '';
            }
          }
          this.formLoading = false;
        })
        .catch(() => {
          this.$message.error('获取员工信息失败');
          this.formLoading = false;
        });
    },
    handleSave() {
      this.buttonLoading = true;
      this.$refs.staffInfoForm.validate((valid) => {
        if (valid) {
          this.$refs.sysUploadFile.sysUploadFile()
          preservationUemUser()
            .then(() => {
              this.$message.success('保存成功');
              this.buttonLoading = false;
            })
            .catch(() => {
              this.$message.error('保存失败');
              this.buttonLoading = false;
            });
        }
      });
    },
    validateEmail(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入邮箱地址'));
      }
      var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const result = res.test(value);
      if (!result) {
        callback(new Error('请输入正确的邮箱地址'));
      }
    },
    validateIdCard(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入身份证号码'));
      }
      var res = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      const result = res.test(value);
      if (!result) {
        callback(new Error('请输入正确的身份证号码'));
      }
    },
    validateMobile(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号码'));
      }
      var res = /^[1][3,4,5,6.7,8,9][0-9]{9}$/;
      const result = res.test(value);
      if (!result) {
        callback(new Error('请输入正确的手机号码'));
      }
    }
  }
};
</script>

<style lang="scss">
.staff-info-wrap {
  .staff-info-module-title {
    font-weight: bold;
    &.margin {
      margin-top: 30px;
    }
  }
  .operate-button {
    text-align: center;
    .regular-btn {
      background-color: #70b603;
      border-color: #797979;
    }
    .dismiss-btn {
      background-color: #f59a23;
      border-color: #797979;
    }
  }
  .el-divider {
    margin: 5px 0px 15px 0px !important;
    background-color: #aaaaaa;
  }
}
</style>
