<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 16:05:47
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 17:33:23
 * @Description: 系统管理-菜单管理-添加/编辑
-->
<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :title="dialogTitle"
      width="700px"
      center
      :close-on-click-modal="false"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="mini"
        label-width="100px"
        :inline="true"
        destroy-on-close
      >
        <div class="form-wrap">
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单标题:" prop="username">
                <el-input
                  v-model="formData.username"
                  placeholder="请输入菜单标题"
                  show-word-limit
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="父级菜单:" prop="name">
                <el-select
                  v-model="formData.name"
                  placeholder="请选择父级菜单"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in staffTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="资源地址:" prop="phone">
                <el-input
                  v-model="formData.phone"
                  placeholder="请输入资源地址"
                  show-word-limit
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单序号:" prop="sex">
                <el-input
                  v-model="formData.sex"
                  placeholder="请输入菜单序号"
                  clearable
                />
                <!-- <el-input-number
                  v-model="formData.sex"
                  :controls="false"
                  :min="1"
                  :max="10"
                  clearable
                  :precision="0"
                ></el-input-number> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="菜单说明:" prop="email">
                <el-input
                  v-model="formData.email"
                  type="textarea"
                  placeholder="请输入菜单说明"
                  :rows="3"
                  clearable
                  style="width:505px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="handelConfirm"
        >提交</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  inheritAttrs: false,
  props: {
    // 编辑信息
    // editData: {
    //   default: () => {
    //   }
    // }
  },
  data() {
    return {
      editData: {},
      formData: {
        username: '',
        name: '',
        phone: '',
        sex: '',
        email: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入菜单标题',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入资源地址',
            trigger: 'blur'
          }
          // {
          //   pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          //   message: "手机号格式错误",
          //   trigger: "blur"
          // }
        ],
        sex: [
          {
            required: true,
            message: '请输入菜单序号',
            trigger: 'blur'
          }
        ]
      },
      staffTypeOptions: [
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
      return this.editData.id ? '编辑菜单信息' : '新增菜单';
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields();
    },
    close() {
      this.$emit('update:visible', false);
    },
    // 提交信息
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return;
        this.close();
      });
    }
  }
};
</script>
<style lang="scss">
.form-wrap {
  height: 180px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
