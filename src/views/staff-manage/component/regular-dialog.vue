<!--
 * @Author: Hongzf
 * @Date: 2022-08-01 18:07:40
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 19:00:03
 * @Description:
-->

<template>
  <div class="regular-dialog">
    <el-dialog
      :title="'员工转正'"
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
          </el-row>
          <el-row>
            <!-- TODO -->
            <el-col :span="12">
              <el-form-item label="转正日期:" prop="graduateDate">
                <el-date-picker
                  v-model="formData.graduateDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择转正日期"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 性别（0男，1女） -->
              <el-form-item label="转正类型:" prop="sex">
                <el-radio-group v-model="formData.sex">
                  <el-radio
                    v-for="item in typeOptions"
                    :key="'sex' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转员工答辩成绩:" prop="graduateSchool" label-width="120px">
                <el-input
                  v-model="formData.graduateSchool"
                  placeholder="请输入转员工答辩成绩"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="附件:" prop="speciality">
                上传
              </el-form-item>
            </el-col>
          </el-row>
          <el-row />
          <el-row>
            <el-col :span="24">
              <el-form-item label="面谈评语:" prop="technicalName">
                <el-select
                  v-model="formData.technicalName"
                  placeholder="请选择面谈人"
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
            <el-col :span="24">
              <el-form-item label=" " prop="technicalName">
                <el-input
                  v-model="formData.email"
                  type="textarea"
                  placeholder="输入评语"
                  clearable
                  style="width:500px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="转正评语:" prop="technicalName">
                <el-select
                  v-model="formData.technicalName"
                  placeholder="请选择审批人"
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
            <el-col :span="24">
              <el-form-item label=" " prop="technicalName">
                <el-input
                  v-model="formData.email"
                  type="textarea"
                  placeholder="输入评语"
                  clearable
                  style="width:500px"
                />
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
      typeOptions: this.$dict.getDictOptions('TYPE'),
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
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value === 0 || item.value === 1)
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
          sex: res.data.sex ? '0' : '1'
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
.regular-dialog {
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
