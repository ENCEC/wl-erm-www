<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-17 13:59:25
 * @Description:
-->

<template>
  <el-dialog
    class="my-regular-dialog"
    :title="dialogTitle"
    v-bind="$attrs"
    width="850px"
    center
    :close-on-click-modal="false"
    top="10vh"
    destroy-on-close
    z-index="10000"
    :append-to-body="true"
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
          <!-- 进行中 -->
          <el-col v-if="status === STATUS_TYPE.ON_MANAGER || status === STATUS_TYPE.ON_LEADER" :span="12">
            <el-form-item label="申请人:" prop="dispatchersName">
              <el-input
                v-model="formData.dispatchersName"
                disabled
                placeholder="请输入申请人"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期:" prop="applyDate">
              <el-date-picker
                v-model="formData.applyDate"
                disabled
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd hh:mm:ss"
                class="input-width"
                placeholder="请选择申请日期"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转正类型:" prop="offerType">
              <el-radio-group v-model="formData.offerType" disabled>
                <el-radio
                  v-for="item in positiveTypeOptions"
                  :key="'offerType' + item.label"
                  :label="item.label"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- 进行中-->
          <el-col v-if="status === STATUS_TYPE.ON_MANAGER || status === STATUS_TYPE.ON_LEADER" :span="12">
            <el-form-item label="附件:">
              <!-- TODO： -->
              <a>个人简历</a>
              <a>个人简历2</a>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 审批中 -->
        <el-row v-if="status === STATUS_TYPE.CHECK">
          <el-col :span="12">
            <el-form-item label="申请进度:" prop="progress">
              <el-input
                v-model="formData.progress"
                placeholder="请输入申请进度"
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 已完成 -->
        <el-row v-if="status === STATUS_TYPE.COMPLETED">
          <el-col :span="12">
            <el-form-item
              label="审核人:"
              prop="auditName"
            >
              <el-input
                v-model="formData.auditName"
                placeholder="请输入审核人"
                clearable
                class="input-width"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批人:" prop="approverName">
              <el-input
                v-model="formData.approverName"
                placeholder="请输入审批人"
                clearable
                class="input-width"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="转正程序:">
              <div class="table-wrap">
                <RegularTable />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
        <!-- 进行中 Start -->
        <div v-if="status === STATUS_TYPE.ON_MANAGER || status === STATUS_TYPE.ON_LEADER">
          <el-row class="flex-wrap">
            <el-col v-if="status === STATUS_TYPE.ON_LEADER" :span="12">
              <el-form-item label="面谈人:" prop="approverName">
                <el-input
                  v-model="formData.approverName"
                  placeholder="请输入面谈人"
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="面谈时间:" prop="faceTime">
                <el-date-picker
                  v-model="formData.faceTime"
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                  type="datetime"
                  format="yyyy-MM-dd hh:mm:ss"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  placeholder="请选择面谈时间"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="面谈结果:" prop="faceResult">
                <el-radio-group v-model="formData.faceResult" :disabled="status === STATUS_TYPE.ON_LEADER">
                  <el-radio
                    v-for="item in inclinedAgreeOptions"
                    :key="'faceResult' + item.label"
                    :label="item.label"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转员工答辩成绩:" prop="faceScore" label-width="130px">
                <el-input
                  v-model="formData.faceScore"
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                  placeholder="请输入转员工答辩成绩"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="status === STATUS_TYPE.ON_MANAGER" :span="12">
              <el-form-item label="提交审批人:" prop="uemUserId">
                <UserAssociate v-model="formData.uemUserId" :init-label="formData.approverName" class="input-width" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="面谈评语：" prop="faceRemark">
                <el-input
                  v-model="formData.faceRemark"
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                  :rows="3"
                  type="textarea"
                  placeholder="请输入面谈评语"
                  clearable
                  style="width:580px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 进行中（部门领导） -->
          <div v-if="status === STATUS_TYPE.ON_LEADER">
            <el-row>
              <el-col :span="12">
                <el-form-item label="审批时间:" prop="approvalDate">
                  <el-date-picker
                    v-model="formData.approvalDate"
                    type="datetime"
                    format="yyyy-MM-dd hh:mm:ss"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择审批时间"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审批结果:" prop="resultAccess">
                  <el-radio-group v-model="formData.resultAccess">
                    <el-radio
                      v-for="item in agreeOptions"
                      :key="'resultAccess' + item.label"
                      :label="item.label"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="转正评语：" prop="offerRemark">
                  <el-input
                    v-model="formData.offerRemark"
                    :rows="3"
                    type="textarea"
                    placeholder="请输入转正评语"
                    clearable
                    style="width:580px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 进行中 END -->
        <!-- 已完成 Start -->
        <div v-if="status === STATUS_TYPE.COMPLETED">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="创建时间:"
              >
                <el-input
                  v-model="formData.createTime"
                  disabled
                  placeholder="请输入创建时间"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="创建人:"
              >
                <el-input
                  v-model="formData.creatorName"
                  disabled
                  placeholder="请输入创建人"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="审批结果:"
              >
                <el-input
                  v-model="formData.resultAccess"
                  disabled
                  placeholder="请输入审批结果"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="审批时间:"
              >
                <el-input
                  v-model="formData.approvalDate"
                  disabled
                  placeholder="请输入审批时间"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 已完成 End -->
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-if="status === STATUS_TYPE.CHECK"
        type="primary"
        size="medium"
        @click="handleWithdraw"
      >撤回</el-button>
      <el-button
        v-if="status === STATUS_TYPE.ON_MANAGER || status === STATUS_TYPE.ON_LEADER"
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
import RegularTable from './regular-table'
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import { queryPositiveApply, savePositiveInfo, savePositiveInfoByLeader, deletedApplyByStaff } from '@/api/my-task';
import { regularFormRules } from './rules';
import { USER_TYPE } from '@/store/constant'

