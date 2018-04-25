<template>
  <div>
	   <card>
      <div slot="header" class="header-wrap">
        <h3>下月月供</h3>
        <h3>￥{{nextMonthPay | toFix}}</h3>
        <h3 class="total">
          <div class="total-left">
            剩余贷款：￥{{surplusReturn | toFix}}
          </div>
          <div class="total-right">
            剩余{{surplusMonth}}
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
          <h3>本金：{{calculationData.loanSum | toFix}}</h3>
          <h3>利息：{{calculationData.totalInterest | toFix}}</h3>
          <h3>利息浮动：16810.00</h3>
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
      nextMonthPay: 0,
      surplusReturn: 0,
      surplusMonth: '',
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
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value, index) {
              if (value < 10000) {
                return value
              } else {
                return [value / 10000, '万'].join('')
              }
            }
          }
        },
        series: [
          {
            name: '月供',
            type: 'line',
            data: []
          },
          {
            name: '月利息',
            type: 'line',
            data: []
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
            name: '还款比例',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 0, name: '本金'},
              {value: 0, name: '利息'},
              {value: 0, name: '利息浮动'}
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
    this.initEchart() // 扇形图初始化
    this.initProportionEchart() // 折线图初始化
  },
  activated () {
    let _this = this
    // 更新统计图数据
    if (this.calculationData.monthList) {
      this.myChart.setOption({
        xAxis: {
          data: _this.calculationData.monthList
        },
        series: [
          {
            name: '月供',
            data: _this.calculationData.monthReturnList
          },
          {
            name: '月利息',
            data: _this.calculationData.monthlyInterestList
          }
        ]
      })
      this.proportionEchart.setOption({
        series: [
          {
            name: '还款比例',
            data: [
              {value: _this.calculationData.loanSum, name: '本金'},
              {value: _this.calculationData.totalInterest, name: '利息'},
              {value: 16810.00, name: '利息浮动'}
            ]
          }
        ]
      })
    }

    let now = new Date()
    let nowTime = [now.getFullYear(), now.getMonth() + 1, '01'].join('/')
    let index = this.calculationData.monthList.indexOf(nowTime)
    index !== -1 ? this.nextMonthPay = this.calculationData.monthReturnList[index + 1] : this.nextMonthPay = 0
    index !== -1 ? this.surplusReturn = this.calculationData.monthReturnList.slice(index + 1).reduce((preVal, curVal) => {
      return preVal + curVal
    }) : this.surplusReturn = 0
    index !== -1 ? this.surplusMonth = `${parseInt((this.calculationData.month - (index + 1)) / 12)}年${((this.calculationData.month - (index + 1)) % 12) === 0 ? '' : parseInt((this.calculationData.month - (index + 1)) % 12)}月` : this.surplusMonth = 0
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
  height: 240px;
  margin-top: -60px;
  #tendency-echartBox, #proportion-echartBox {
    margin: 0 auto;
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