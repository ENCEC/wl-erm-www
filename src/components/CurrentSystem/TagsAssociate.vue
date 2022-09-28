<template>
  <el-associate
    v-model="tagIds"
    v-bind="$attrs"
    :display-init="tagNames"
    :columns="associateColumns"
    value-prop="sysTagId"
    label-prop="tagName"
    multiple
    clearable
    :query-method="queryMethod"
    v-on="$listeners"
    @change="handleChange"
  />
</template>
<script>
import { querySysTag } from '@/api/common';
// import { getSupplier } from '@/api/procurement-manage'
export default {
  props: {
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
      tagsId: [], // 标签id组成的数组
      optionsList: [],
      associateColumns: [
        {
          title: '标签名称',
          field: 'tagName'
        }
      ]
    };
  },
  computed: {
    tagNames() {
      return this.initLabel ? this.initLabel.split(',') : []
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.tagIds = newVal ? newVal.split(',') : []
      },
      immediate: true
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
        querySysTag({
          tagName: keyword,
          pageSize,
          currentPage
        }).then(res => {
          // console.log('【 res 】-81', res)
          const _res = res;
          const records = _res.data.records;
          const total = _res.data.totalRecord
          resolve({ records, total });
        });
      }).catch(err => {
        console.log(err);
      });
    },
    handleChange(value, selectedRows) {
      // console.log('【 value, selectedRows 】-99', value, selectedRows);
      this.$emit('tagChange', value.join(','));
      this.$emit('getSelectedRows', selectedRows);
    }
  }
};
</script>
