<!--
 * @Author: Hongzf
 * @Date: 2022-08-15 14:54:15
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-31 17:28:57
 * @Description: 归属项目-下拉
-->

<template>
  <el-select
    v-model="selectVal"
    v-bind="$attrs"
    filterable
    clearable
    v-on="$listeners"
    @change="handleChange"
  >
    <el-option
      v-for="(item, index) in optionsList"
      :key="'uemProjectId' + index + item.uemProjectId"
      :label="item.projectName"
      :value="item.uemProjectId.toString()"
    />
  </el-select>
</template>
<script>
import {
  queryProjectNameBySelect
} from '@/api/common';
export default {
  props: {
    value: {
      type: String, // 传入的值
      default: '',
      require: true
    }
  },
  data() {
    return {
      selectVal: this.value || '', // 选择的值
      optionsList: []
    };
  },
  watch: {
    value(newVal) {
      this.selectVal = newVal
    }
  },
  created() {
    this.getSelectOptions();
  },
  mounted() {},
  methods: {
    // 获取下拉信息
    async getSelectOptions() {
      this.optionsList = await queryProjectNameBySelect();
    },
    handleChange(value) {
      this.$emit('input', value);
      this.$emit('getSelectVal', value);
      // this.$emit('input', this.selectVal);
      // this.$emit('getSelectVal', this.selectVal);
    }
  }
};
</script>
