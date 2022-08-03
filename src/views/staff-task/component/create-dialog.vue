<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 13:32:26
 * @Description:
-->

<template>
  <div class="staff-dialog">
    <el-dialog
      :title="dialogTitle"
      v-bind="$attrs"
      width="1000px"
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
        :disabled="type === 'detail'"
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题:" prop="taskTitle">
                <el-input
                  v-model="formData.taskTitle"
                  placeholder="请输入标题"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 在职状态（0：试用员工 1：正式员工 2：离职员工） -->
              <el-form-item label="在职状态:" prop="status">
                <el-radio-group v-model="formData.status">
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
              <el-form-item label="执行人:" prop="executor">
                <UserAssociate v-model="formData.executor" class="input-width" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务类型:" prop="taskType">
                <el-select
                  v-model="formData.taskType"
                  placeholder="请选择任务类型"
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
              <el-form-item label="员工任务:" prop="taskList">
                <div class="table-wrap">
                  <TaskTable ref="tableForm" :type="type" :records="records" />
                </div>
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
import TaskTable from './task-table'
import UserAssociate from '@/components/CurrentSystem/UserAssociate'

import { getTaskInfoDetail, saveUemUser, editUemUser } from '@/api/staff-task';
import { formRules } from './rules';

export default {
  components: { UserAssociate, TaskTable },
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
      records: [],
      rules: formRules, // 验证规则
      formData: {
        taskTitle: '',
        status: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        executor: '', // 执行人
        taskType: '' //
      },
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
      ]
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.taskInfoId && this.getDetailInfo();
      console.log('【 this.editData.taskInfoId 】-184', this.editData.taskInfoId)
      // return this.editData.taskInfoId ? '编辑任务信息' : '';
      return this.editData.taskInfoId
        ? this.type === 'detail'
          ? '任务详细信息'
          : '编辑任务信息'
        : '新增任务';
    },
    // 在职状态 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
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
      // const
      getTaskInfoDetail({ taskInfoId: this.editData.taskInfoId }).then(res => {
        console.log('【 res 】-211', res)
        const info = res.data
        this.formData = {
          ...this.formData,
          ...info,
          status: info.status.toString()
        };
        this.records = info.records
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs.tableForm.validateTableForm()
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.taskInfoId ? editUemUser : saveUemUser;
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
    height: 460px;
    margin-bottom: 20px;
    .input-width {
      width: 180px;
    }
    .table-wrap{
      width:750px;
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
