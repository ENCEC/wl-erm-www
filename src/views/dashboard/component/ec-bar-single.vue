<!--
 * @Author: Hongzf
 * @Date: 2022-09-05 10:18:51
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-05 17:43:51
 * @Description: 柱状图
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
      default: 'barChart'
    },
    title: {
      type: String,
      default: '标题'
    },
    // 图表数据
    ecData: {
      type: Array,
      default: () => []
    },
    // 图表自定义配置
    ecConfig: {
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
      chart: null
    };
  },
  computed: {
    xData() {
      const ecData = this.ecData// [...this.ecData, ...this.ecData]
      const arr = ecData.map(item => item.postName)
      return arr// ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月'];
    },
    seriesData() {
      const ecData = this.ecData// [...this.ecData, ...this.ecData]
      const arr = ecData.map(item => item.number || 0)
      return [
        {
          // name: 'tokyo',
          data: arr// [320, 332, 301, 334, 390, 301, 334, 390]
        }
      ];
    }
    // legendData() {
    //   return this.seriesData.map(item => item.name);
    // }
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
        barWidth: 35,
        // barMinWidth: 15,
        // barMaxWidth: 50,
        barGap: 0, // 间距
        itemStyle: {
          // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
          // normal: {
          //   barBorderRadius: 8 // 柱形图圆角，初始化效果[15, 15, 0, 0]
          // }
        }
      };
      this.chart.setOption({
        // 滚动条
        dataZoom: [
          {
            show: this.xData.length > 8, // 是否显示滑动条，不影响使用
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
            bottom: 10,
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
        color: ['#3aa1ff'],
        backgroundColor: '#FFF', // 背景
        // 标题
        title: {
          text: this.title,
          top: 16,
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
              color: 'rgba(0,0,0,0.05)' // 指针区域-背景色设置
            }
          },
          // 【自定义tooltip样式】
          // formatter: '{a} {c}'
          formatter: function(params) {
            // console.log('【 params 】-126', params)
            let htmlStr = '';
            // 编写展示模板
            params.forEach(item => {
            // ${item.seriesName}
              htmlStr += `<div style="display: flex; justify-content: space-between; align-item:center">
                            <div>
                             <span style="font-size:10px;color:${item.color};">●</span>
                             <span style="font-size:10px">${params[0].name}</span>
                            </div>
                          <div style="font-weight:500; margin-left: 15px;">${item.value}人</div>
                    </div>`;
            });
            // htmlStr = params[0].name + htmlStr;
            return htmlStr;
          }
        },
        // 【图例】
        // legend: {
        //   show: false,
        //   data: this.legendData,
        //   icon: 'rect',
        //   x: 'center',
        //   y: 'bottom',
        //   itemWidth: 7,
        //   itemHeight: 7,
        //   itemGap: 13,
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#b3b3b3'
        //   }
        // },
        grid: {
          top: 80, // 图表距离标题的距离
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
              // X轴线的颜色
              lineStyle: {
                color: '#666'
              }
            },
            // 原来默认会采用标签不重叠的策略间隔显示标签。
            axisLabel: {
              interval: 0, // 全部标签显示
              // rotate: '45', // 标签倾斜度数
              formatter: function(params) {
                const provideNumber = 5; // 每行显示的字数
                if (params && params.toString().length > provideNumber) {
                  const strToArr = params.toString().split('');
                  for (let i = provideNumber; i <= params.toString().length; i += provideNumber + 1) {
                    strToArr.splice(i, 0, '\n');
                  }
                  return strToArr.join('');
                }
                return params
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
            ...seriesConfig,
            name: this.seriesData[0].name,
            data: this.seriesData[0].data
          }
        ]
      });
    }
  }
};
</script>
