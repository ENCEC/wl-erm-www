<!--
 * @Author: Hongzf
 * @Date: 2022-08-12 19:00:39
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-05 15:19:35
 * @Description: 首页
-->
<template>
  <div class="dashboard-container">
    <div class="top-wrap">
      <!-- 部门人数 -->
      <div class="card-wrap">
        <!-- 标题 -->
        <div class="title-box">
          <span> 部门人数</span>
          <span class="num"> {{ deptInfo.totleNumber.number||'0' }}人</span>
          <span class="icon-box" @click="goUrl('dept')">
            <el-image
              class="icon"
              :src="require('@/assets/images/icon-dept.png')"
              fit="contain"
            />
          </span>
        </div>
        <!-- 图表 -->
        <div class="echarts-wrap">
          <EcBar
            id="deptNum"
            title="部门人员岗位情况分析"
            :ec-data="deptInfo.data"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <!-- 部门项目数 -->
      <div class="card-wrap">
        <!-- 标题 -->
        <div class="title-box">
          <span> 部门项目数</span>
          <span class="num"> {{ 38 }}人</span>
          <span class="icon-box" @click="goUrl('project')">
            <el-image
              class="icon"
              style="width:43px"
              :src="require('@/assets/images/icon-task.png')"
              fit="contain"
            />
          </span>
        </div>
        <!-- 图表 -->
        <div class="echarts-wrap">
          <EcBar
            id="projectNum"
            title="项目人员配置情况分析"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
    <div class="bottom-wrap">
      <!-- 人员趋势图 -->
      <EcLine width="100%" height="100%" />
    </div>
    <!-- <Keyboard /> -->
    <!-- <LineMarker /> -->
    <!-- <MixChart /> -->
    <!-- 折线图 -->
    <!-- 饼图 -->
    <!-- <EcPieRing width="350px" height="300px" /> -->
    <!-- 柱状图 -->
    <!-- <EcBarMultiple width="900px" height="300px" /> -->
    <!-- <div class="home-wrap">
      <el-card v-for="(item, index) in 3" :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-monitor" />
          <span>功能开发中</span>
        </div>
        <div class="text item">
          敬请期待...
        </div>
      </el-card>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Keyboard from '@/components/Charts/Keyboard.vue'
// import LineMarker from '@/components/Charts/LineMarker.vue'
// import MixChart from '@/components/Charts/MixChart.vue'
import EcLine from './component/ec-line.vue';
// import EcPieRing from './component/ec-pie-ring.vue'
// import EcBarMultiple from './component/ec-bar-multiple.vue'
import EcBar from './component/ec-bar-single.vue';
import {
  queryPostOfDept
} from '@/api/dashboard';
export default {
  name: 'Dashboard',
  components: {
    EcLine,
    EcBar
    // Keyboard, LineMarker, MixChart
  },
  data() {
    return {
      permissionsLoading: true,
      // 部门人数
      deptInfo: {}
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
    this.getData()
  },
  methods: {
    goUrl(type) {
      let url = ''
      type === 'dept' && (url = '/dept-num-detail')
      type === 'project' && (url = '/project-num-detail')
      url && this.$router.push(url)
    },
    getData() {
      // 部门人数
      queryPostOfDept().then(res => {
        if (res.success) {
          this.deptInfo = res.data || {}
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 15px 15px;
  background-color: #f2f2f2;
  overflow: auto;
  // 顶部柱状图
  .top-wrap {
    display: flex;
    justify-content: space-between;
    .card-wrap {
      min-width: 625px;
      max-width: 49.5%;
      // 标题
      .title-box {
        width: 100%;
        height: 65px;
        line-height: 65px;
        background-color: #60c4f1;
        border-radius: 10px;
        color: #000;
        font-size: 24px;
        font-weight: bold;
        span {
          display: inline-block;
          box-sizing: border-box;
          width: 30%;
          height: 100%;
          text-align: center;
          .icon {
            margin-top: 8px;
            width: 50px;
            height: 50px;
          }
        }
        .num {
          font-size: 34px;
        }
        .icon-box {
          float: right;
          background: #14acf0;
          border-radius: 10px;
          cursor: pointer;
        }
      }
      // 图表
      .echarts-wrap {
        margin-top: 5px;
        width: 100%;
        height: 386px;
        padding: 5px;
        background: #fff;
        border-radius: 10px;
      }
      &:nth-child(1) {
        margin-right: 15px;
      }
    }
  }
  // 底部折线图
  .bottom-wrap {
    margin-top: 15px;
    min-width: 1253px;
    max-width: 100%;
    height: 324px;
    padding: 5px;
    background: #fff;
    border-radius: 10px;
  }
}

// .home-wrap {
//   display: flex;
//   justify-content: space-between;
//   padding: 24px;
//   .box-card {
//     width: 32.5%;
//     .item {
//       height: 100px;
//       line-height: 100px;
//       text-align: center;
//       font-size: 18px;
//       color: #ccc;
//     }
//   }
// }
</style>
