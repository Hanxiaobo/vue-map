<template>
  <div id="china" class="myMap" @click="mapClick">
  </div>
</template>

<script>
import * as chinaJson from '../assets/china.json'
import * as echarts from 'echarts'
export default {
  name: 'MyMap',
  data () {
    return {
      provinces: ["河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾","内蒙古","广西","西藏","宁夏","新疆","北京","天津","上海","重庆","香港","澳门"],
      myChart: '',
      isDrag: false //拖拽
    }
  },
  methods: {
    drawChina(area, json) {
        let that = this;
        echarts.registerMap(area, json);
        let ele = document.getElementById('china');
        this.myChart = echarts.init(ele);
        this.myChart.showLoading()
        let option = {
            title: {
              text: '数据点',
              subtext: '分布城市',
              left: 'center',
              textStyle: {
                color: 'red',
                fontSize: 20
              },
              subtextStyle: {
                fontSize: 15
              },
              top: 100
            },
            tooltip: {
              trigger: 'item',
              formatter: d => {
                var t = d.data.name + '</br>' + d.data.value[2]
                return t
              }
            },
            geo: {
              map: area,
              zoom: 1, //当前视角的缩放比例
              roam: true, //是否开启平游或缩放
              scaleLimit: { //滚轮缩放的极限控制
                min: 1,
                max: 10
              },
              label: {
                emphasis: {
                  show: true,
                  color: '#ffffff'
                }
              },
              itemStyle: {
                // 定义样式
                normal: {
                  // 普通状态下的样式
                  areaColor: '#323c48',
                  borderColor: '#111'
                },
                emphasis: {
                  // 高亮状态下的样式
                  areaColor: '#2a333d'
                }
              }
            },
            toolbox: {
              show: false, // 是否显示工具栏组件
              orient: 'horizontal', // 工具栏 icon 的布局朝向'horizontal' 'vertical'
              itemSize: 15, // 工具栏 icon 的大小
              itemGap: 10, // 工具栏 icon 每项之间的间隔
              showTitle: true, // 是否在鼠标 hover 的时候显示每个工具 icon 的标题
              feature: {
                mark: {
                  // '辅助线开关'
                  show: true
                },
                dataView: {
                  // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
                  show: true, // 是否显示该工具。
                  title: '数据视图',
                  readOnly: false, // 是否不可编辑（只读）
                  lang: ['数据视图', '关闭', '刷新'], // 数据视图上有三个话术，默认是['数据视图', '关闭', '刷新']
                  backgroundColor: '#fff', // 数据视图浮层背景色。
                  textareaColor: '#fff', // 数据视图浮层文本输入区背景色
                  textareaBorderColor: '#333', // 数据视图浮层文本输入区边框颜色
                  textColor: '#000', // 文本颜色。
                  buttonColor: '#c23531', // 按钮颜色。
                  buttonTextColor: '#fff' // 按钮文本颜色。
                },
                saveAsImage: {
                  // 保存为图片。
                  show: true, // 是否显示该工具。
                  type: 'png', // 保存的图片格式。支持 'png' 和 'jpeg'。
                  name: 'pic1', // 保存的文件名称，默认使用 title.text 作为名称
                  backgroundColor: '#ffffff', // 保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
                  title: '保存为图片',
                  pixelRatio: 1 // 保存图片的分辨率比例，默认跟容器相同大小，如果需要保存更高分辨率的，可以设置为大于 1 的值，例如 2
                }
              },
              zlevel: 0, // 所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
              z: 2, // 所属组件的z分层，z值小的图形会被z值大的图形覆盖
              left: 'center', // 组件离容器左侧的距离,'left', 'center', 'right','20%'
              top: '20%', // 组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
              right: 'auto', // 组件离容器右侧的距离,'20%'
              bottom: 'auto', // 组件离容器下侧的距离,'20%'
              width: 'auto', // 图例宽度
              height: 'auto' // 图例高度
            },
            backgroundColor: '#404a59',
            series: [
              {
                name: 'WAF',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: [],
                symbolSize: 10,
                showEffectOn: 'render',
                zoom: 1,
                roam: true,
                rippleEffect: {
                  brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{@[2]}',
                    position: 'right',
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: function (val) {
                        return that.pointColor(val)
                    },
                    shadowBlur: 15,
                    shadowColor: '#333'
                  }
                },
                // markPoint: {
                //   symbol: 'circle',
                //   symbolSize: 50
                // },
                zlevel: 1
              }
            ]
            // visualMap: {
            //   type: 'continuous', // 连续型
            //   min: 0, // 值域最小值，必须参数
            //   max: 150, // 值域最大值，必须参数
            //   calculable: true, // 是否启用值域漫游
            //   inRange: {
            //     color: ['#323c48', '#50a3ba', '#eac736', '#d94e5d']
            //     // 指定数值从低到高时的颜色变化
            //   },
            //   textStyle: {
            //     color: '#fff' // 值域控件的文本颜色
            //   }
            // }
          }
        let arr = [{
            name: '北京',
            emphasis: { label: { show: true } },
            value: [116.405285, 39.904989, 400]
          },
          {
            name: '江苏',
            emphasis: { label: { show: true } },
            value: [118.767413, 32.041544, 600]
          },
          {
            name: '河南',
            emphasis: { label: { show: true } },
            value: [113.665412, 34.757975, 300]
          }];
        option.series[0].data = arr;
        this.myChart.setOption(option, true);
        this.myChart.hideLoading();
        this.myChart.on('click',function (params) {
            console.log(params)
            if (params.componentSubType === 'effectScatter') {
                params.event.stop();
              console.log('999')
              return
            }
            if (that.provinces.indexOf(params.name) > -1) {
                import('../assets/province/' + params.name + '.json').then(mod => {
                  that.myChart.dispose();
                  that.drawChina(params.name,mod.default)
                })    
            }
            params.event.stop()
          })
          let offsetX,offsetY;
          this.myChart.on('mousedown',function (params) {
            offsetX = params.event.offsetX;
            offsetY = params.event.offsetY;
          })
          this.myChart.on('mouseup',function (params) {
            if (offsetX !== params.event.offsetX || offsetY !== params.event.offsetY) {
                that.isDrag = true;
            } else { 
                that.isDrag = false;
            }
          })
    },
    mapClick() {
        if (!this.isDrag) {
            this.myChart.dispose();
            this.drawChina('china', chinaJson.default);
        }
        this.isDrag = false;
    },
    pointColor(val) {
        if (val.data.value[2] > 500) {
            return 'red'
        }
        if (val.data.value[2] > 300 && val.data.value[2] < 500) {
            return 'yellow'
        }
        return 'green'
    }
  },
  mounted () {
    this.drawChina('china', chinaJson.default)
  }
}
</script>


<style scoped>
.myMap{
  height:1000px;
  width: 100%;
}
</style>
