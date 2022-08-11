<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-10 17:41:11
 * @Description:
-->

<template>
  <div class="staff-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="900px"
      center
      :close-on-click-modal="false"
      top="10vh"
      destroy-on-close
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
            <el-col v-if="status === STATUS_TYPE.on || status === STATUS_TYPE.final" :span="12">
              <el-form-item label="申请人:" prop="dispatchersName">
                <el-input
                  v-model="formData.dispatchersName"
                  :disabled="status === STATUS_TYPE.on"
                  placeholder="请输入申请人"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期:" prop="applyDate">
                <el-date-picker
                  v-model="formData.applyDate"
                  :disabled="status === STATUS_TYPE.on"
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
                <el-radio-group v-model="formData.offerType" :disabled="status === STATUS_TYPE.on">
                  <el-radio
                    v-for="item in positiveTypeOptions"
                    :key="'offerType' + item.value"
                    :label="item.value"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- 进行中 TODO:字段-->
            <el-col v-if="status === STATUS_TYPE.on || status === STATUS_TYPE.final" :span="12">
              <el-form-item label="附件:">
                <a>个人简历</a>
                <a>个人简历2</a>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 审批中 -->
          <el-row v-if="status === STATUS_TYPE.check">
            <el-col :span="12">
              <!-- TODO：字段 -->
              <el-form-item label="申请进度:" prop="taskType">
                <el-select
                  v-model="formData.taskType"
                  placeholder="请选择申请进度"
                  clearable
                  class="input-width"
                >
                  <el-option
                    v-for="(item) in taskTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 已完成 -->
          <el-row v-if="status === STATUS_TYPE.completed">
            <el-col :span="12">
              <!-- TODO：字段 -->
              <el-form-item
                label="审核人:"
                prop="approver2"
              >
                <el-input
                  v-model="formData.approver2"
                  placeholder="请输入审核人"
                  clearable
                  class="input-width"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批人:" prop="approver">
                <el-input
                  v-model="formData.approver"
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
                  <RegularTable ref="taskTableRef" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row />
          <!-- 进行中 Start -->
          <div v-if="status === STATUS_TYPE.on || status === STATUS_TYPE.final">
            <el-row class="flex-wrap">
              <el-col v-if="status === STATUS_TYPE.final" :span="12">
                <el-form-item label="面谈人:" prop="interviewerId">
                  <el-input
                    v-model="formData.interviewerId"
                    :disabled="status === STATUS_TYPE.final"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面谈时间:" prop="faceTime">
                  <el-date-picker
                    v-model="formData.faceTime"
                    :disabled="status === STATUS_TYPE.final"
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
                <el-form-item label="面谈结果:" prop="resultAccess">
                  <el-radio-group v-model="formData.resultAccess" :disabled="status === STATUS_TYPE.final">
                    <el-radio
                      v-for="item in inclinedAgreeOptions"
                      :key="'resultAccess' + item.label"
                      :label="item.label"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="转员工答辩成绩:" prop="faceScore" label-width="130px">
                  <el-input
                    v-model="formData.faceScore"
                    :disabled="status === STATUS_TYPE.final"
                    placeholder="请输入转员工答辩成绩"
                    clearable
                    class="input-width"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="status !== STATUS_TYPE.final" :span="12">
                <el-form-item label="提交审批人:" prop="approver">
                  <UserAssociate v-model="formData.approver" :init-label="formData.approverName" class="input-width" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="面谈评语：" prop="faceRemark">
                  <el-input
                    v-model="formData.faceRemark"
                    :disabled="status === STATUS_TYPE.final"
                    :rows="3"
                    type="textarea"
                    placeholder="请输入面谈评语"
                    clearable
                    style="width:580px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 最终 -->
          <div v-if="status === STATUS_TYPE.final">
            <el-row>
              <el-col :span="12">
                <el-form-item label="审批时间:" prop="approvalDate">
                  <el-date-picker
                    v-model="formData.approvalDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择审批时间"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- TODO:字段 -->
                <el-form-item label="审批结果:" prop="approvalResult">
                  <el-radio-group v-model="formData.approvalResult">
                    <el-radio
                      v-for="item in agreeOptions"
                      :key="'approvalResult' + item.value"
                      :label="item.value"
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
                    type="textarea"
                    placeholder="请输入评语"
                    clearable
                    style="width:500px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 进行中 End -->
          <!-- 已完成 Start -->
          <div v-if="status === STATUS_TYPE.completed">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="创建时间:"
                >
                  <el-input
                    v-model="formData.createTime"
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
                  prop="approvalRemark"
                >
                  <el-input
                    v-model="formData.approvalRemark"
                    placeholder="请输入审批结果"
                    clearable
                    class="input-width"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="审批时间:"
                  prop="approvalDate"
                >
                  <el-input
                    v-model="formData.approvalDate"
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
          v-if="status === STATUS_TYPE.on || status === STATUS_TYPE.final"
          type="primary"
          size="mini"
          @click="handleConfirm"
        >提交</el-button>
        <el-button
          v-if="status === STATUS_TYPE.check"
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
import RegularTable from './regular-table'
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import { queryPositiveApply, savePositiveInfo } from '@/api/my-task';
import { regularFormRules } from './rules';

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
    }
  },
  data() {
    return {
      // Approval, in progress, completed
      STATUS_TYPE: {
        check: 1, // 审批中
        on: 2, // 进行中
        completed: 3, // 已完成
        final: 4
      },
      status: 2,
      rules: regularFormRules, // 验证规则
      formData: {
        taskInfoId: '',
        taskDetailId: '',
        dispatchersName: '', // 申请人
        applyDate: '', // 申请日期
        offerType: '', // 转正类型
        // 申请进度
        // 审核人
        approver: '', // TODO 审批人
        approverName: '', // TODO 审批人姓名
        approvalRemark: '', // TODO 审批结果
        interviewerId: '', // TODO  面谈id
        interviewerName: '', // TODO  面谈姓名
        //
        faceTime: '', // 面谈时间
        faceRemark: '', // 面谈评语
        resultAccess: '', // 面谈结果
        faceScore: '', // 转员工答辩成绩
        // 最终审批
        approvalDate: '', // 审批时间
        offerRemark: '', // 转正评语：
        //
        status: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        taskType: '' //
      },
      taskTypeOptions: this.$dict.getDictOptions('TASK_TYPE'),
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
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取详细信息
    getDetailInfo() {
      queryPositiveApply({ taskInfoId: this.editData.taskInfoId }).then(res => {
        console.log('【 res 】-211', res)
        const _res = res.data
        for (const key in this.formData) {
          this.formData[key] = _res[key] || ''
        }
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcInfo = {
            2: savePositiveInfo
          }
          const funcName = funcInfo[this.status]// this.editData.taskInfoId ? updateTaskInfo : saveTaskInfo;
          funcName(this.formData).then(res => {
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
.staff-dialog {
  .form-wrap {
    min-height: 550px;
    margin-bottom: 20px;
    .flex-wrap{
      display: flex;
      flex-wrap: wrap;
    }
    .input-width {
      width: 180px;
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
