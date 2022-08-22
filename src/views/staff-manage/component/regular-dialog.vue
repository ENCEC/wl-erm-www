<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 21:05:06
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-22 14:45:01
 * @Description: 员工转正
-->

<template>
  <el-dialog
    center
    class="regular-dialog"
    destroy-on-close
    :title="'员工'+dialogTitle"
    top="10vh"
    v-bind="$attrs"
    width="800px"
    z-index="10000"
    :append-to-body="true"
    :close-on-click-modal="false"
    v-on="$listeners"
  >
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="mini"
      label-width="100px"
      :inline="true"
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
              <!-- <StaffDuty v-model="formData.staffDutyId" placeholder="请选择入职岗位" class="input-width" disabled /> -->
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
                value-format="yyyy-MM-dd"
                class="input-width"
                placeholder="请选择转正日期"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转正类型:" prop="offerType">
              <el-radio-group v-model="formData.offerType">
                <el-radio
                  v-for="item in positiveTypeOptions"
                  :key="'offerType' + item.value"
                  :label="item.value"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="转员工答辩成绩:" prop="faceScore" label-width="130px">
              <el-input
                v-model="formData.faceScore"
                placeholder="请输入转员工答辩成绩"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- TODO -->
            <el-form-item label="附件:">
              <Upload :upload-data.sync="uploadData" :file-info="formData.staffApplication" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
        <el-row>
          <el-col :span="24">
            <el-form-item label="面谈评语:" prop="interviewerId">
              <UserAssociate
                v-model="formData.interviewerId"
                :init-label="formData.interviewerName"
                placeholder="请选择面谈人"
                class="input-width"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 面谈评语 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label=" " prop="faceRemark">
              <el-input
                v-model="formData.faceRemark"
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
            <el-form-item label="转正评语:" prop="approver">
              <UserAssociate
                v-model="formData.approver"
                :init-label="formData.approverName"
                placeholder="请选择审批人"
                class="input-width"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 转正评语 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label=" " prop="offerRemark">
              <el-input
                v-model="formData.offerRemark"
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
        size="medium"
        @click="handleConfirm"
      >提交</el-button>
      <el-button
        type="primary"
        :plain="true"
        size="medium"
        @click="close"
      >取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { queryPositiveStaffInfo, savePositiveInfoByStaff } from '@/api/staff-manage';
import { regularFormRules } from './rules';
// import StaffDuty from '@/components/CurrentSystem/StaffDuty.vue'
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
// import Department from '@/components/CurrentSystem/Department.vue'
import Upload from './Upload.vue'
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
        uemUserId: '',
        uemUserIds: [],
        name: '',
        sex: '',
        entryDate: '', // 2022-05-20 00:00:00入职时间
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        deptName: '', // 部门名称
        uemDeptId: '', // 入职部门
        staffDuty: '', // 岗位名称
        staffDutyId: '', // 入职岗位
        offerDate: '', // 转正时间
        offerType: '' // 转正类型
        // 不回显
        // faceScore: '', // 转员工答辩成绩
        // interviewerId: '', // 面谈人
        // interviewerName: '' // 面谈人名称
        // faceRemark: '', // 面谈评语
        // approver: '', // 审批人
        // approverName: '', // 审批人姓名
        // offerRemark: '', // 转正评语
        // staffApplication: ''// 文件key
      },
      uploadData: {
        systemId: process.env.VUE_APP_SYSTEMID, // 写死
        fileName: '',
        fileType: '',
        uemUserId: '',
        type: '转正申请表'
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
    this.uploadData.uemUserId = this.editData.uemUserId
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
      queryPositiveStaffInfo({
        uemUserId: this.editData.uemUserId
      }).then(result => {
        console.log('【 result 】-293', result)
        const arr = result
        const regularInfo = arr.length < 2 ? {} : arr[0]
        const baseInfo = arr.length < 2 ? arr[0] : arr[1]
        const { name, sex, entryDate, jobStatus, deptName, uemDeptId, staffDuty, staffDutyId, staffApplication } = baseInfo
        const { offerDate, offerType, faceScore, interviewerId, interviewerName, faceRemark, approver, approverName, offerRemark } = regularInfo
        const res = {
          //  第一条数据的字段
          name, sex, entryDate, jobStatus, deptName, uemDeptId, staffDuty, staffDutyId,
          //  第二条数据的字段
          offerDate, offerType, faceScore,
          // 面谈
          interviewerId, interviewerName, faceRemark,
          // 转正
          approver, approverName, offerRemark, staffApplication
        }
        // 表单赋值
        for (const key in this.formData) {
          if (key === 'sex') {
            const sex = res[key]
            this.formData[key] = sex === true ? true : (sex === false ? false : '')
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
          const uemUserIds = [this.formData.interviewerId, this.formData.approver]
          savePositiveInfoByStaff({
            ...this.formData,
            uemUserIds,
            uemUserId: this.editData.uemUserId.toString()
          }).then(res => {
            if (res.success) {
              this.$message.success('操作成功');
              this.$emit('getTableData', '');
              this.close();
            } else {
              this.$message.error(res.errorMessages[0]);
            }
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
