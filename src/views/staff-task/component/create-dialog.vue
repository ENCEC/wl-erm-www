<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-02 17:55:42
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
        :disabled="type === 'detail'"
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题:" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入姓名"
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
              <el-form-item label="入职岗位:" prop="staffDutyCode">
                <el-select
                  v-model="formData.staffDutyCode"
                  placeholder="请选择入职岗位"
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
            <el-col :span="12">
              <el-form-item label="岗位职称:" prop="technicalName">
                <el-select
                  v-model="formData.technicalName"
                  placeholder="请选择岗位职称"
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
                  <TaskTable :type="type" />
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
import { getUemUser, saveUemUser, editUemUser } from '@/api/user-manage';
import { formRules } from './rules';

export default {
  components: { TaskTable },
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
      rules: formRules, // 验证规则
      formData: {
        name: '',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        staffDutyCode: '', // 入职岗位
        technicalName: '' // 岗位职称
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
      this.editData.uemUserId && this.getDetailInfo();
      // return this.editData.uemUserId ? '编辑任务信息' : '';
      return this.editData.uemUserId
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
    // 获取用户信息
    getDetailInfo() {
      getUemUser({
        uemUserId: this.editData.uemUserId
      }).then(res => {
        this.formData = {
          ...this.formData,
          ...res.data
        };
      });
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const funcName = this.editData.uemUserId ? editUemUser : saveUemUser;
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
    // height: 350px;
    margin-bottom: 20px;
    .input-width {
      width: 180px;
    }
    .table-wrap{
      width:700px;
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
