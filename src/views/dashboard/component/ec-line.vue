<!--
 * @Author: Hongzf
 * @Date: 2022-08-29 18:08:12
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-14 15:12:30
 * @Description: 折线图
-->

<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize';

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'lineChart'
    },
    ecData: {
      type: Object,
      default: () => {}
    },
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
      xData: [],
      yData: []
    };
  },
  computed: {
    // xData() {
    //   return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '19月', '八月'];
    // },
    // yData() {
    //   return [10, 50, 25, 45, 22, 65, 22, 20, 82, 91, 34, 50, 34, 50];
    // }
  },
  watch: {
    ecData: {
      // immediate: true,
      deep: true,
      handler(val) {
        const monthInfo = {
          1: '一月',
          2: '二月',
          3: '三月',
          4: '四月',
          5: '五月',
          6: '六月',
          7: '七月',
          8: '八月',
          9: '九月',
          10: '十月',
          11: '十一月',
          12: '十二月'
        }
        const chartInfo = val
        const chartData = []
        for (const key in chartInfo) {
          chartData.push({ name: monthInfo[key], value: chartInfo[key] || 0 })
        }
        this.xData = chartData.map(item => item.name)
        this.yData = chartData.map(item => item.value)
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
        // 滚动条
        dataZoom: [
          {
            show: this.xData.length > 9, // 是否显示滑动条，不影响使用
            xAxisIndex: 0, // 这里是从X轴的0刻度开始
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 7, // 一次性展示6个
            zoomLock: true,
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            realtime: false, // 是否实时更新(拖动滚动条的时候数据是否变化，false的话停止拖动数据才变化)
            filterMode: 'filter',
            // handleIcon: 'M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z',
            moveHandleSize: 20,
            moveOnMouseMove: true,
            maxValueSpan: 7,
            minValueSpan: 7,
            // moveHandleSize: 0,
            brushSelect: false, // 刷选功能，设为false可以防止拖动条长度改变 ************（这是一个坑）
            // 滚动条样式
            top: 310, // 距离调整
            bottom: 10,
            height: 7, // 滚动条高度
            backgroundColor: '#fcfcfc',
            borderColor: 'rgba(43,48,67,.1)',
            fillerColor: '#3aa1ff',
            handleStyle: {
              color: '#3aa1ff',
              borderColor: '#3aa1ff'
            }
          }
        ],
        backgroundColor: '#FFF', // 背景
        // 标题
        title: {
          text: '人员趋势图',
          top: 16,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#7f7f7f'
          },
          left: '2%'
        },
        tooltip: {
          // trigger: 'item', // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          trigger: 'axis',
          // 【背景框样式设置】
          backgroundColor: 'rgb(255,255,255)', // 设置背景图片 rgba格式
          extraCssText: 'box-shadow: 0 0 8px rgba(0,0,0,0.5)',
          // color: 'black',
          // borderWidth: '0.5', // 边框宽度设置1
          // borderColor: 'rgba(0, 0, 0, 0.05)', // 设置边框颜色
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          // 【指针区域样式】
          axisPointer: {
            show: false, // tooltip轴线,
            // type: 'shadow', // 背景色
            lineStyle: {
              color: 'rgba(255,255,255,0)'
            }
            // shadowStyle: {
            //   color: 'rgba(255,255,255,0.5)'// 指针区域-背景色设置
            // }
          }
          // 【自定义tooltip样式】
          // formatter: '{a} {c}'
          // formatter: function(params) {
          //   // console.log(params) // 打印数据
          // }
        },
        // 图例
        legend: {
          data: ['num'], // ['CMCC', 'CTCC', 'CUCC'],
          icon: 'rect',
          x: 'center',
          y: 'bottom',
          itemWidth: 10,
          itemHeight: 7,
          itemGap: 13,
          textStyle: {
            fontSize: 12,
            color: '#b3b3b3'
          },
          // padding: [100, 0, 0, 0]
          // left: '-3%', // 图例组件离容器左侧的距离。
          // bottom: -10 // 图例组件离容器下侧的距离。
          top: 320
          // right: '4%',
        },
        grid: {
          top: 85, // 图表距离标题的距离
          left: '2%',
          right: '2%',
          bottom: '10%', // 图表距离底部图例的距离
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xData,
            // scale: true,
            boundaryGap: true, // 刻度线不从0开始
            // 坐标轴刻度相关设置。
            axisTick: {
              alignWithLabel: true // 保证刻度线和标签对齐
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '(%)',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
              // lineStyle: {
              //   color: '#57617B'
              // }
            },
            // 刻度值
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            // 刻度线
            splitLine: {
              lineStyle: {
                color: '#ccc',
                type: 'dashed' // 虚线
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            name: 'num',
            data: this.yData,
            smooth: true,
            symbol: 'circle', // 折线上的圆点
            symbolSize: 1,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1.5 // 折现的粗细
              }
            },
            areaStyle: {
              normal: {
                color: 'rgb(185, 221, 255)'
                // new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //   offset: 0,
                //   color: 'rgba(0, 136, 212, 0.3)'
                // }, {
                //   offset: 0.8,
                //   color: 'rgba(0, 136, 212, 0)'
                // }], false)
                // shadowColor: 'rgba(0, 0, 0, 0.1)',
                // shadowBlur: 10
              }
            },
            // 区域线
            itemStyle: {
              normal: {
                color: 'rgb(45, 154, 255)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12
              }
            }
          }
        ]
      });
    }
  }
};
</script>
