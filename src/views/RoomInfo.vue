<template>
  <div>
	   <card>
      <div slot="header" class="header-wrap">
        <h3>下月月供</h3>
        <h3>￥{{calculationData.monthlyPay}}</h3>
        <h3 class="total">
          <div class="total-left">
            剩余贷款：￥{{calculationData.allTotal}}
          </div>
          <div class="total-right">
            剩余{{parseInt(calculationData.month / 12)}}年{{parseInt(calculationData.month % 12) === 0 ? '' : parseInt(calculationData.month % 12) + '月'}}
          </div>
        </h3>
      </div>
    </card>
    <card style="margin-top: 0px;">
      <div slot="header">
        <div class="tendency-header">还款趋势</div>
      </div>
      <div slot="content" class="card-demo-content card-content">
        <div class="echart-wrap">
          <div id="tendency-echartBox"></div>
        </div>
      </div>
    </card>
  <card style="margin-top: 0px;">
    <div slot="content">
      <div class="tendency-header">还款比例</div>
      <div class="proportion">
        <div class="proportion-left">
          <h3>本金：{{calculationData.loanSum}}</h3>
          <h3>利息：{{calculationData.totalInterest}}</h3>
          <h3>利息浮动：xxx</h3>
        </div>
        <div class="proportion-right">
          <div class="echart-wrap">
            <div id="proportion-echartBox"></div>
          </div>
        </div>
      </div>
    </div>
  </card>
  </div>
</template>
<script>
import { Divider, Card } from 'vux'
import {mapGetters} from 'vuex'

export default {
  components: {
    Card,
    Divider
  },
  data () {
    return {
      myChart: {},
      options: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['']
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      proportionEchart: {},
      proportionEchartOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      calculationData: 'calculationData'
    })
  },
  methods: {
    initEchart () {
      this.myChart = this.echarts.init(document.getElementById('tendency-echartBox'))
      this.myChart.setOption(this.options)
    },
    initProportionEchart () {
      this.proportionEchart = this.echarts.init(document.getElementById('proportion-echartBox'))
      this.proportionEchart.setOption(this.proportionEchartOptions)
    }
  },
  mounted () {
    this.initEchart()
    this.initProportionEchart()
  },
  activated () {
    let _this = this
    if (this.calculationData.monthList) {
      this.myChart.setOption({
        xAxis: {
          data: _this.calculationData.monthList
        },
        series: [
          {
            name: '月供',
            type: 'line',
            stack: '总量',
            data: _this.calculationData.monthReturnList
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.header-wrap {
  border-bottom: 1px solid #dad9dd;
  >h3 {
    font-size: 14px;
    text-align: left;
    padding: 6px 20px 0 20px;
    &:nth-child(2) {
      font-size: 16px;
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    padding: 6px 20px;
    .total-left {
      text-align: left;
    }
    .total-right {
      text-align: right;
    }
  }
}
.tendency-header {
  font-size: 16px;
  padding: 0 20px;
  text-align: left;
}
.echart-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  height: 240px;
  margin-top: -60px;
  #tendency-echartBox, #proportion-echartBox {
    width: 100%;
    height: 100%;
  }
  .select-bar {
    width: 100px;
  }
}
.proportion {
  display: flex;
  justify-content: space-between;
  .proportion-left {
    width: 30%;
    text-align: left;
    padding: 0 0 0 20px;
    h3 {
      padding: 4px 0;
    }
  }
  .proportion-right {
    width: 100%;
  }
}
</style>