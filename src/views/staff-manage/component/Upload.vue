<!--
 * @Author: Hongzf
 * @Date: 2022-08-04 17:34:53
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-15 18:26:33
 * @Description: 所属部门-下拉
-->

<template>
  <el-upload
    :action="uploadUrl"
    :data="uploadData"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    size="mini"
    class="upload-demo"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>
</template>
<script>
import {
  downloadExternalFile, deleteFile
} from '@/api/common';
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
      fileList: []
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    };
  },
  watch: {
    fileInfo(val) {
      this.fileList.push({
        name: val,
        fileKey: val
      })
      // console.log('【 val 】-53', val)
    }
  },
  created() {},
  mounted() {},
  methods: {
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
        this.uploadData.fileName = fileName.substring(0, fileName.lastIndexOf('.'))
        this.uploadData.fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      }
      return isPDF && isLtNM;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      console.log('【handleSuccess- response, file, fileList 】-87', response.data, file, fileList)
      const obj = response.data
      this.fileList = []
      for (const key in obj) {
        this.fileList = [{
          name: obj[key],
          fileKey: key
        }]
      }
      // console.log('【 this.fileList 】-92', this.fileList)
    },
    // 点击文件下载
    handlePreview(file) {
      console.log(file);
      // TODO
      downloadExternalFile({
        systemId: process.env.VUE_APP_SYSTEMID, // 写死
        fileKey: file.fileKey.toString()// ''4312d611-9c3a-4f45-932e-a71e91b81863.txt''
      }).then(res => {
        console.log('【 res 】-90', res)
      })
    },
    // 确认删除前执行的操作
    beforeRemove(file, fileList) {
      // 在beforeRemove方法中对文件的状态进行判断，只有当前文件存在并且上传状态为success时才弹框提示。
      if (file && file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    },
    // 确认删除后执行的操作
    handleRemove(file, fileList) {
      deleteFile({
        systemId: process.env.VUE_APP_SYSTEMID, // 写死
        fileKey: file.fileKey.toString()// ''4312d611-9c3a-4f45-932e-a71e91b81863.txt''
      }).then(res => {
        this.$message.success('删除成功!');
      })
    }
    // handleChange(value) {
    //   this.$emit('input', this.selectVal);
    //   this.$emit('getSelectVal', this.selectVal);
    // }
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
</style>
