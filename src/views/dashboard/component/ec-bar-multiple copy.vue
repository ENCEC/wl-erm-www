<!--
 * @Author: Hongzf
 * @Date: 2022-08-25 17:06:32
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-09 17:54:05
 * @Description:
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
      default: 'barChart'
    },
    ecData: {
      type: Array,
      default: () => []
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
      chart: null
      // seriesData: []
    };
  },
  computed: {
    xData() {
      return ['项目总监', '项目经理', '开发经理', '需求组长', '开发成员', '需求成员'];
    },
    seriesData() {
      return [{
        name: 'one2',
        data: [320, 332, 301, 334, 390, 301, 334, 390]
      },
      {
        name: 'two2',
        data: [220, 182, 191, 234, 290, 301, 334, 390]
      },
      {
        name: 'on2e',
        data: [320, 332, 301, 334, 390, 301, 334, 390]
      },
      {
        name: 'tw2o',
        data: [220, 182, 191, 234, 290, 301, 334, 390]
      }, {
        name: 'o2ne',
        data: [320, 332, 301, 334, 390, 301, 334, 390]
      },
      {
        name: 'tw6o',
        data: [220, 182, 191, 234, 290, 301, 334, 390]
      }
      ];
    },
    legendData() {
      return this.seriesData.map(item => item.name)
    }
  },
  watch: {
    ecData: {
      // immediate: true,
      deep: true,
      handler(val) {
        const chartData = val
        // this.seriesData = chartData.map(item => {
        //   //  ['项目总监', '项目经理', '开发经理', '需求组长', '开发成员', '需求成员'];
        // // chiefNumber、dutyNumber、devDirectorNumber、
        // // demandNumber、genDevUsersNumber、genDemandUsersNumber
        //   const { chiefNumber, dutyNumber, devDirectorNumber,
        //     demandNumber, genDevUsersNumber, genDemandUsersNumber } = item
        //   return {
        //     name: item.projectName,
        //     data: [chiefNumber, dutyNumber, devDirectorNumber,
        //       demandNumber, genDevUsersNumber, genDemandUsersNumber]// [320, 332, 301, 334, 390, 301, 334, 390]
        //   }
        // })
        // 加载图表
        this.initChart();
      }
    }
  },
  mounted() {
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
      const seriesConfig = {
        type: 'bar',
        barWidth: 20,
        // barMinWidth: 13,
        // barMaxWidth: 50,
        barGap: 0, // 间距
        itemStyle: {
          // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
          // normal: {
          //   barBorderRadius: 8 // 柱形图圆角，初始化效果[15, 15, 0, 0]
          // }
        }
      };
      // Y轴数据
      let seriesData = this.seriesData.map(item => {
        return {
          ...seriesConfig,
          ...item
        }
      })
      // TODO
      seriesData = [...seriesData, ...seriesData]
      console.log('【 seriesData[0].data.length 】-123', seriesData.length)
      // 一个x轴最多放下48个柱/每个组的柱数=显示几组合适
      const showNum = Math.floor(48 / (seriesData.length)) - 1; //  这个5  可以顺便调整    是用来判断当前视图要显示几个
      const showDataZoom = seriesData.length > 6
      // 图表配置
      this.chart.setOption({
        // 滚动条
        dataZoom: [
          {
            show: showDataZoom, // 是否显示滑动条，不影响使用
            endValue: showNum, // 一次性展示几个刻度的数据，超过则显示滚动条

            startValue: 0, // 从头开始。
            xAxisIndex: 0, // 这里是从X轴的0刻度开始
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            zoomLock: true,
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            realtime: false, // 是否实时更新(拖动滚动条的时候数据是否变化，false的话停止拖动数据才变化)
            filterMode: 'filter',
            // handleIcon: 'M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z',
            moveHandleSize: 20,
            moveOnMouseMove: true,
            // maxValueSpan: 7,
            // minValueSpan: 7,
            // moveHandleSize: 0,
            brushSelect: false, // 刷选功能，设为false可以防止拖动条长度改变 ************（这是一个坑）
            // 滚动条样式
            top: 400, // TODO:距离调整
            bottom: 5,
            height: 8, // 滚动条高度
            backgroundColor: '#fcfcfc',
            borderColor: 'rgba(43,48,67,.1)',
            fillerColor: '#3aa1ff',
            handleStyle: {
              color: '#3aa1ff',
              borderColor: '#3aa1ff'
            }
          }
        ],
        // TODO
        color: ['#3aa1ff', '#4ecb73', '#fbd437', '#435188'],
        backgroundColor: '#FFF', // 背景
        // 标题
        title: {
          text: '项目人员详细配置情况',
          top: 13,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#7f7f7f'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          // 【背景框样式设置】
          backgroundColor: 'rgb(255,255,255)', // 设置背景图片 rgba格式
          extraCssText: 'box-shadow: 0 0 8px rgba(0,0,0,0.5)',
          // color: 'black',
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          // 【指针区域样式】
          axisPointer: {
            show: true, // tooltip轴线,
            type: 'shadow', // 背景色
            shadowStyle: {
              color: 'rgba(0,0,0,0.05)'// 指针区域-背景色设置
            }
          },
          // 【自定义tooltip样式】
          // formatter: '{a} {c}'
          formatter: function(params) {
            // console.log('【 params 】-126', params)
            let htmlStr = ''
            // 编写展示模板
            params.forEach((item) => {
              htmlStr += `<div style="display: flex; justify-content: space-between; align-item:center">
                        <div><span style="font-size:10px;color:${item.color};">●</span> ${item.seriesName}</div>
                        <div style="font-weight:500; margin-left: 15px;">${item.value}</div>
                    </div>`
            })
            htmlStr = params[0].name + htmlStr
            return htmlStr
          }
        },
        // 【图例】
        legend: {
          data: this.legendData,
          icon: 'rect',
          x: 'center',
          y: 'bottom',
          itemWidth: 7,
          itemHeight: 7,
          itemGap: 13,
          textStyle: {
            fontSize: 12,
            color: '#b3b3b3'
          }
        },
        grid: {
          top: 80, // 图表距离标题的距离
          left: '2%',
          right: '2%',
          bottom: showDataZoom ? '15%' : '10%', // TODO 图表距离底部图例的距离
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
            // axisLabel: {
            //   auto: true
            // },
            axisLine: {
              // X轴线的颜色
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        yAxis: [
          {
            // max: 45,
            // min: 0,
            // splitNumber: 5,
            // boundaryGap: [0.2, 0.2],
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
        series: seriesData
      });
    }
  }
};
</script>
