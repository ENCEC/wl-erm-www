<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 10:28:42
 * @Description: 我的任务-试用任务信息-弹框
-->

<template>
  <div class="task-dialog">
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
        label-width="1px"
        :inline="true"
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="24">
              <el-form-item label=" ">
                <div class="table-wrap">
                  <TaskTable
                    ref="tableForm"
                    :task-info-id="editData.taskInfoId"
                    :type="type"
                    @getTableFormData="getTableFormData"
                  />
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
        >保存</el-button>
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

export default {
  components: { TaskTable },
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
      rules: {}, // 验证规则
      formData: {}
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      return this.editData.taskTitle || '试用任务信息'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取填写的数据 TODO
    getTableFormData(val, isClose) {
      isClose && this.close();
    },
    // 关闭弹框
    close() {
      this.$emit('getTableData', '');
      this.$emit('update:visible', false);
      this.$refs['elForm'].resetFields();
    },
    // 提交表单信息
    handleConfirm() {
      this.$refs.tableForm.saveCurPageData(true)
      // this.$refs['elForm'].validate(valid => {});
    }
  }
};
</script>
<style lang="scss">
.task-dialog {
  .form-wrap {
    height: 350px;
    margin-bottom: 20px;
    .input-width {
      width: 180px;
    }
    .table-wrap{
      width:900px;
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
