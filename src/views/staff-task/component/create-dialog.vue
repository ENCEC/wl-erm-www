<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-18 11:13:36
 * @Description:
-->

<template>
  <el-dialog
    class="staff-dialog"
    :title="dialogTitle"
    v-bind="$attrs"
    width="1000px"
    center
    :close-on-click-modal="false"
    top="10vh"
    destroy-on-close
    z-index="1000"
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
              <UserAssociate v-model="formData.executor" :init-label="formData.executorName" class="input-width" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类型:" prop="taskType">
              <el-select
                v-model="formData.taskType"
                placeholder="请选择任务类型"
                clearable
                class="input-width"
                @change="handleTaskTypeChange(formData.taskType,selectedRecords)"
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
            <el-form-item label="员工任务:" prop="taskList">
              <div class="table-wrap">
                <!--  :selected-list.sync="selectedData"  -->
                <TaskTable
                  v-if="type!=='detail'"
                  ref="taskTableRef"
                  :records="selectedRecords"
                  :task-type="formData.taskType"
                  @getSelectedData="getSelectedData"
                  @handleRowSelect="handleRowSelect"
                />
                <SelectedTable
                  ref="tableForm"
                  :records="selectedRecords"
                  :type="type"
                  @getSelectedData="getSelectedData"
                />
                <!-- :task-type="formData.taskType" -->
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
                v-model="createTime"
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
        size="medium"
        @click="handleConfirm"
      >提交</el-button>
      <el-button
        type="primary"
        :plain="true"
        size="medium"
        @click="close"
      >{{ type === 'detail'?'关闭':'取消' }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TaskTable from './task-table'
import SelectedTable from './selected-table'
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import { getTaskInfoDetail, saveTaskInfo, updateTaskInfo, queryNeedStandardFullDetailByTaskType } from '@/api/staff-task';
import { formRules } from './rules';

export default {
  components: { UserAssociate, TaskTable, SelectedTable },
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
      selectedRecords: [],
      selectedData: [],
      rules: formRules, // 验证规则
      formData: {
        taskInfoId: '',
        taskTitle: '',
        executor: '', // 执行人6957613061678637056
        executorName: '',
        status: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        taskType: '', //
        taskDetailInfoDtoList: [], // 列表勾选值
        createTime: '',
        creatorName: ''
      },
      createTime: '',
      // 任务类型下拉
      taskTypeOptions: this.$dict.getDictOptions('TASK_TYPE')
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.taskInfoId && this.getDetailInfo();
      return this.editData.taskInfoId
        ? this.type === 'detail'
          ? '任务详细信息'
          : '编辑任务信息'
        : '新增任务';
    },
    // 在职状态下拉 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 任务类型变化-获取必选问题
    handleTaskTypeChange(taskType, arr = []) {
      let selectedRecords = []
      taskType && queryNeedStandardFullDetailByTaskType({
        taskType
      }).then(res => {
        res.data.forEach(requiredItem => {
          // 判断详情中是否已存在必选项
          const isExist = arr.some((selectedItem) => requiredItem.standardDetailId === selectedItem.standardDetailId)
          if (!isExist) {
            // 不存在则加入
            arr.unshift({
              ...requiredItem,
              standardEntryName: requiredItem.entryName,
              standardDetailName: requiredItem.detailName,
              leader: '',
              isNeed: true
            })
          }
        })
        // 遍历判断是否是必选项
        selectedRecords = arr.map(selectedItem => {
          const isExist = res.data.some((requiredItem) => requiredItem.standardDetailId === selectedItem.standardDetailId)
          return {
            ...selectedItem,
            isNeed: isExist
          }
        })
        this.selectedRecords = selectedRecords
      });
    },
    // 勾选数据行的 Checkbox 时触发的事件
    handleRowSelect(isChecked, row) {
      this.selectedRecords.push({
        ...row,
        standardEntryName: row.entryName,
        standardDetailName: row.detailName,
        leader: '',
        isNeed: false
      })
    },
    // TODO 全选
    getSelectedData(val) {
      // this.records = val
      // this.formData.taskDetailInfoDtoList = val.map(item => {
      //   const { standardDetailId } = item
      //   // leader
      //   return { standardDetailId, leader: '6957613061678637056' }
      // })
    },
    // 关闭弹框
    close() {
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 获取详细信息
    getDetailInfo() {
      getTaskInfoDetail({ taskInfoId: this.editData.taskInfoId }).then(res => {
        const result = res.data
        for (const key in this.formData) {
          if (key === 'status') {
            this.formData[key] = result[key].toString() || ''
          } else {
            this.formData[key] = result[key] || ''
          }
          this.createTime = this.$moment(this.formData.createTime).format('YYYY-MM-DD')
        }
        // 详情数据回显
        if (this.type === 'detail') {
          this.selectedRecords = result.taskDetailInfoDtoList
        } else {
          // 编辑数据回显
          this.handleTaskTypeChange(this.formData.taskType, result.taskDetailInfoDtoList)
        }
      });
    },
    // 提交表单信息
    handleConfirm() {
      const isTableFormValid = this.$refs.tableForm.validateTableForm()
      this.formData.taskDetailInfoDtoList = this.selectedRecords.map(item => {
        const { standardDetailId, leader } = item
        return { standardDetailId, leader: leader.toString() }// : '6957613061678637056'
      })
      // this.formData.executor = '6957613061678637056'
      if (!this.formData.taskDetailInfoDtoList.length) {
        this.$message.error('请选择任务');
        return false
      }
      this.$refs['elForm'].validate(valid => {
        if (isTableFormValid && valid) {
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
    min-height: 400px;
    margin-bottom: 20px;
    .input-width {
      width: 180px !important;
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
