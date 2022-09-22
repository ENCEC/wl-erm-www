<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-19 14:46:19
 * @Description: 我的任务-试用任务信息-弹框-表格
-->

<template>
  <div class="table-wrap">
    <el-form ref="tableFormRef" :model="tableForm" class="tableform-wrap" size="mini" label-width="auto" :rules="tableFormRules">
      <!-- 表格 Start -->
      <el-table
        highlight-current-row
        :data="tableForm.tableData"
        height="340px"
        border
        size="mini"
        stripe
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="standardEntryName" label="规范条目" min-width="130" />
        <el-table-column prop="actionTime" label="执行时间" width="110">
          <template slot-scope="scope">
            {{ scope.row.actionTime && scope.row.actionTime.toString()?`入职后第${scope.row.actionTime}天`:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="actionPeriod" label="执行周期(工时)" width="110" />
        <el-table-column prop="standardDetailName" label="任务名称" min-width="110" />
        <el-table-column prop="actionSerialNum" label="执行顺序" width="70" />
        <el-table-column prop="planEndDate" label="计划完成日期" width="110" />
        <!-- 员工-完成进度 -->
        <el-table-column v-if="userType===USER_TYPE.STAFF" prop="progress" label="完成进度(%)" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="scope.$index >= 0"
              :prop="`tableData[${scope.$index}].progress`"
              :rules="tableFormRules.progress"
            >
              <el-select
                v-model="scope.row.progress"
                placeholder="请选择"
                clearable
                style="width:100px"
              >
                <el-option
                  v-for="(item) in progressOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- TODO:显示条件判断确认 -->
            <span v-if="(scope.row.progress === 100) && (scope.row.status == COMPLETION_EN.COMPLETED)">
              {{ scope.row.progress }}
            </span>
          </template>
        </el-table-column>
        <!-- 统筹人 -->
        <el-table-column v-if="userType===USER_TYPE.ORDINATOR" prop="progress" label="完成进度(%)" min-width="100" />
        <!-- 负责人-下拉框-->
        <template v-if="userType===USER_TYPE.CHARGE">
          <!-- 完成结果 -->
          <el-table-column prop="resultAccess" label="完成结果" min-width="130">
            <template slot-scope="scope">
              <el-form-item
                v-if="(scope.$index >= 0)"
                :prop="`tableData[${scope.$index}].resultAccess`"
                :rules="tableFormRules.resultAccess"
              >
                <el-select
                  v-model="scope.row.resultAccess"
                  placeholder="请选择"
                  clearable
                  style="width:100px"
                >
                  <el-option
                    v-for="(item) in resultOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- 完成情况 -->
          <el-table-column prop="status" label="完成情况" min-width="130">
            <template slot-scope="scope">
              <el-form-item
                v-if="(scope.$index >= 0)"
                :prop="`tableData[${scope.$index}].status`"
                :rules="tableFormRules.status"
              >
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  clearable
                  style="width:100px"
                >
                  <el-option
                    v-for="(item) in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
        </template>
        <!-- 非负责人-文本 -->
        <template v-if="userType!==USER_TYPE.CHARGE">
          <!-- 完成结果-->
          <el-table-column v-if="userType!==USER_TYPE.CHARGE" prop="resultAccess" label="完成结果">
            <template slot-scope="scope">
              {{ $dict.getDictNameByCode('COMPLETION', scope.row.status) }}
            </template>
          </el-table-column>
          <!-- 完成情况 -->
          <el-table-column prop="status" label="完成情况">
            <template slot-scope="scope">
              {{ $dict.getDictNameByCode('COMPLETION', scope.row.status) }}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="endDate" label="完成时间" min-width="120" />
      </el-table>
      <!-- 表格 End -->
      <!-- 分页 -->
      <el-pagination
        class="pagination-wrap"
        :current-page.sync="params.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="total, prev, pager, next"
        :total="params.totalRecord"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-form>
  </div>
</template>
<script>
import { updateTaskDetailProgress, updateTaskDetailStatus } from '@/api/my-task';
import tableMix from '@/mixins/table-mixin';
import { USER_TYPE, COMPLETION_EN } from '@/store/constant'

export default {
  name: 'MyTaskTable',
  mixins: [tableMix],
  props: {
    // 编辑信息
    taskInfoId: {
      type: String,
      default: ''
    },
    // 用户类型
    userType: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      USER_TYPE,
      COMPLETION_EN,
      oldPage: '', // 页面切换前的页数
      // 表单数据
      tableForm: {
        tableData: []
      },
      // 验证规则
      tableFormRules: {
        // progress: [{ required: true, message: '请选择完成进度', trigger: 'change' }],
        // resultAccess: [
        //   { required: true, message: '请选择完成结果', trigger: 'change' }
        // ],
        // status: [
        //   { required: true, message: '请选择完成情况', trigger: 'change' }
        // ]
      },
      resultOptions: this.$dict.getDictOptions('COMPLETE_RESULT'), // 完成结果
      statusOptions: this.$dict.getDictOptions('COMPLETION').filter(item => item.value !== 0) // 完成情况
    };
  },
  computed: {
    // 完成进度-下拉
    progressOptions() {
      // const result = Array.from({ length: 11 }).map((_, index) => {
      //   return { value: index * 10,
      //     label: index * 10
      //   }
      // });
      // console.log('【 result 】-196', result)
      const arr = []
      for (let i = 0; i <= 100; i = i + 10) {
        arr.push({
          value: i,
          label: i
        })
      }
      return arr
    }
  },
  watch: {
    // 监听页数变化
    'params.currentPage': {
      deep: true,
      handler(newVal, oldVal) {
        this.oldPage = oldVal
      }
    },
    tableData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.getTableData();
        // console.log('【 tableData 】-211', this.tableData)
      }
    }
  },
  created() {
    // this.getTableData();
    // console.log('【 table-userType 】-81', this.userType)
  },
  mounted() {},
  methods: {
    // 分页触发
    handleCurrentChange(curPage) {
      this.params.currentPage = this.oldPage
      // console.log('【 this.userType 】-226', this.userType)
      if (this.userType === USER_TYPE.STAFF || this.userType === USER_TYPE.CHARGE) {
        this.$confirm(
          '是否保存当前页的数据？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(async() => {
          await this.saveCurPageData()// 保存当前页数据
          this.params.currentPage = curPage// 切换到下一页
          // console.log('【 保存成功，切换到下一页 】-227')
          this.getTableData();
          // console.log('【 保存 1】-196', this.params.currentPage, curPage)
        }).catch(() => {
          this.params.currentPage = curPage
          this.getTableData();
          // console.log('【 不保存 1】-196', this.params.currentPage, curPage)
        });
      } else {
        this.params.currentPage = curPage
        this.getTableData();
      }
    },
    // 获取表格数据
    getTableData() {
      const startIndex = (this.params.currentPage - 1) * 10
      const endIndex = startIndex + 10
      // console.log('【 start 】-263', startIndex, endIndex)
      this.tableForm.tableData = this.tableData.slice(startIndex, endIndex);
      this.params.totalRecord = this.tableData.length;
    },
    // 保存当前页数据
    saveCurPageData() {
      return new Promise((resolve, reject) => {
        // 验证表单
        let isTableFormValid = false
        this.$refs.tableFormRef.validate(valid => {
          isTableFormValid = valid
        })
        // 验证通过
        if (isTableFormValid) {
        // 发送数据
          const tableFormData = this.tableForm.tableData.map(item => {
            const { taskDetailId, progress, status, resultAccess } = item
            return { taskDetailId, progress, status, resultAccess }
          })
          let funcName = ''
          // 员工-更新任务进度
          if (this.userType === USER_TYPE.STAFF) {
            funcName = updateTaskDetailProgress
          }
          // 负责人-更新任务完成状态
          if (this.userType === USER_TYPE.CHARGE) {
            funcName = updateTaskDetailStatus
          }
          funcName(tableFormData).then(res => {
            if (res.success) {
              this.$message.success(res.data);
              resolve()
            } else {
              this.$message.error(res.errorMessages[0])
              // reject()
            }
          });
        } else {
          reject()
        }
        return isTableFormValid
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
   width:900px;
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
  // 分页
  .pagination-wrap {
    margin: 10px;
    float: right;
  }
}
</style>
