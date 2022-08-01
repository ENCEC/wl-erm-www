<!--
 * @Author: Hongzf
 * @Date: 2022-08-01 15:41:40
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 15:53:39
 * @Description: 用户资料
-->

<template>
  <div class="user-profile-dialog">
    <el-dialog
      title="用户资料"
      v-bind="$attrs"
      width="720px"
      center
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      z-index="10000"
      v-on="$listeners"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        :inline="true"
        destroy-on-close
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名:" prop="account">
                <el-input
                  v-model="formData.account"
                  placeholder="请输入用户名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入姓名"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话:" prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  placeholder="请输入联系电话"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱:" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="请输入电子邮箱"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户类型:" prop="staffDutyCode">
                <el-select
                  v-model="formData.staffDutyCode"
                  placeholder="请选择入职岗位"
                  clearable
                  disabled
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
              <!-- 联想控件 -->
              <el-form-item label="所属部门:" prop="projectId">
                <el-select
                  v-model="formData.projectId"
                  placeholder="请选择归属项目"
                  clearable
                  class="input-width"
                  disabled
                >
                  <el-option
                    v-for="(item, index) in projectTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间:">
                <el-date-picker
                  v-model="formData.entryDate"
                  format="yyyy-MM-dd"
                  class="input-width"
                  placeholder="请选择入职时间"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人:">
                <el-input
                  v-model="formData.seniority"
                  placeholder="请输入工作年限"
                  clearable
                  disabled
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
        >确定</el-button>
        <el-button
          type="primary"
          :plain="true"
          size="medium"
          @click="close"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUemUser, saveUemUser, editUemUser } from '@/api/user-manage';
import { formRules } from './rules';

export default {
  components: {},
  // inheritAttrs: false,
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: formRules, // 验证规则
      formData: {
        account: '',
        name: '',
        mobile: '',
        sex: '',
        email: '',
        jobStatus: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        seniority: '', // 工作年限
        entryDate: '', // 入职时间
        staffDutyCode: '',
        projectId: ''
      },
      // TODO（0男，1女）
      sexOptions: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ],
      // 在职状态 //TODO
      jobStatusOptions: [
        {
          label: '试用员工',
          value: '0'
        },
        {
          label: ' 正式员工',
          value: '1'
        }
      ],
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
      ],
      // TODO
      projectTypeOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    };
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.uemUserId && this.getDetailInfo();
      console.log('【 this.editData 】-246', this.editData);
      return this.editData.uemUserId ? '编辑用户信息' : '新增用户';
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$refs['elForm'].clearValidate();
  },
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
          ...res.data,
          sex: res.data.sex ? 0 : 1
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
.user-profile-dialog {
  .form-wrap {
    height: 280px;
    .input-width {
      width: 180px;
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
