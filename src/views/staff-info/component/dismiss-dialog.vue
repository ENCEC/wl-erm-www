<template>
  <el-dialog
    title="转正申请"
    :visible.sync="dialogVisible"
    width="800px"
    @close="handleClose"
  >
    <el-form>
      <el-row :gutter="100">
        <el-col :span="12">
          <el-form-item />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        leaveReason: ''
      }
    };
  },
  methods: {
    handleClose() {}
  }
};
</script>

<style>
</style>
