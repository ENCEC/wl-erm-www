<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-08 14:41:03
 * @Description:
-->

<template>
  <div class="staff-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="800px"
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
              <el-form-item label="申请人:" prop="defenseScore">
                <el-input
                  v-model="formData.defenseScore"
                  placeholder="请输入申请人"
                  clearable
                  :disabled="status === STATUS_TYPE.on || status === STATUS_TYPE.final"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期:" prop="taskTitle">
                <el-date-picker
                  v-model="formData.taskTitle"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  class="input-width"
                  placeholder="请选择申请日期"
                  clearable
                  :disabled="status === STATUS_TYPE.on || status === STATUS_TYPE.final"
                />
              </el-form-item>
            </el-col>
            <!-- 审批中 -->
            <el-col v-if="status === STATUS_TYPE.check" :span="12">
              <el-form-item label="审批结果:" prop="taskType">
                <el-select
                  v-model="formData.taskType"
                  placeholder="请选择任务类型"
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="离职原因:">
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
          <el-row />
          <!-- 进行中 Start -->
          <div v-if="status === STATUS_TYPE.on || status === STATUS_TYPE.final">
            <el-row>
              <!-- 最终 -->
              <el-col v-if="status === STATUS_TYPE.final" :span="12">
                <el-form-item label="审核人:" prop="taskTitle">
                  <el-input
                    v-model="formData.defenseScore"
                    clearable
                    :disabled="status === STATUS_TYPE.final"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核时间:" prop="taskTitle">
                  <el-date-picker
                    v-model="formData.taskTitle"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    class="input-width"
                    placeholder="请选择申请日期"
                    clearable
                    :disabled="status === STATUS_TYPE.final"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核结果:" prop="positiveType">
                  <el-radio-group v-model="formData.positiveType" :disabled="status === STATUS_TYPE.final">
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
              <el-col :span="24">
                <el-form-item label="审核意见：" prop="faceRemark" :hide-required-asterisk="false">
                  <el-input
                    v-model="formData.faceRemark"
                    type="textarea"
                    placeholder="输入评语"
                    clearable
                    style="width:500px"
                    :disabled="status === STATUS_TYPE.final"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="status !== STATUS_TYPE.final" :span="12">
                <el-form-item label="提交审批人:" prop="executor">
                  <UserAssociate v-model="formData.executor" class="input-width" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 最终 -->
          <div v-if="status === STATUS_TYPE.final">
            <el-row>
              <el-col :span="12">
                <!-- TODO:字段 -->
                <el-form-item label="审批时间:" prop="approvalTime">
                  <el-date-picker
                    v-model="formData.approvalTime"
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
                      v-for="item in positiveTypeOptions"
                      :key="'positiveType' + item.value"
                      :label="item.value"
                    >{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- TODO:字段 -->
              <el-col :span="24">
                <el-form-item label="审批意见" prop="positiveComments">
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
          <!-- 进行中 End -->
          <!-- 已完成 Start -->
          <div>
            <el-row v-if="status === STATUS_TYPE.check || status === STATUS_TYPE.completed">
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
            <!-- 已完成 -->
            <el-row v-if="status === STATUS_TYPE.completed">
              <el-col :span="12">
                <el-form-item
                  label="审核人:"
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
                  label="审批人:"
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
            <!-- 已完成 -->
            <el-row v-if="status === STATUS_TYPE.completed">
              <el-col :span="12">
                <el-form-item
                  label="审批结果:"
                >
                  <el-input
                    v-model="formData.creatorName"
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
                    v-model="formData.createTime"
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
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import { getTaskInfoDetail, saveTaskInfo, updateTaskInfo } from '@/api/staff-task';
import { formRules } from './rules';

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
    }
  },
  data() {
    return {
      // Approval, in progress, completed
      STATUS_TYPE: {
        check: 1, // 审批中
        on: 2, // 进行中
        completed: 3,
        final: 4
      },
      status: 4,
      records: [],
      rules: formRules, // 验证规则
      formData: {
        taskTitle: '4444',
        executor: '6957613061678637056', // 执行人
        status: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        taskType: '', //
        taskDetailInfoDtoList: [], // 列表勾选值
        // 最终审批
        approvalTime: ''
      },
      taskTypeOptions: this.$dict.getDictOptions('TASK_TYPE'),
      positiveTypeOptions: this.$dict.getDictOptions('OFFER_TYPE')
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      // this.editData.taskInfoId && this.getDetailInfo();
      // return this.editData.taskInfoId
      //   ? this.type === 'detail'
      //     ? '任务详细信息'
      //     : '编辑任务信息'
      //   : '新增任务';
      return '姓名' + '离职申请'
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
      getTaskInfoDetail({ taskInfoId: this.editData.taskInfoId }).then(res => {
        console.log('【 res 】-211', res)
        const result = res.data
        this.formData = {
          ...this.formData,
          ...result,
          status: result.status.toString()
        };
        this.records = result.taskDetailInfoDtoList
        console.log('【 this.records 】-224', this.records)
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.taskInfoId ? updateTaskInfo : saveTaskInfo;
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
    min-height: 450px;
    margin-bottom: 20px;
    .input-width {
      width: 180px;
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
