<template>
  <el-upload
    ref="uploadFile"
    class="upload-file"
    :file-list="fileList"
    :show-file-list="false"
    :multiple="true"
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
    <el-button v-if="!resume" size="medium" type="primary">上传</el-button>
    <el-button v-else type="text" size="medium">{{
      userName+type
    }}</el-button>
    <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过2MB</div>
  </el-upload>
</template>
<script>
// import { mapGetters } from "vuex";
import { uploadExternalFile } from '@/api/staff-query.js';

export default {
  name: 'UploadFile',
  props: {
    accept: {
      type: String,
      default: ''
    },
    resume: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // fileList: [],
      // uploadFile: null,
    };
  },

  methods: {
    handleUpload(uploadObject) {
      var suffix = uploadObject.file.name.substring(
        uploadObject.file.name.lastIndexOf('.') + 1
      ); // txt
      var fileName = uploadObject.file.name.substring(
        0,
        uploadObject.file.name.lastIndexOf('.')
      );

      const params = {
        systemId: 'YYDM200013',
        fileType: suffix,
        fileName: fileName,
        file: uploadObject.file
      };
      const formdata = new FormData();
      formdata.append('fileType', params.fileType);
      formdata.append('fileName', params.fileName);
      formdata.append('systemId', 'YYDM200013');
      formdata.append('file', uploadObject.file);
      formdata.append('uemUserId', this.userId);
      formdata.append('type', this.type);
      uploadExternalFile(formdata)
        .then((res) => {
          console.log(Object.keys(res.data)[0]);
          this.$emit('resumeChange', Object.keys(res.data)[0])
          this.$message.success('上传成功')
        })
        .catch(() => {
          this.$message.error('上传失败')
        });
    },
    handleSuccess(res, file) {
      debugger
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
    beforeUpload() {
      this.$refs.uploadFile.fileList = [];
    },
    beforeRemove(file) {
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
    .el-button--text {
      span {
        display: inline-block !important;
        max-width: 200px;
        overflow: hidden;
      }
    }
  }
}
</style>
