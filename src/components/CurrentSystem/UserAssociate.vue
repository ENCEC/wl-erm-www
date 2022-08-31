<!--
 * @Author: Hongzf
 * @Date: 2022-08-03 10:20:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-31 17:29:12
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
      default: false
    },
    value: {
      type: String, // 传入的值
      default: '',
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
  created() {},
  mounted() {},
  methods: {
    queryMethod({ keyword, pageSize, currentPage }) {
      return new Promise(resolve => {
        if (this.isAllUser) {
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
        } else {
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
        }
      }).catch(err => {
        console.log(err);
      });
    },
    handleChange(value, selectedRows) {
      // console.log('【 value, selectedRows 】-99', value, selectedRows);
      this.$emit('input', this.selectVal);
      this.$emit('getSelectedRows', selectedRows);
    }
  }
};
</script>