export default {
  components: { UserAssociate, RegularTable },
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
    },
    // 用户类型
    userType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      USER_TYPE,
      STATUS_TYPE: {
        CHECK: 1, // 审批中
        ON_MANAGER: 2, // 进行中(项目经理)
        ON_LEADER: 4, // 进行中(部门领导)
        COMPLETED: 3 // 已完成
      },
      rules: regularFormRules, // 验证规则
      formData: {
        taskInfoId: '',
        taskDetailId: '', // 必须
        dispatchersName: '', // 申请人
        applyDate: '', // 申请日期
        offerType: '', // 转正类型
        progress: '', // TODO 申请进度
        uemUserId: '', // TODO 审批人id（面谈人）
        approverName: '', // TODO 审批人姓名
        interviewerName: '', // TODO  面谈姓名
        // 进行中（项目经理）
        faceTime: '', // 面谈时间
        faceResult: '', // 面谈结果
        faceScore: '', // 转员工答辩成绩
        faceRemark: '', // 面谈评语
        // 进行中（部门领导）
        approvalDate: '', // 审批时间
        resultAccess: '', // TODO 审批结果
        offerRemark: '', // 转正评语
        // 已完成
        auditName: ''// 审核人
      },
      positiveTypeOptions: this.$dict.getDictOptions('OFFER_TYPE'),
      inclinedAgreeOptions: this.$dict.getDictOptions('INCLINED_AGREE_TYPE'),
      agreeOptions: this.$dict.getDictOptions('AGREE_TYPE')
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.taskInfoId && this.getDetailInfo();
      return this.formData.dispatchersName + '转正申请'
    },
    status() {
      const taskStatus = this.editData.status.toString()
      console.log('【 taskStatus 】-403', taskStatus)
      let status = 0
      // 审批中
      if (taskStatus === '0') {
        status = this.STATUS_TYPE.CHECK // 1
      }
      // 进行中 进行中分是项目经理还是部门领导
      if (taskStatus === '1') {
        if (this.userType.toString() === this.USER_TYPE.PROJECT_MANAGER.toString()) {
          status = this.STATUS_TYPE.ON_MANAGER// 2
        }
        if (this.userType.toString() === this.USER_TYPE.DEPT_LEADER.toString()) {
          status = this.STATUS_TYPE.ON_LEADER// 4
        }
      }
      // 已完成
      if (taskStatus === '2') {
        status = this.STATUS_TYPE.COMPLETED // 1
      }
      console.log('【 status==== 】-396', this.userType, status)
      return status
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('getTableData', '');
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取详细信息
    getDetailInfo() {
      queryPositiveApply({ taskInfoId: this.editData.taskInfoId }).then(res => {
        const _res = res.data
        for (const key in this.formData) {
          if (key === 'uemUserId') {
            this.formData[key] = _res['approver']
          } else {
            this.formData[key] = _res[key] || ''
          }
        }
      });
    },
    // 撤回
    handleWithdraw() {
      deletedApplyByStaff({ taskInfoId: this.editData.taskInfoId }).then(res => {
        this.$message.success('撤回成功');
        this.close();
      })
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcInfo = {
            2: savePositiveInfo,
            4: savePositiveInfoByLeader
          }
          const funcName = funcInfo[this.status]// this.editData.taskInfoId ? updateTaskInfo : saveTaskInfo;
          funcName(this.formData).then(res => {
            this.$message.success('操作成功');
            this.close();
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.my-regular-dialog {
  .form-wrap {
    min-height: 280px;
    .flex-wrap{
      display: flex;
      flex-wrap: wrap;
    }
    .input-width {
      width: 180px !important;
    }
    .table-wrap{
      width:600px;
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
