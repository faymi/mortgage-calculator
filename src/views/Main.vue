<template>
  <div>
	   <card>
      <div slot="header" class="header-wrap">
        <h3>下月月供</h3>
        <h3>￥10000.00</h3>
      </div>
      <div slot="content" class="card-demo-flex card-demo-content">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          剩余本金
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          剩余利息
        </div>
        <div class="vux-1px-r">
          <span>0</span>
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
            <div class="cart-cont-down-date">剩余3年8月</div>
            <div class="cart-cont-down-total">￥10000.00</div>
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
import NoticeBar from '../components/NoticeBar'

export default {
  components: {
    Card,
    Divider,
    NoticeBar
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
      }
    }
  },
  methods: {
    initEchart () {
      this.myChart = this.echarts.init(document.getElementById('echartBox'))
      this.myChart.setOption(this.options)
    }
  },
  mounted () {
    this.initEchart()
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