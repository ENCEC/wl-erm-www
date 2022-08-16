<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 09:22:23
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-16 15:30:22
 * @Description:
-->

<template>
  <div class="table-wrap">
    <el-form ref="tableFormRef" :model="tableForm" class="tableform-wrap" size="mini" label-width="auto" :rules="tableFormRules">
      <!-- 表格 Start max-height="400px" -->
      <el-table
        ref="multipleTable"
        highlight-current-row
        :data="tableForm.tableData"
        height="300px"
        style="width: 100%"
        border
        size="mini"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="standardEntryName" label="规范条目" />
        <el-table-column v-if="type!=='detail'" prop="actionTime" label="执行时间" width="110">
          <template slot-scope="scope">
            {{ scope.row.actionTime && scope.row.actionTime.toString()?`入职后第${scope.row.actionTime}天`:'' }}
          </template>
        </el-table-column>
        <el-table-column v-if="type!=='detail'" prop="actionPeriod" label="执行周期(工时)" width="110" />
        <!-- taskName -->
        <el-table-column prop="standardDetailName" label="任务名称" />
        <el-table-column prop="actionSerialNum" label="执行顺序" />
        <el-table-column v-if="type==='detail'" prop="leaderName" label="负责人" />
        <el-table-column v-if="type!=='detail'" prop="leader" label="负责人" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="type!=='detail' && scope.$index >= 0"
              :prop="`tableData[${scope.$index}].leader`"
              :rules="tableFormRules.leader"
            >
              <!-- [
              { required: scope.row.required && !scope.row.checked, message: '请选择', trigger: ['blur','change'] }
              ] -->
              <UserAssociate v-model="scope.row.leader" :init-label="scope.row.leaderName" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="planEndDate" label="计划完成日期" min-width="120" />
        <el-table-column v-if="type==='detail'" prop="endDate" label="实际完成日期" min-width="120">
          <!-- <template slot-scope="scope">
            {{ scope.row.endDate? $moment(parseInt(scope.row.endDate)).format('YYYY-MM-DD') : '' }}
          </template> -->
        </el-table-column>
        <el-table-column v-if="type==='detail'" prop="progress" label="完成进度(%)" min-width="100" />
        <el-table-column v-if="type==='detail'" prop="resultAccess" label="完成结果" />
        <el-table-column v-if="type==='detail'" prop="status" label="完成情况">
          <template slot-scope="scope">
            {{ $dict.getDictNameByCode('COMPLETION', scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="type!=='detail'"
          fixed="right"
          label="操作"
          width="70"
        >
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isNeed" type="text" size="mini" :disabled="scope.row.isNeed" @click="handleDelete(scope.row.standardEntryId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 End -->
    </el-form>
  </div>
</template>
<script>
import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'TaskTable',
  components: { UserAssociate },
  mixins: [tableMix],
  props: {
    // 编辑信息
    records: {
      type: Array,
      default: () => []
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    },
    // 任务类型
    taskType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 表单数据
      tableForm: {
        tableData: []
      },
      // 验证规则
      tableFormRules: {
        leader: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ]
      }
    };
  },
  computed: {},
  watch: {
    records: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // if (this.type === 'detail') {
        //   // 详情的列表数据
        console.log('【 详情的列表数据 】-161', newVal)
        this.tableForm.tableData = newVal
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // 删除
    handleDelete(id) {
      this.tableForm.tableData.forEach((item, index) => {
        if (item.standardEntryId === id) {
          this.tableForm.tableData.splice(index, 1)
          this.$emit('getSelectedData', this.tableForm.tableData)
        }
      })
    },
    // 验证表格
    validateTableForm() {
      let isTableFormValid = false
      this.$refs.tableFormRef.validate(valid => {
        isTableFormValid = valid
      })
      return isTableFormValid
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width:750px;
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
  // 操作栏
  .operate-wrap {
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
  // 分页
  .pagination-wrap {
    margin: 10px;
    float: right;
  }
}
</style>
