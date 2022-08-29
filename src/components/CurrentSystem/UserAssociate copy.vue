<!--
 * @Author: Hongzf
 * @Date: 2022-08-03 10:20:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-29 16:55:36
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
    :options="{
      pageSize:10
    }"
    v-on="$listeners"
    @change="handleChange"
  />
</template>
<script>
import {
  queryUser
} from '@/api/common';
// import { getSupplier } from '@/api/procurement-manage'
export default {
  props: {
    // disabled: {
    //   type: Boolean,
    //   default: false
    // },
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
    queryMethod({
      keyword,
      pageSize = 10,
      currentPage

    }) {
      return new Promise((resolve) => {
        queryUser({
          name: keyword,
          pageSize,
          pageNo: currentPage
        }).then((res) => {
          console.log('【 res 】-81', res)
          const records = res.data// res.records
          resolve({
            records,
            total: res.data.length // res.totalRecord
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取下拉信息
    async getSelectOptions() {
      // this.optionsList = await queryStaffDutyBySelect();
    },
    handleChange(value, selectedRows) {
      console.log('【 value, selectedRows 】-99', value, selectedRows)
      this.$emit('input', this.selectVal);
      this.$emit('getSelectedRows', selectedRows);
    }
  }
};
</script>
