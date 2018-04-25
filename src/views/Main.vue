<template>
  <div>
	   <card>
      <div slot="header" class="header-wrap">
        <h3>下月月供</h3>
        <h3>￥{{nextMonthPay | toFix}}</h3>
      </div>
      <div slot="content" class="card-demo-flex card-demo-content">
        <div class="vux-1px-r">
          <span>{{surplusCapital | toFix}}</span>
          <br/>
          剩余本金
        </div>
        <div class="vux-1px-r">
          <span>{{surplusInterest | toFix}}</span>
          <br/>
          剩余利息
        </div>
        <div class="vux-1px-r">
          <span>{{surplusReturn | toFix}}</span>
          <br/>
          剩余总额
        </div>
      </div>
    </card>
    <notice-bar></notice-bar>
    <card style="margin-top: 0px;">
      <div slot="content" class="card-demo-content card-content">
        <div class="cart-img">
          <img src="../assets/home.png" alt="">
        </div>
        <div class="cart-cont">
          <div class="cart-cont-up">广州萝岗某宅</div>
          <div class="cart-cont-down">
            <div class="cart-cont-down-date">剩余{{surplusMonth}}</div>
            <div class="cart-cont-down-total">￥{{calculationData.loanSum | toFix}}</div>
          </div>
        </div>
      </div>
    </card>
    <card style="margin-top: 0px;">
      <div slot="content" class="card-demo-content card-content">
        <div class="echart-wrap">
          <div id="echartBox"></div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { Divider, Card } from 'vux'
import {mapGetters} from 'vuex'
import NoticeBar from '../components/NoticeBar'

export default {
  components: {
    Card,
    Divider,
    NoticeBar
  },
  data () {
    return {
      nextMonthPay: 0,
      surplusReturn: 0,
      surplusCapital: 0,
      surplusInterest: 0,
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
      this.myChart = this.echarts.init(document.getElementById('echartBox'))
      this.myChart.setOption(this.options)
    }
  },
  mounted () {
    this.initEchart()
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
    }

    let now = new Date()
    let nowTime = [now.getFullYear(), now.getMonth() + 1, '01'].join('/')
    let index = this.calculationData.monthList.indexOf(nowTime)
    index !== -1 ? this.nextMonthPay = this.calculationData.monthReturnList[index + 1] : this.nextMonthPay = 0
    index !== -1 ? this.surplusReturn = this.calculationData.monthReturnList.slice(index + 1).reduce((preVal, curVal) => {
      return preVal + curVal
    }) : this.surplusReturn = 0
    index !== -1 ? this.surplusInterest = this.calculationData.monthlyInterestList.slice(index + 1).reduce((preVal, curVal) => {
      return preVal + curVal
    }) : this.surplusInterest = 0
    index !== -1 ? this.surplusMonth = `${parseInt((this.calculationData.month - (index + 1)) / 12)}年${((this.calculationData.month - (index + 1)) % 12) === 0 ? '' : parseInt((this.calculationData.month - (index + 1)) % 12)}月` : this.surplusMonth = 0
    let surplusCapitalStorage = window.localStorage.getItem('surplusCapitalStorage')
    index !== -1 ? (typeof this.calculationData.capital !== 'function' ? this.surplusCapital = Number(surplusCapitalStorage) : this.surplusCapital = this.calculationData.capital(index + 1).slice(index + 1).reduce((preVal, curVal) => {
      return preVal + curVal
    })) : this.surplusCapital = 0
    window.localStorage.setItem('surplusCapitalStorage', this.surplusCapital)
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.header-wrap {
  border-bottom: 1px solid #dad9dd;
  >h3 {
    font-size: 14px;
    text-align: left;
    padding: 6px 20px 0 20px;
    &:last-child {
      font-size: 18px;
    }
  }
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
.card-content {
  display: flex;
  .cart-img {
    color: #ececec;
    text-align: left;
    padding-left: 20px;
    width: 15%;
    margin: 6px auto;
    img {
      width: 40px;
      height: 40px;
      background-size: cover;
    }
  }
  .cart-cont {
    width: 85%;
    >div {
      margin: 6px 0;
    }
    .cart-cont-up {
      text-align: left;
      font-size: 14px;
    }
    .cart-cont-down {
      display: flex;
      justify-content: space-between;
      .cart-cont-down-date {
        text-align: left;
      }
      .cart-cont-down-total {
        text-align: right;
        padding-right: 20px;
      }
    }
  }
  .echart-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    height: 240px;
    margin-top: -50px;
    #echartBox {
      width: 100%;
      height: 100%;
    }
    .select-bar {
      width: 100px;
    }
  }
}
</style>