<!--
 * @Author: Hongzf
 * @Date: 2022-09-05 11:11:15
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-09 17:38:25
 * @Description: 仪表盘-项目数量-详情
-->

<template>
  <div class="dashboard-container project-num-detail">
    <div class="container-wrap">
      <!-- 柱状图 -->
      <EcBarMultiple :ec-data="ecData" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import {
  queryProjectDetailedStaff
} from '@/api/dashboard';
import EcBarMultiple from './component/ec-bar-multiple.vue';
export default {
  name: 'ProjectNumDetail',
  components: {
    EcBarMultiple
  },
  data() {
    return {
      ecData: []
    };
  },
  computed: { },
  created() {
    this.getEcData()
  },
  methods: {
    getEcData() {
      queryProjectDetailedStaff().then(res => {
        const _res = res.data
        this.ecData = _res || {};
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.project-num-detail {
  // padding: 15px 15px;
  // background-color: #f2f2f2;
  background: #fff;
  overflow: auto;
  .container-wrap {
    margin-top: 15px;
    min-width: 1253px;
    max-width: 100%;
    height: 460px;
    padding: 5px;
  }
}
</style>
