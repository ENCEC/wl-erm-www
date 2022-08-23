<!--
 * @Author: Hongzf
 * @Date: 2022-08-04 17:34:53
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-23 14:14:30
 * @Description: 上传
-->

<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :data="uploadData"
      :limit="1"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      size="mini"
      class="upload-demo"
    >
      <!--
      :file-list="fileList"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      -->
      <el-button size="small" type="primary">上传</el-button>
    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <div v-for="(item, index) in fileList" :key="index" v-loading="buttonLoading" class="sys-file-list-item">
      <i class="el-icon-s-order" order />
      <span class="file-name" @click="handlePreview">
        {{ item.name }}
      </span>
      <i class="el-icon-close close" @click="handleRemove" />
      <i class="el-icon-check check" />
    </div>
    <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过2MB</div>
  </div>
</template>
<script>
import {
  downloadExternalFile
} from '@/api/common';
import { downloadFile } from '@/utils/util'
import { deleteResume } from '@/api/staff-query.js';

export default {
  props: {
    uploadData: {
      type: Object, // 传入的值
      require: true,
      default: () => {}
    },
    fileInfo: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_SHARE_AUTH_PREFIX + '/uemUserManage/uploadExternalFile',
      fileSize: 2,
      fileList: [],
      fileKey: '',
      buttonLoading: false
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    };
  },
  computed: {
    fileName() {
      return this.uploadData.type + '.pdf'
    }
  },
  watch: {
    fileInfo(val) {
      this.fileKey = val
      this.fileList.push({
        name: this.fileName, // val,
        fileKey: val
      })
      // console.log('【 val 】-53', val)
    }
  },
  created() {},
  mounted() {}, methods: {
    // 上传个数限制
    handleExceed(files, fileList) {
      this.$message.error('最多只能上传1个文件');
    },
    // 上传大小格式限制
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      const isLtNM = file.size / 1024 / 1024 < this.fileSize;
      if (!isPDF) {
        this.$message.error('上传文件只能是 PDF 格式!');
      }
      if (!isLtNM) {
        this.$message.error(`文件大小不能超过${this.fileSize}MB!`);
      }
      if (isPDF && isLtNM) {
        const fileName = file.name
        if (fileName) {
          this.uploadData.fileName = fileName.substring(0, fileName.lastIndexOf('.'))
          this.uploadData.fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
        }
      }
      return isPDF && isLtNM;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      console.log('【handleSuccess- response, file, fileList 】-87', response.data, file, fileList)
      // this.fileList = []
      if (response.success) {
        this.$message.success('上传成功');
        const obj = response.data
        for (const key in obj) {
          this.fileKey = key
        }
        this.fileList = [{
          name: this.fileName, // file.name,
          fileKey: this.fileKey
        }]
        // console.log('【 this.fileKey 】-106', this.fileKey)
      }
    },
    // 点击文件下载
    handlePreview(file) {
      downloadExternalFile({
        systemId: process.env.VUE_APP_SYSTEMID, // 写死
        fileKey: this.fileKey// file.fileKey.toString()// ''4312d611-9c3a-4f45-932e-a71e91b81863.txt''
      }).then(res => {
        // TODO :错误提示
        if (res.success === false) {
          this.$message.error(res.errorMessages[0] || res.resultMsg)
          return false
        }
        const fileName = this.uploadData.type// res.fileName.substring(0, res.fileName.lastIndexOf('.'));
        downloadFile(res.file, fileName)
      })
    },
    // 确认删除前执行的操作
    beforeRemove(file, fileList) {
      // 在beforeRemove方法中对文件的状态进行判断，只有当前文件存在并且上传状态为success时才弹框提示。
      if (file && file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    },
    // TODO 确认删除后执行的操作
    handleRemove(file, fileList) {
      // console.log('【 file, fileList 】-130', file, fileList)
      this.$confirm('确定移除该文件吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteResume({
          // systemId: process.env.VUE_APP_SYSTEMID, // 写死
          // fileKey: this.fileKey// file.fileKey.toString()// ''4312d611-9c3a-4f45-932e-a71e91b81863.txt''
          uemUserId: this.uploadData.uemUserId,
          type: this.uploadData.type
        }).then(res => {
          if (res.success) {
            this.fileList = []
            this.$message.success('删除成功!');
          } else {
            this.$message.error(res.resultMsg)
          }
        })
      });
    }
  }
};
</script>
<style lang="scss" coped>
.el-upload-list__item-name {
    color: #606266;
    display: block;
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    -webkit-transition: color .3s;
    transition: color .3s;
    white-space: nowrap;
    width: 170px;
}
.sys-file-list-item{
    position: relative;
    display: flex;
    align-items: center;
    .file-name{
        color: #606266;
        display: inline-block;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        -webkit-transition: color .3s;
        transition: color .3s;
        white-space: nowrap;
        width: 170px;
    }
    &:hover{
      background-color: #f5f7fa;
      .file-name{
        // padding-right: 20px;
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
</style>
