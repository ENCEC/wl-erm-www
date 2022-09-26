<!--
 * @Author: Hongzf
 * @Date: 2022-08-29 18:08:12
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-14 15:09:27
 * @Description: 仪表盘
-->

<template>
  <div class="dashboard-container">
    <div class="top-wrap">
      <!-- 部门人数 -->
      <div class="card-wrap">
        <!-- 标题 -->
        <div class="title-box">
          <span> 部门人数</span>
          <span class="num"> {{ deptInfo.totalNumber?deptInfo.totalNumber.number:'0' }}人</span>
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
            label-prop="postName"
            value-prop="number"
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
          <span class="num">  {{ staffInfo.totalNumber?staffInfo.totalNumber.number:'0' }}个</span>
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
            :ec-data="staffInfo.data"
            label-prop="projectName"
            value-prop="totalNum"
            title="项目人员配置情况分析"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
    <div class="bottom-wrap">
      <!-- 人员趋势图 -->
      <EcLine :ec-data="trendInfo" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import EcLine from './component/ec-line.vue';
import EcBar from './component/ec-bar-single.vue';
import {
  queryPostOfDept,
  queryProjectStaff,
  queryUemUserTrend
} from '@/api/dashboard';
export default {
  name: 'Dashboard',
  components: {
    EcLine,
    EcBar
  },
  data() {
    return {
      deptInfo: {}, // 部门人数信息
      staffInfo: {}, // 部门项目信息
      trendInfo: {} // 人员趋势
    };
  },
  computed: {},
  created() {
    this.getData()
  },
  methods: {
    // 跳转
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
      // 项目人员配置情况
      queryProjectStaff().then(res => {
        if (res.success) {
          this.staffInfo = res.data || {}
        }
      })
      // 人员趋势
      queryUemUserTrend().then(res => {
        if (res.success) {
          this.trendInfo = res.data || {}
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
    height: 350px;
    padding: 5px;
    background: #fff;
    border-radius: 10px;
  }
}

</style>
