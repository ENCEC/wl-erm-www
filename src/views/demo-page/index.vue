<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:24px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>示例</el-breadcrumb-item>
      <el-breadcrumb-item>列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" size="mini">
      <el-form-item label="学生名称:">
        <el-input ref="test" v-model="form.name" name="name" />
      </el-form-item>
      <el-form-item label="学生生日:">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="教师名称2:">
        <el-associate
          v-model="teacherName"
          :columns="columns"
          value-prop="id"
          label-prop="teacherName"
          :query-method="queryMethod"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleOpen()">弹框编辑</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 20px">
      <button @click="runCommand('exportFile')">导出</button>
      <button @click="runCommand('importFile')">导入</button>
    </div>
    <el-table
      highlight-current-row
      :data="records"
      tooltip-effect="dark"
      style="width: 100%"
      @current-change="handleCurrentRow"
    >
      <el-table-column
        prop="name"
        label="学生姓名"
      />
      <el-table-column
        prop="email"
        label="学生邮箱"
      />
      <el-table-column
        prop="age"
        label="学生年龄"
      />
      <el-table-column
        prop="birthday"
        label="学生生日"
      />
      <el-table-column
        prop="teacherName"
        label="教师名称"
      />
      <el-table-column
        prop="teacherGender"
        label="教师性别"
      >
        <template slot-scope="scope">
          {{ scope.row.teacherGender === 1? '男':'女' }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px"
      :current-page.sync="form.currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      title="上传"
      :visible.sync="show"
      width="30%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="show = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

// import CreateDemo from './component/detail'
import ds, { dsc } from '@/daoService/DaoServiceClientES6Adapter';
const student = ds.QStudent

export default {
  name: 'Demo',
  components: {
    // CreateDemo
  },
  data() {
    return {
      show: false,
      form: {
        name: '',
        birthday: '',
        currentPage: 1,
        pageSize: 10
      },
      teacherName: '',
      records: 0,
      currentPage: 1,
      total: 0,
      currentRow: '',
      columns: [
        {
          title: '教师名称',
          field: 'teacherName'
        },
        {
          title: '教师性别',
          field: 'sex'
        }
      ],
      queryMethod({
        keyword,
        pageSize,
        currentPage
      }) {
        console.log('【 currentPage 】-134', currentPage)
        const data = {
          currentPage: currentPage,
          pageSize: pageSize,
          keyword: keyword
        }
        return new Promise((resolve, reject) => {
          ds.QTeacher.select(ds.QTeacher.teacherName, ds.QTeacher.sex).where(ds.QTeacher.teacherName._like$_(keyword)).paging(currentPage, pageSize).execute().then(res => {
            resolve({
              records: res.data.records,
              total: res.data.totalRecord,
              recordStart: res.data.recordStart,
              recordEnd: res.data.recordEnd
            })
          })
        })
      }
    }
  },
  computed: {},
  created() {
    this.query()
  },
  methods: {
    // 导入
    runCommand: function(sign) {
      console.log('【 sign 】-157', sign, student)
      // var code;
      // code = document.getElementById(sign).value;
      // var func = new Function(code);
      // func();
      // 42334
      // 教师姓名和学生性别？
      if (sign === 'exportFile') dsc.withModel(student).forExport(student.name, student.email, student.age, student.birthday, student.sex, student.teacherId).async(false).where(student.age.eq$('30')).tag('export_student_list').execute();// this.callable
      if (sign === 'importFile') dsc.forImport().tag('import_student_list').execute(this.onFileUploadOk, this.onFileUploadFail);
    },
    onFileUploadOk: function(data) {
      alert(JSON.stringify(data, null, 4));
    },
    onFileUploadFail: function(data) {
      alert(JSON.stringify(data, null, 4));
    },
    query() {
      student.select(student.id, student.name, student.email, student.birthday, student.age, student.teachers.sex, student.teachers.teacherName, student.teacherId, student.fileKey)
        .where(student.name._like$_(this.form.name)).paging(this.form.currentPage, this.form.pageSize).execute().then(res => {
          this.records = res.data.records
          this.total = res.data.totalRecord
        })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query()
    },
    handleCurrentRow(row) {
      this.currentRow = row
    },
    handleClose() {
      this.show = false
    },
    handleOpen() {
      this.show = true
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
