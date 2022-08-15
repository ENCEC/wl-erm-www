<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 21:05:06
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-15 14:29:52
 * @Description: 员工转正
-->

<template>
  <div class="regular-dialog">
    <el-dialog
      :title="'员工'+dialogTitle"
      v-bind="$attrs"
      width="750px"
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
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="formData.sex">
                  <el-radio :label="false">男</el-radio>
                  <el-radio :label="true">女</el-radio>
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
                  value-format="yyyy-MM-dd hh:mm:ss"
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
              <el-form-item label="入职部门:" prop="deptName">
                <el-input
                  v-model="formData.deptName"
                  placeholder="请输入入职部门"
                  clearable
                  disabled
                />
                <!-- <Department v-model="formData.uemDeptId" clearable placeholder="请选择入职部门" class="input-width" disabled /> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDuty">
                <el-input
                  v-model="formData.staffDuty"
                  placeholder="请输入入职岗位"
                  clearable
                  disabled
                />
                <!-- <StaffDuty v-model="formData.staffDutyCode" placeholder="请选择入职岗位" class="input-width" disabled /> -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 转正 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正日期:" prop="offerDate">
                <el-date-picker
                  v-model="formData.offerDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  class="input-width"
                  placeholder="请选择转正日期"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转正类型:" prop="positiveType">
                <el-radio-group v-model="formData.positiveType">
                  <el-radio
                    v-for="item in positiveTypeOptions"
                    :key="'positiveType' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转员工答辩成绩:" prop="defenseScore" label-width="130px">
                <el-input
                  v-model="formData.defenseScore"
                  placeholder="请输入转员工答辩成绩"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- TODO -->
              <el-form-item label="附件:" prop="speciality">
                <Upload />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row />
          <el-row>
            <el-col :span="24">
              <el-form-item label="面谈评语:" prop="interviewUid">
                <UserAssociate v-model="formData.interviewUid" placeholder="请选择面谈人" class="input-width" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 面谈评语 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label=" " prop="interviewComments" :hide-required-asterisk="false">
                <el-input
                  v-model="formData.interviewComments"
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
              <el-form-item label="转正评语:" prop="positiveUid">
                <UserAssociate v-model="formData.positiveUid" placeholder="请选择审批人" class="input-width" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 转正评语 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label=" " prop="positiveComments" :hide-required-asterisk="true">
                <el-input
                  v-model="formData.positiveComments"
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
import { queryStaffInfo, savePositiveInfo } from '@/api/staff-manage';
import { regularFormRules } from './rules';
// import StaffDuty from '@/components/CurrentSystem/StaffDuty.vue'
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
// import Department from '@/components/CurrentSystem/Department.vue'
import Upload from '@/components/CurrentSystem/Upload.vue'

export default {
  components: { UserAssociate, Upload },
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
      rules: regularFormRules, // 验证规则
      formData: {
        name: '',
        sex: '',
        entryDate: '', // 2022-05-20 00:00:00入职时间
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        deptName: '', // 部门名称
        uemDeptId: '', // 入职部门
        staffDuty: '', // 岗位名称
        staffDutyCode: '', // 入职岗位
        offerDate: '', // 转正时间
        positiveType: '', // 转正类型
        defenseScore: '', // 转员工答辩成绩
        interviewUid: '', // 面谈人
        interviewComments: '', // 面谈评语
        positiveUid: '', // 审批人
        positiveComments: '', // 转正评语
        speciality: '' // 在校专业
      },
      positiveTypeOptions: this.$dict.getDictOptions('OFFER_TYPE')
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      const titleInfo = {
        'regular': '转正',
        'quit': '离职',
        'dismiss': '辞退'
      }
      return titleInfo[this.type]// '编辑员工信息' : '新增用户';
    },
    // 在职状态 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
    }
  },
  watch: {

  },
  created() {
    // this.getDetailInfo()
  },
  mounted() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取详情信息
    getDetailInfo() {
      queryStaffInfo({
        uemUserId: this.editData.uemUserId
      }).then(result => {
        const res = result.data
        // 表单赋值
        for (const key in this.formData) {
          if (key === 'sex') {
            this.formData[key] = res[key] || false
          } else {
            this.formData[key] = res[key] || ''
          }
        }
        // console.log('【 this.formData  】-290', this.formData)
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const uemUserIds = [this.editData.uemUserId, this.formData.interviewUid, this.formData.positiveUid]
          savePositiveInfo({ ...this.formData, uemUserIds }).then(res => {
            this.$message.success('操作成功');
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
      width: 180px !important;
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
