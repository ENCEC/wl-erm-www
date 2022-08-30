<!--
 * @Author: Hongzf
 * @Date: 2022-08-03 10:20:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-30 14:47:27
 * @Description:联想控件-用户
-->

<template>
  <el-associate
    v-model="selectVal"
    v-bind="$attrs"
    :display-init="initLabel"
    :columns="associateColumns"
    value-prop="uemUserId"
    label-prop="name"
    clearable
    :query-method="queryMethod"
    v-on="$listeners"
    @change="handleChange"
  />
</template>
<script>
import { querySubordinateUser, queryAllWorkUserList } from '@/api/common';
// import { getSupplier } from '@/api/procurement-manage'
export default {
  props: {
    isAllUser: {
      type: Boolean,
      default: true// ['all','subordinate'] 可选用户的范围：全部用户，下属
    },
    value: {
      type: String, // 传入的值
      require: true
    },
    initLabel: {
      type: String, // 初始值回显字符串
      default: '',
      require: true
    }
  },
  data() {
    return {
      selectVal: this.value || '', // 选择的值
      optionsList: [],
      associateColumns: [
        {
          title: '姓名',
          field: 'name'
        }
      ]
    };
  },
  watch: {
    value(newVal) {
      this.selectVal = newVal;
    },
    initLabel(newVal) {
      this.initLabel = newVal;
    }
  },
  created() {
    this.getSelectOptions();
  },
  mounted() {},
  methods: {
    queryMethod({ keyword, pageSize, currentPage }) {
      return new Promise(resolve => {
        if (!this.isAllUser) {
          querySubordinateUser({
            name: keyword,
            pageSize,
            pageNo: currentPage
          }).then(res => {
            // console.log('【 res 】-81', res)
            const _res = res;
            const records = _res.records;
            const total = _res.totalRecord
            resolve({ records, total });
          });
        } else {
          queryAllWorkUserList({
            name: keyword,
            pageSize,
            pageNo: currentPage
          }).then(res => {
            const _res = res.data;
            const records = _res.records;
            const total = _res.totalRecord
            resolve({ records, total });
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 获取下拉信息
    async getSelectOptions() {
      // this.optionsList = await queryStaffDutyBySelect();
    },
    handleChange(value, selectedRows) {
      // console.log('【 value, selectedRows 】-99', value, selectedRows);
      this.$emit('input', this.selectVal);
      this.$emit('getSelectedRows', selectedRows);
    }
  }
};
</script>
