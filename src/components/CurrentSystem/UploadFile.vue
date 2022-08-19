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
import { uploadExternalFile, deleteResume, downloadExternalFile } from '@/api/staff-query.js';

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
          const fileName = res.file.substring(0, res.file.lastIndexOf('.'));
          console.log(res);
          const base = res.file; // 你要传入的base64数据
          const bstr = window.atob(base);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 确定解析格式，可能可以变成img，没有深入研究
          const blob = new Blob([u8arr], {
            type: 'application/pdf;chartset=UTF-8'
          });
          const url = window.URL.createObjectURL(blob);
          // 在新窗口打开该pdf用这个
          window.open(url);
          // 下载dpf用这个
          const a = document.createElement('a');
          a.setAttribute('href', url);
          a.setAttribute('download', fileName + '.pdf');
          a.setAttribute('target', '_blank'); // 打开一个新的窗口
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // 删除url绑定
          window.URL.revokeObjectURL(url);
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
          this.$message.error('上传失败');
          this.buttonLoading = false
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
    beforeRemove(file) {
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
          deleteResume(this.userId)
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
