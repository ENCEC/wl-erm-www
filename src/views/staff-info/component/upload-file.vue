<template>
  <el-upload
    ref="uploadFile"
    class="upload-file"
    :file-list="fileList"
    :show-file-list="false"
    :multiple="false"
    :accept="accept"
    action="/"
    :limit="1"
    :on-preview="handlePreview"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :http-request="handleUpload"
  >
    <el-button v-if="!uploadFile" size="medium" type="primary">上传</el-button>
    <el-button v-else :title="uploadFile" type="text" size="medium">{{
      uploadFile
    }}</el-button>
  </el-upload>
</template>
<script>
import { uploadExternalFile } from '@/api/staff-query.js';

export default {
  props: {
    accept: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      uploadFile: null
    };
  },
  methods: {
    handleUpload(uploadObject) {
      const arr = uploadObject.file.name.split('.');
      this.uploadFile = arr[0];
      const params = {
        fileType: arr[1],
        fileName: arr[0],
        file: uploadObject.file
      };
      console.log(params);
      uploadExternalFile(params)
        .then(() => {
          debugger;
        })
        .catch(() => {
          debugger;
        });
    },
    handleSuccess(res, file) {
      debugger;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      debugger;

      console.log(file, fileList);
    },
    handlePreview(file) {
      debugger;

      console.log(file);
    },
    handleExceed(files, fileList) {
      debugger;

      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeUpload(file) {
      debugger;
    },
    beforeRemove(file, fileList) {
      debugger;
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss">
.upload-file {
  display: inline-block;
  max-width: 90px;
  /* overflow: hidden; */
  .el-upload {
    .el-button {
      span {
        display: inline-block !important;
        max-width: 90px;
        overflow: hidden;
      }
    }
  }
}
</style>
