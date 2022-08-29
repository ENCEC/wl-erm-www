<!--
 * @Author: Hongzf
 * @Date: 2022-08-08 18:45:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-29 18:02:58
 * @Description:
-->

<template>
  <el-dialog
    :title="dialogTitle"
    v-bind="$attrs"
    width="800px"
    class="my-quit-dialog"
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
          <!-- 审批中 -->
          <el-col v-if="status === STATUS_TYPE.CHECK" :span="12">
            <el-form-item label="审批结果:">
              <el-input
                v-model="formData.resultAccess"
                disabled
                placeholder="请输入审批结果"
                clearable
                class="input-width"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="离职原因:" prop="leaveReason">
              <el-input
                v-model="formData.leaveReason"
                disabled
                :rows="4"
                type="textarea"
                placeholder="请输入离职原因"
                clearable
                style="width:530px"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
        <!-- 进行中 Start -->
        <div v-if="status === STATUS_TYPE.ON_MANAGER || status === STATUS_TYPE.ON_LEADER">
          <el-row>
            <!-- 进行中（部门领导 -->
            <el-col v-if="status === STATUS_TYPE.ON_LEADER" :span="12">
              <!-- TODO：字段 -->
              <el-form-item label="审核人:" prop="approverName">
                <el-input
                  v-model="formData.approverName"
                  clearable
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核时间:" prop="auditDate">
                <el-date-picker
                  v-model="formData.auditDate"
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                  type="datetime"
                  format="yyyy-MM-dd hh:mm:ss"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  class="input-width"
                  placeholder="请选择审核时间"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核结果:" prop="auditResult">
                <el-radio-group v-model="formData.auditResult" :disabled="status === STATUS_TYPE.ON_LEADER">
                  <el-radio
                    v-for="item in inclinedAgreeOptions"
                    :key="'auditResult' + item.label"
                    :label="item.label"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="审核意见：" prop="auditRemark">
                <el-input
                  v-model="formData.auditRemark"
                  :disabled="status === STATUS_TYPE.ON_LEADER"
                  type="textarea"
                  placeholder="输入审核意见"
                  clearable
                  style="width:530px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="status !== STATUS_TYPE.ON_LEADER" :span="12">
              <el-form-item label="提交审批人:" prop="approver">
                <UserAssociate v-model="formData.approver" class="input-width" />
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
                <el-form-item label="审批意见：" prop="approvalRemark">
                  <el-input
                    v-model="formData.approvalRemark"
                    :rows="3"
                    type="textarea"
                    placeholder="请输入审批意见"
                    clearable
                    style="width:530px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 进行中 End -->
        <!-- 已完成 Start -->
        <div>
          <el-row v-if="status === STATUS_TYPE.CHECK || status === STATUS_TYPE.COMPLETED">
            <el-col :span="12">
              <el-form-item
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
          <!-- 已完成 -->
          <el-row v-if="status === STATUS_TYPE.COMPLETED">
            <el-col :span="12">
              <el-form-item
                label="审核人:"
              >
                <el-input
                  v-model="formData.auditName"
                  disabled
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
                  disabled
                  placeholder="请输入审批人"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 已完成 -->
          <el-row v-if="status === STATUS_TYPE.COMPLETED">
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
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import { quitFormRules } from './rules';
import { queryLeaveInfoByLeader, saveLeaveInfo, saveLeaveInfoByLeader, deletedApplyByStaff } from '@/api/my-task';
import { USER_TYPE } from '@/store/constant'

export default {
  components: { UserAssociate },
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
        ON_MANAGER: 2, // 进行中
        ON_LEADER: 4,
        COMPLETED: 3// 已完成
      },
      rules: quitFormRules, // 验证规则
      formData: {
        taskInfoId: '',
        uemUserId: '',
        // taskDetailId: '',
        dispatchersName: '', // 申请人
        applyDate: '', // 申请日期
        leaveReason: '', // 离职原因
        // 项目经理审核
        auditName: '', // 审核人
        auditDate: '', // 审核时间
        auditResult: '', // 审核结果
        auditRemark: '', // 审核意见
        approver: '', // 提交审批人
        // 部门领导审批
        approverName: '', // TODO 审批人姓名
        approvalDate: '', // 审批时间
        resultAccess: '', // 审批结果
        approvalRemark: '', // 审批意见
        createTime: '',
        creatorName: ''
      },
      inclinedAgreeOptions: this.$dict.getDictOptions('INCLINED_AGREE_TYPE'),
      taskTypeOptions: this.$dict.getDictOptions('TASK_TYPE'),
      agreeOptions: this.$dict.getDictOptions('AGREE_TYPE')
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.getDetailInfo();
      return this.editData.taskTitle// this.formData.dispatchersName + '转正申请'
      // return this.formData.dispatchersName + '离职申请'
    },
    status() {
      const taskStatus = this.editData.status.toString()
      let status = 0
      // 审批中
      // if (taskStatus === '0') {
      //   status = this.STATUS_TYPE.CHECK // 1
      // }
      // 进行中 进行中分是项目经理还是部门领导
      if (taskStatus === '3') {
        // 员工
        if (this.userType.toString() === this.USER_TYPE.STAFF.toString()) {
          status = this.STATUS_TYPE.CHECK// 1
        }
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
      // console.log('【 status==== 】-396', this.userType, status)
      return status
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 撤回
    handleWithdraw() {
      deletedApplyByStaff({ taskInfoId: this.editData.taskInfoId }).then(res => {
        this.$message.success('撤回成功');
        this.close();
      })
    },
    // 关闭弹框
    close() {
      this.$emit('getTableData', '');
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取详细信息
    getDetailInfo() {
      // queryLeaveInfo({ uemUserId: this.editData.dispatchers }).then(res => {
      //   const _res = res.data
      //   for (const key in this.formData) {
      //     this.formData[key] = _res[key] || ''
      //   }
      // });
      queryLeaveInfoByLeader({
        dispatchers: this.editData.dispatchers, // '6958664088091697152', //
        taskInfoId: this.editData.taskInfoId
      }).then(res => {
        const _res = res.data[0].data
        for (const key in this.formData) {
          this.formData[key] = _res[key] || ''
        }
        this.formData.leaveReason = res.data[1].data.leaveReason || ' '
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcInfo = {
            2: saveLeaveInfo,
            4: saveLeaveInfoByLeader
          }

          const funcName = funcInfo[this.status]// this.editData.dispatchers ? updateTaskInfo : saveTaskInfo;
          funcName({
            ...this.formData,
            // TODO
            uemUserId: '6958664088091697152' // this.editData.dispatchers,
          }).then(res => {
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
.my-quit-dialog {
  .form-wrap {
    min-height: 200px;
    .input-width {
      width: 180px !important;
    }
    .table-wrap{
      width:660px;
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
