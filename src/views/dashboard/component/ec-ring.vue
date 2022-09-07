<!--
 * @Author: Hongzf
 * @Date: 2022-08-26 10:28:20
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-07 18:09:05
 * @Description:
-->
<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script>
import echarts from 'echarts';
import resize from '@/components/Charts/mixins/resize';

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'ringChart'
    },
    // 图表数据
    ecData: {
      type: Object,
      default: () => {}
    },
    // 样式
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      seriesData: []
    };
  },
  computed: {
    // seriesData() {
    //   const chartData = this.chartData || {}
    //   console.log('【 chartData 】-51', chartData)
    //   const arr = []
    //   // const total = chartData.number
    //   if (chartData.number) {
    //     delete chartData.number
    //   }
    //   for (const key in chartData) {
    //     arr.push({ name: key, value: chartData[key] })
    //   }
    //   console.log('【 arr 】-58', arr)
    //   return [
    //     { value: 735, name: '5年以上' },
    //     { value: 580, name: '4-5年' },
    //     { value: 484, name: '2-3年' },
    //     { value: 300, name: '1年以下' }
    //   ];
    // }
  },
  watch: {
    ecData: {
      // immediate: true,
      deep: true,
      handler(val) {
        // const chartData = val || {}
        // const arr = []
        // // const total = chartData.number
        // if (chartData.number) {
        //   delete chartData.number
        // }
        // for (const key in chartData) {
        //   arr.push({ name: key, value: chartData[key] })
        // }
        this.seriesData = [];
      }
    }
  },
  mounted() {
    // this.initChart();
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      console.log('【 this.chart 】-101', this.chart)
      const gaugeData = [
        {
          value: 20,
          name: 'Perfect',
          title: {
            offsetCenter: ['0%', '-30%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%']
          }
        },
        {
          value: 40,
          name: 'Good',
          title: {
            offsetCenter: ['0%', '0%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%']
          }
        },
        {
          value: 60,
          name: 'Commonly',
          title: {
            offsetCenter: ['0%', '30%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '40%']
          }
        }
      ];
      this.chart.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        // series.progress在 v5.0以上才支持
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            startAngle: 0,
            endAngle: 360,
            detail: {
              formatter: '{value}'
            },
            data: [
              {
                value: 50,
                name: 'SCORE'
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
