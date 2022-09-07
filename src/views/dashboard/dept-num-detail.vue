<!--
 * @Author: Hongzf
 * @Date: 2022-08-12 19:00:39
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-07 17:30:13
 * @Description: 仪表盘-部门人数-详情
-->

<template>
  <div class="dashboard-container dept-num-detail">
    <div class="container-wrap">
      <!-- <div v-for="(item, index) in ecDataList" :key="index" class="card-wrap">
        <div class="title-box">
          {{ item.title }}
        </div>
        <div class="echarts-wrap">
          <EcPieRing
            :id="index + 'pie'"
            :ec-data="item.ecData"
            width="100%"
            height="100%"
          />
        </div>
      </div> -->
      <!-- 员工工作年限分析 -->
      <div class="card-wrap">
        <div class="title-box">员工工作年限分析</div>
        <div class="echarts-wrap">
          <EcPieRing
            id="seniority"
            :ec-data="seniorityInfo"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <!-- 员工学历分析 -->
      <div class="card-wrap">
        <div class="title-box">员工学历分析</div>
        <div class="echarts-wrap">
          <EcPieRing
            id="education"
            :ec-data="educationInfo"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <!-- 员工学历分析 -->
      <!--    width="100%"
            height="100%" -->
      <div class="card-wrap">
        <div class="title-box">员工学历分析</div>
        <div class="echarts-wrap">
          <EcRing
            id="ring"
            :ec-data="educationInfo"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {
  queryUemUserBySeniority,
  queryUemUserByEducation
} from '@/api/dashboard';
import EcPieRing from './component/ec-pie-ring.vue';
import EcRing from './component/ec-ring.vue';

export default {
  name: 'DeptNumDetail',
  components: {
    EcPieRing,
    EcRing
  },
  data() {
    return {
      permissionsLoading: true,
      ecDataList: [],
      seniorityInfo: {},
      educationInfo: {}
    };
  },
  computed: {},
  created() {
    this.getEcData();
  },
  methods: {
    getEcData() {
      // 1.员工工作年限分析
      queryUemUserBySeniority().then(res => {
        const _res = res.data
        this.seniorityInfo = _res || {};
      });
      // 2.员工学历分析
      queryUemUserByEducation().then(res => {
        const _res = res.data
        this.educationInfo = _res || {};
      });
      // // 3.员工类型分析
      // queryUemUserBySeniority().then(res => {
      //   this.ecDataList.push({
      //     title: '员工类型分析',
      //     ecData: res.data || {}
      //   });
      // });
      // // 4.员工转正占比
      // queryUemUserByEducation().then(res => {
      //   this.ecDataList.push({
      //     title: '员工转正占比',
      //     ecData: res.data || {}
      //   });
      // });
      // // 5.员工离职占比
      // queryUemUserBySeniority().then(res => {
      //   this.ecDataList.push({
      //     title: '员工离职占比',
      //     ecData: res.data || {}
      //   });
      // });
      // // 6.实习生/应届生转正比
      // queryUemUserByEducation().then(res => {
      //   this.ecDataList.push({
      //     title: '实习生/应届生转正比',
      //     ecData: res.data || {}
      //   });
      // });
      // console.log('【 this.ecDataList 】-57', this.ecDataList);
    }
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
