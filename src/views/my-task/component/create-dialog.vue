<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-04 15:05:53
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
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="24">
              <el-form-item label="员工任务:" prop="taskList">
                <div class="table-wrap">
                  <TaskTable ref="tableForm" :selected-list.sync="selectedData" :type="type" :records="records" :task-type="formData.taskType" @getSelectedData="getSelectedData" />
                </div>
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
import { getTaskInfoDetail, saveTaskInfo, updateTaskInfo } from '@/api/staff-task';
import { formRules } from './rules';

export default {
  components: { TaskTable },
  props: {
    // 编辑信息
    // editData: {
    //   type: Object,
    //   default: () => { return { taskInfoId: '111' } }
    // },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editData: { taskInfoId: '111' },
      records: [],
      selectedData: [],
      rules: formRules, // 验证规则
      formData: {
        taskDetailInfoDtoList: []// 列表勾选值
      }
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.taskInfoId && this.getDetailInfo();
      return '试用任务信息'
      // this.editData.taskInfoId
      //   ? this.type === 'detail'
      //     ? '任务详细信息'
      //     : '编辑任务信息'
      //   : '新增任务';
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
    // 表格勾选
    getSelectedData(val) {
      console.log('【getSelectedData-val 】-202', val)
      this.formData.taskDetailInfoDtoList = val.map(item => {
        const { standardDetailId } = item
        // ordinator
        return { standardDetailId, ordinator: '6957613061678637056' }
      })
    },
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
      const isTableFormValid = this.$refs.tableForm.validateTableForm()
      console.log('【 isTableFormValid 】-230', isTableFormValid)
      if (!this.formData.taskDetailInfoDtoList.length) {
        this.$message.error('请选择任务');
        return false
      }
      this.$refs['elForm'].validate(valid => {
        if (isTableFormValid && valid) {
          const funcName = this.editData.taskInfoId ? updateTaskInfo : saveTaskInfo;
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
    height: 400px;
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
