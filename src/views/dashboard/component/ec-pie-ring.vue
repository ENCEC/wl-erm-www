<!--
 * @Author: Hongzf
 * @Date: 2022-08-26 10:28:20
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-07 18:08:01
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
      default: 'pieChart'
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
        const chartData = val || {}
        const arr = []
        // const total = chartData.number
        if (chartData.number) {
          delete chartData.number
        }
        for (const key in chartData) {
          arr.push({ name: key, value: chartData[key] })
        }
        this.seriesData = arr
        this.initChart();
      }
    }
  },
  mounted() {
    // this.initChart();
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
      this.chart.setOption({
        animation: false,
        color: ['#3aa1ff', '#36cbcb', '#4ecb73', '#fbd437'],
        backgroundColor: '#fff', // 背景
        // 标题
        // title: {},
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgb(255,255,255)', // 设置背景图片 rgba格式
          // backgroundColor: "transparent",
          // 设置阴影
          extraCssText: 'box-shadow: 0 0 8px rgba(0,0,0,0.5)',
          // 文本样式
          textStyle: {
            fontSize: 11,
            color: '#666'
          },
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
          formatter: function(params) {
          // console.log('【 params 】-102', params.color, params);
            return `<div style="font-size:10px">
                    <div>
                      <span style="font-size:11px;color:${params.color};">●</span>
                      ${params.name}: ${params.value}人 (${params.percent.toFixed(0)}%)
                    </div>
                  </div>`;
            // return `<div style="font-size:10px">
            //           <div><span style="font-size:11px;color:${params.color};">●</span> ${params.name}</div>
            //           <div style="font-weight:500; margin-left: 12px;">数量：${params.value}人</div>
            //           <div style="font-weight:500; margin-left: 12px;">占比：${params.percent}%</div>
            //       </div>`
          }
        },
        // 图例
        legend: {
          icon: 'circle',
          x: 'center',
          y: 'bottom',
          top: 320,
          itemWidth: 8, // 图例标记的图形宽度
          itemHeight: 8, // 图例标记的图形高度。
          itemGap: 13,
          textStyle: {
            fontSize: 12,
            color: '#666'
          }
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            hoverAnimation: false, // 鼠标移进扇区不放大
            selectedMode: 'single', // 点击移入移出
            data: this.seriesData,
            radius: ['26%', '45%'], // 饼图的半径,数组的第一项是内半径，第二项是外半径
            width: '80%', // 组件的宽度
            height: '33.33%',
            avoidLabelOverlap: false,
            // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            label: {
              show: true,
              fontSize: '10',
              color: '#666',
              textAlign: 'left',
              // position: 'outer',
              // margin: 30,
              // alignTo: 'edge',
              // formatter: '{b}:{percent|{c} 小时}'
              // formatter: '{a} {c}'
              formatter: function(params) {
                return `${params.name}：${params.value}人 (${params.percent.toFixed(0)}%)`;
                // return params.name + '\n占比:' + params.percent + '\n数量：' + params.value + '人'
              }
            },
            labelLine: {
              show: true // 标签指引线
            },
            // 饼图之间的间距
            itemStyle: {
              // borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 1
            }
            // emphasis: {
            // scale: false // 是否开启高亮后扇区的放大效果
            // label: {
            //   show: true,
            //   fontSize: '40',
            //   fontWeight: 'bold'
            // },
            // itemStyle: {
            //   shadowBlur: 8,
            //   shadowOffsetX: 0,
            //   shadowColor: 'rgba(0, 0, 0, 0.3)'
            // }
            // }
          }
        ]
      });
    }
  }
};
</script>
