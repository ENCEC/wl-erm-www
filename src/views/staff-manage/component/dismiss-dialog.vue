<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 21:05:06
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-08 10:50:58
 * @Description:
-->

<template>
  <div class="dismiss-dialog">
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
              <!-- 性别（0男，1女） -->
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
                  value-format="yyyy-MM-dd"
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
              <el-form-item label="入职部门:" prop="uemDeptId">
                <Department v-model="formData.uemDeptId" clearable placeholder="请选择入职部门" class="input-width" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <StaffDuty v-model="formData.staffDutyCode" placeholder="请选择入职岗位" class="input-width" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 离职 Start -->
          <div v-if="type==='quit'">
            <el-row>
              <el-col :span="24">
                <el-form-item label="离职日期:" prop="leaveDate">
                  <el-date-picker
                    v-model="formData.leaveDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择离职日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="离职原因：" prop="leaveReason" :hide-required-asterisk="false">
                  <el-input
                    v-model="formData.leaveReason"
                    type="textarea"
                    placeholder="输入离职原因"
                    clearable
                    style="width:500px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 离职 End -->
          <!-- 辞退 Start -->
          <div v-if="type==='dismiss'">
            <el-row>
              <el-col :span="24">
                <el-form-item label="辞退日期:" prop="dismissDate">
                  <el-date-picker
                    v-model="formData.dismissDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择辞退日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="辞退原因：" prop="dismissComments" :hide-required-asterisk="false">
                  <el-input
                    v-model="formData.dismissComments"
                    type="textarea"
                    placeholder="输入辞退原因"
                    clearable
                    style="width:500px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- TODO -->
              <el-form-item label="附件:" prop="speciality">
                <Upload />
              </el-form-item>
            </el-row>
          </div>
          <!-- 辞退 End -->
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
import { queryStaffInfo, savePositiveInfo, saveResignInfo, saveDismissInfo } from '@/api/staff-manage';
import { dissmissFormRules } from './rules';
import StaffDuty from '@/components/CurrentSystem/StaffDuty.vue'
import Department from '@/components/CurrentSystem/Department.vue'
import Upload from '@/components/CurrentSystem/Upload.vue'

export default {
  components: { StaffDuty, Department, Upload },
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
      rules: dissmissFormRules, // 验证规则
      formData: {
        name: '',
        sex: '',
        entryDate: '', // 2022-05-20 00:00:00入职时间
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        uemDeptId: '4', // 入职部门
        staffDutyCode: '2', // 入职岗位
        // 离职
        leaveDate: '', // 2022-05-20 00:00:00辞退时间
        leaveReason: '',
        // 辞退
        dismissDate: '', // 2022-05-20 00:00:00辞退时间
        dismissComments: '',
        speciality: ''
      }
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      console.log('【 this.editData 】-246', this.type, this.editData);
      // this.editData.uemUserId && this.getDetailInfo();
      const titleInfo = {
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
  watch: {},
  created() {
    this.getDetailInfo()
  },
  mounted() {
  },
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取用户信息
    getDetailInfo() {
      queryStaffInfo({
        uemUserId: this.editData.uemUserId
      }).then(result => {
        const res = result.data
        for (const key in this.formData) {
          if (key === 'sex') {
            this.formData[key] = res[key] || false
          } else {
            this.formData[key] = res[key] || ''
          }
        }
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcInfo = {
            'quit': saveResignInfo,
            'dismiss': saveDismissInfo
          }
          const funcName = funcInfo[this.type] // this.editData.uemUserId ?  : savePositiveInfo;
          funcName(this.formData
          ).then(res => {
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
.dismiss-dialog {
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
