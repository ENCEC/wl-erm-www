<!--
 * @Author: Hongzf
 * @Date: 2022-08-12 19:00:39
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-05 14:24:58
 * @Description: 仪表盘-部门人数-详情
-->

<template>
  <div class="dashboard-container dept-num-detail">
    <div class="container-wrap">
      <div v-for="(item, index) in 6" :key="index" class="card-wrap">
        <!-- 标题 -->
        <div class="title-box">
          {{ "员工工作年限分析" }}
        </div>
        <!-- 图表 -->
        <div class="echarts-wrap">
          <EcPieRing
            :id="index + 'pie'"
            title="部门人员岗位情况分析"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EcPieRing from './component/ec-pie-ring.vue';
export default {
  name: 'DeptNumDetail',
  components: {
    EcPieRing
  },
  data() {
    return {
      permissionsLoading: true
    };
  },
  computed: {
    ...mapGetters(['roles']),
    noPermits() {
      if (!this.$permissions.noPermits) {
        return '';
      }
      return this.$permissions.noPermits.join(', ');
    },
    permits() {
      if (!this.$permissions.permits) {
        return '';
      }
      return this.$permissions.permits.join(', ');
    },
    title() {
      if (this.permissionsLoading) {
        return '权限加载中';
      }
      return '权限已加载';
    },
    info() {
      if (this.permissionsLoading) {
        return '';
      }
      return JSON.stringify(
        {
          noPermits: this.$permissions.noPermits,
          permits: this.$permissions.permits
        },
        null,
        4
      );
    }
  },
  async created() {
    this.permissionsLoading = true;
    await this.$permissions.loadPermissions(this.$route.path);
    this.permissionsLoading = false;
  }
};
</script>
<style lang="scss" scoped>
.dept-num-detail {
  padding: 15px 15px;
  background-color: #f2f2f2;
  overflow: auto;
  // 顶部柱状图
  .container-wrap {
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-gap: 20px 10px;
    //  width: 100%;
    min-width: 1253px;
    max-width: 100%;
    .card-wrap {
      width: 411px;
      // 标题
      .title-box {
        width: 233px;
        height: 52px;
        line-height: 52px;
        background-color: #fff;
        border-radius: 10px;
        color: #666;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }
      // 图表
      .echarts-wrap {
        margin-top: -15px;
        width: 100%;
        height: 368px;
        padding: 5px;
        background: #fff;
        border-radius: 10px;
      }
    }
  }
}
</style>
