<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 21:05:06
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-15 17:08:37
 * @Description:
-->

<template>
  <div class="staff-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="720px"
      center
      :close-on-click-modal="false"
      top="10vh"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="mini"
        label-width="100px"
        :inline="true"
        :disabled="type === 'detail'"
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 性别（0男，1女） -->
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="formData.sex">
                  <!-- <el-radio
                    v-for="item in sexOptions"
                    :key="'sex' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio> -->
                  <el-radio :label="false">男</el-radio>
                  <el-radio :label="true">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出生日期:" prop="birthday">
                <el-date-picker
                  v-model="formData.birthday"
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
                <el-radio-group v-model="formData.jobStatus">
                  <el-radio
                    v-for="item in jobStatusOptions"
                    :key="'jobStatus' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号码:" prop="idCard">
                <el-input
                  v-model="formData.idCard"
                  placeholder="请输入身份证号码"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  placeholder="请输入联系电话"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="现住址:" prop="address">
                <el-input
                  v-model="formData.address"
                  placeholder="请输入现住址"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户籍地址:" prop="sourceAddress">
                <el-input
                  v-model="formData.sourceAddress"
                  placeholder="请输入户籍地址"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="婚姻状况:" prop="maritalStatus">
                <el-select
                  v-model="formData.maritalStatus"
                  placeholder="请选择婚姻状况"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in maritalStatusOptions"
                    :key="'maritalStatus'+item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- TODO 下拉值-->
              <el-form-item label="政治面貌:" prop="politicalStatus">
                <el-select
                  v-model="formData.politicalStatus"
                  placeholder="请选择政治面貌"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in projectTypeOptions"
                    :key="'politicalStatus'+index+item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历:" prop="education">
                <el-select
                  v-model="formData.education"
                  placeholder="请选择学历"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in educationOptions"
                    :key="'education'+item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间:" prop="graduateDate">
                <el-date-picker
                  v-model="formData.graduateDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择毕业时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业学校:" prop="graduateSchool">
                <el-input
                  v-model="formData.graduateSchool"
                  placeholder="请输入毕业学校"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在校专业:" prop="speciality">
                <el-input
                  v-model="formData.speciality"
                  placeholder="请输入在校专业"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间:" prop="entryDate">
                <!-- value-format="yyyy-MM-dd" -->
                <el-date-picker
                  v-model="formData.entryDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择入职时间"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职部门:" prop="uemDeptId">
                <Department v-model="formData.uemDeptId" clearable placeholder="请选择入职部门" class="input-width" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <StaffDuty v-model="formData.staffDutyCode" class="input-width" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位职称:" prop="technicalTitleId">
                <el-select
                  v-model="formData.technicalTitleId"
                  placeholder="请选择岗位职称"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in technicalOptions"
                    :key="'technicalTitleId'+item.technicalTitleId"
                    :label="item.technicalName"
                    :value="item.technicalTitleId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱:" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="请输入电子邮箱"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作年限:" prop="seniority">
                <el-input
                  v-model="formData.seniority"
                  placeholder="请输入工作年限"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <!-- TODO 联想控件 -->
              <el-form-item label="归属项目:" prop="projectId">
                <el-select
                  v-model="formData.projectId"
                  placeholder="请选择归属项目"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item,index) in projectTypeOptions"
                    :key="'projectId'+index+item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人简历:">
                <el-button type="text">个人简历</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                v-if="type === 'detail'"
                label="创建时间:"
              >
                <el-input
                  v-model="formData.createTime"
                  placeholder="请输入创建时间"
                  clearable
                  class="input-width"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-if="type === 'detail'"
                label="创建人:"
              >
                <el-input
                  v-model="formData.creatorName"
                  placeholder="请输入创建人"
                  clearable
                  class="input-width"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="mini"
          @click="handleConfirm"
        >提交</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="mini"
          @click="close"
        >{{ type === 'detail'?'关闭':'取消' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryStaffById, updateStaff } from '@/api/staff-manage';
import { queryTechnicalNameBySelect, queryProjectNameBySelect } from '@/api/common';
import { formRules } from './rules';
import Department from '@/components/CurrentSystem/Department.vue'
import StaffDuty from '@/components/CurrentSystem/StaffDuty.vue'
export default {
  components: { Department, StaffDuty },
  // inheritAttrs: false,
  props: {
    visible: {
      type: Boolean
    },
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
      dialogVisible: false,
      rules: formRules, // 验证规则
      formData: {
        uemUserId: '',
        name: '',
        sex: '',
        birthday: '',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        idCard: '',
        mobile: '',
        address: '', // 现住址
        sourceAddress: '', // 户籍地址
        maritalStatus: '', // 婚姻状况（0：未婚 1：已婚 2：离婚）
        politicalStatus: '', //  政治面貌
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
        projectId: ''// 归属项目
      },
      // sexOptions: this.$dict.getDictOptions('SEX'),
      maritalStatusOptions: this.$dict.getDictOptions('MARITAL_STATUS'),
      educationOptions: this.$dict.getDictOptions('EDUCATION'),
      technicalOptions: [], // 岗位职称
      projectTypeOptions: []
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      return this.type === 'detail' ? '员工详细信息' : '编辑员工信息';
    },
    // 在职状态 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
    }
  },
  watch: {
    dialogVisible() {
      this.$emit('update:visible', this.dialogVisible)
    }
  },
  created() {
    this.getSelectOptions()
  },
  mounted() {
    this.dialogVisible = this.visible
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取用户信息
    getDetailInfo() {
      queryStaffById({
        uemUserId: this.editData.uemUserId
      }).then(res => {
        for (const key in this.formData) {
          if (key === 'sex') {
            this.formData[key] = res[key] || false
          } else {
            this.formData[key] = res[key] || ''
          }
        }
        // this.formData = {
        //   ...this.formData,
        //   ...res,
        //   jobStatus: res.jobStatus || '',
        //   entryDate: res.entryDate || '',
        //   uemDeptId: res.uemDeptId || '',
        //   staffDutyCode: res.staffDutyCode || '',
        //   technicalTitleId: res.technicalTitleId || '',
        //   projectId: res.projectId || ''
        // };
      });
    },
    // 获取下拉信息
    async getSelectOptions() {
      this.technicalOptions = await queryTechnicalNameBySelect()
      this.projectTypeOptions = await queryProjectNameBySelect()
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          updateStaff({ uemUserId: this.editData.uemUserId, ...this.formData }).then(res => {
            this.$message.success(res.data);
            this.$emit('getTableData', '');
            this.close();
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.staff-dialog {
  .form-wrap {
    min-height:480px;
    margin-bottom: 20px;
    .input-width {
      width: 180px;
    }
  }
  // 底部按钮
  .dialog-footer {
    width: 100%;
    // background: #bcf;
    display: flex;
    justify-content: center;
    .el-button--default.el-button--mini {
      min-width: 92px;
    }
  }
}
</style>
