<template>
  <el-upload
    ref="uploadFile"
    class="upload-file"
    :file-list="fileList"
    :show-file-list="false"
    multiple
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
    <div slot="trigger">
      <el-button
        :loading="buttonLoading"
        :disabled="list.length>0"
        size="medium"
        type="primary"
      >上传</el-button>
    </div>
    <div v-for="(item, index) in list" :key="index" v-loading="buttonLoading" class="sys-file-list-item">
      <i class="el-icon-s-order" order />
      <span class="file-name" @click="handleDownload">
        {{ userName + type }}
      </span>
      <i class="el-icon-close close" @click="handleDelete" />
      <i class="el-icon-check check" />
    </div>
    <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过2MB</div>
  </el-upload>
</template>
<script>
// import { mapGetters } from "vuex";
import {
  downloadExternalFile
} from '@/api/common';
import { downloadFile } from '@/utils/util'
import { uploadExternalFile, deleteResume } from '@/api/staff-query.js';

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
    // 用来判断是上传简历还是转正申请表
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // fileList: [],
      // uploadFile: null,
      list: [],
      formdata: '',
      buttonLoading: false
    };
  },
  watch: {
    resume: {
      handler(newVal) {
        if (newVal) {
          this.list.splice(0, 1, { name: this.userName + this.type, fileKey: newVal });
        } else {
          this.list = [].concat([])
        }
      }
      // immediate: true,
    }
  },

  methods: {
    handleDownload() {
      const params = {
        systemId: 'YYDM200013',
        fileKey: this.list[0].fileKey
      };
      downloadExternalFile(params)
        .then((res) => {
          if (res.success) {
            const fileName = this.userName + this.type// res.fileName.substring(0, res.fileName.lastIndexOf('.'));
            downloadFile(res.data, fileName)
          } else {
            this.$message.error(res.errorMessages[0])
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleUpload(uploadObject) {
      this.buttonLoading = true
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
      this.formdata = new FormData();
      this.formdata.append('fileType', params.fileType);
      this.formdata.append('fileName', params.fileName);
      this.formdata.append('systemId', 'YYDM200013');
      this.formdata.append('file', params.file);
      this.formdata.append('uemUserId', this.userId);
      this.formdata.append('type', this.type);
      uploadExternalFile(this.formdata)
        .then((res) => {
          console.log(Object.keys(res.data)[0]);
          this.$emit('resumeChange', Object.keys(res.data)[0]);
          this.$message.success('上传成功');
          this.buttonLoading = false
        })
        .catch(() => {
          this.list = []
          this.buttonLoading = false
          this.$message.error('上传失败');
        });
    },
    sysUploadFile() {

    },
    handleSuccess() {
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed() {
    },
    beforeUpload(file) {
      debugger
      // this.list.push(file);
      // this.$refs.uploadFile.fileList = [];

      this.$refs.uploadFile.fileList = [];
      const isPDF = file.type === 'application/pdf';
      const isLtNM = file.size / 1024 / 1024 < 2;
      if (!isPDF) {
        this.$message.error('上传文件只能是 PDF 格式!');
      }
      if (!isLtNM) {
        this.$message.error('文件大小不能超过2MB!');
      }
      if (isPDF && isLtNM) {
        this.list.push(file);
      }
      return isPDF && isLtNM
    },
    beforeRemove() {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleDelete() {
      this.$confirm(
        '您确定要删除文件吗?删除后不可恢复',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          deleteResume({
            uemUserId: this.userId,
            type: this.type
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$emit('deleteResume')
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>

<style lang="scss">
.upload-file {
  display: inline-block;
  // max-width: 90px;
  /* overflow: hidden; */
  .sys-file-list-item{
    position: relative;
    &:hover{
      background-color: #f5f7fa;
      .file-name{
        padding-right: 20px;
        color: #0050AC;
        cursor: pointer;
      }
      .check{
        display: none;
      }
      .close{
        display: inline-block;
        cursor: pointer;
        &:hover{
          color: #0050AC;
        }
      }
    }
    .check,.close{
      position: absolute;
      top: 11px;
      right: 5px;
    }
    .close{
      display: none;
    }

  }
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
