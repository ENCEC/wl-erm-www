<!--
 * @Author: Hongzf
 * @Date: 2022-09-05 11:11:15
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-05 14:45:14
 * @Description: 仪表盘-项目数量-详情
-->

<template>
  <div class="dashboard-container project-num-detail">
    <div class="container-wrap">
      <!-- 柱状图 -->
      <EcBarMultiple width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EcBarMultiple from './component/ec-bar-multiple.vue';
export default {
  name: 'ProjectNumDetail',
  components: {
    EcBarMultiple
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
