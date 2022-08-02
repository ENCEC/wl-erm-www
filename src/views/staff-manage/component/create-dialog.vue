<!--
 * @Author: Hongzf
 * @Date: 2022-08-01 13:52:08
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-02 09:10:14
 * @Description:
-->

<template>
  <div class="staff-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="720px"
      center
      :close-on-click-modal="false"
      top="10vh"
      v-on="$listeners"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="mini"
        label-width="100px"
        :inline="true"
        destroy-on-close
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
                  <el-radio
                    v-for="item in sexOptions"
                    :key="'sex' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
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
              <!-- TODO -->
              <el-form-item label="政治面貌:" prop="projectId2">
                <el-select
                  v-model="formData.projectId2"
                  placeholder="请选择政治面貌"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in projectTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
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
              <el-form-item label="入职部门:" prop="deptCode">
                <el-select
                  v-model="formData.deptCode"
                  placeholder="请选择入职部门"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in projectTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <el-select
                  v-model="formData.staffDutyCode"
                  placeholder="请选择入职岗位"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in staffTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位职称:" prop="technicalName">
                <el-select
                  v-model="formData.technicalName"
                  placeholder="请选择岗位职称"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in staffTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
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
              <!-- 联想控件 -->
              <el-form-item label="归属项目:" prop="projectId">
                <el-select
                  v-model="formData.projectId"
                  placeholder="请选择归属项目"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item, index) in projectTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人简历:" prop="projectId">
                <el-button type="text">个人简历</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="handleConfirm"
        >提交</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="mini"
          @click="close"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUemUser, saveUemUser, editUemUser } from '@/api/staff-manage';
import { formRules } from './rules';

export default {
  components: {},
  // inheritAttrs: false,
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: formRules, // 验证规则
      formData: {
        account: '',
        name: '',
        sex: '',
        birthday: '',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        idCard: '',
        mobile: '',
        address: '', // 现住址
        sourceAddress: '', // 户籍地址
        maritalStatus: '', // 婚姻状况（0：未婚 1：已婚 2：离婚）
        // 政治面貌
        education: '', // 学历（0：专科 1：本科 2：研究生 3：博士生）
        graduateDate: '', // 毕业时间
        graduateSchool: '', //
        speciality: '', // 在校专业
        entryDate: '', // 入职时间
        deptCode: '', // 入职部门
        staffDutyCode: '', // 入职岗位
        technicalName: '', // 岗位职称
        email: '',
        seniority: '', // 工作年限
        projectId: ''// 归属项目
      },
      sexOptions: this.$dict.getDictOptions('SEX'),
      maritalStatusOptions: this.$dict.getDictOptions('MARITAL_STATUS'),
      educationOptions: this.$dict.getDictOptions('EDUCATION'),
      // TODO
      staffTypeOptions: [
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        }
      ],
      // TODO
      projectTypeOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      // console.log('【 this.editData 】-246', this.editData);
      return this.editData.uemUserId ? '编辑员工信息' : '新增用户';
    },
    // 在职状态 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
    }
  },
  watch: {},
  created() {
    // console.log('【 this.$dict 】-431', this.$dict.getDictOptions('44'))
  },
  mounted() {
    // console.log('【 this.$dict 】-431', this.$store.getters.language, this.$dict)
    // this.$refs['elForm'].clearValidate();
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取用户信息
    getDetailInfo() {
      getUemUser({
        uemUserId: this.editData.uemUserId
      }).then(res => {
        this.formData = {
          ...this.formData,
          ...res.data,
          sex: res.data.sex ? 0 : 1
        };
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.uemUserId ? editUemUser : saveUemUser;
          funcName(this.formData).then(res => {
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
    // height: 350px;
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
