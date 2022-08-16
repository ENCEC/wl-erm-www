<!--
 * @Author: Hongzf
 * @Date: 2022-08-03 10:20:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-15 17:08:05
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
      pageSize,
      currentPage

    }) {
      return new Promise((resolve) => {
        queryUser({
          name: keyword,
          pageSize,
          pageNo: currentPage
        }).then((res) => {
          const records = res.records
          resolve({
            records,
            total: res.totalRecord
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
    handleChange(value) {
      this.$emit('input', this.selectVal);
      this.$emit('getSelectVal', this.selectVal);
    }
  }
};
</script>
