<template>
  <div class="setting">
    <group>
      <popup-radio style="text-align: left;" v-model="loanCategory" title="贷款类别" :options="loanCategoryList"></popup-radio>
      <popup-radio v-show="!combinatorialShow" style="text-align: left;" v-model="calculationMethod" title="计算方式" :options="calculationMethodList"></popup-radio>
      <x-input v-show="!combinatorialShow && !calculationByTotal" style="text-align: left;" type="number" required text-align="right" title="房屋单价" v-model="roomPrice">
        <span slot="right">元/平米</span>
      </x-input>
      <x-input v-show="!combinatorialShow && !calculationByTotal" style="text-align: left;" type="number" required text-align="right" title="房屋面积" v-model="roomArea">
        <span slot="right">平方米</span>
      </x-input>
      <x-input v-show="!combinatorialShow && calculationByTotal" style="text-align: left;" type="number" required text-align="right" title="贷款总额" v-model="totalLoanAmount">
        <span slot="right">万</span>
      </x-input>
      <popup-radio v-show="!combinatorialShow && !calculationByTotal" style="text-align: left;" v-model="mortgageTendency" title="按揭成数" :options="mortgageTendencyList"></popup-radio>
      <x-input v-show="combinatorialShow" style="text-align: left;" type="number" required text-align="right" title="商业贷款额" v-model="commercialLoanAmount">
        <span slot="right">万</span>
      </x-input>
      <cell-box v-show="combinatorialShow || loanCategory === 0" style="position:relative;padding:0;">
        <popup-radio style="text-align: left; width: 70%;" v-model="lendingRate" title="商贷利率" :options="lendingRateList"></popup-radio>
        <x-input style="position:absolute;right:0;width:15%;color: #999999;" text-align="right" required type="number" :show-clear='false' v-model="lendingRateIpt">
          <span slot="right">%</span>
        </x-input>
      </cell-box>
      <x-input v-show="combinatorialShow" style="text-align: left;" type="number" required text-align="right" title="公积金贷款额" v-model="fundLoanAmount">
        <span slot="right">万</span>
      </x-input>
      <cell-box v-show="combinatorialShow || loanCategory === 1" style="position:relative;padding:0;">
        <popup-radio style="text-align: left; width: 70%;" v-model="fundRate" title="公积金利率" :options="fundRateList"></popup-radio>
        <x-input style="position:absolute;right:0;width:15%;color: #999999;" text-align="right" required type="number" :show-clear='false' v-model="fundRateIpt">
          <span slot="right">%</span>
        </x-input>
      </cell-box>
      <popup-radio style="text-align: left;" v-model="mortgageYear" title="按揭年数" :options="mortgageYearList"></popup-radio>
      <popup-radio style="text-align: left;" v-model="repaymentType" title="还款方式" :options="repaymentTypeList"></popup-radio>
    </group>
    <div class="rate-tips">
      <span style="color: #f74c31">*</span>
      <span>贷款利率已经更新至2015年10月24日</span>
    </div>
    <div class="button-cls">
      <x-button type="primary" @click.native="save">保存</x-button>
      <x-button :disabled="resetDisabled">重置</x-button>
    </div>
  </div>
</template>

<script>
import { PopupRadio, Group, CellBox, XInput, CheckIcon, XButton } from 'vux'

export default {
  name: 'Setting',
  components: {
    Group,
    PopupRadio,
    CellBox,
    XInput,
    CheckIcon,
    XButton
  },
  data () {
    let getMortgageTendency = (start, end) => {
      let mortgageTendencyList = []
      for (let i = start; i <= end; i = i + 0.5) {
        let item = {}
        item.value = `${i}成`
        item.key = i * 0.1
        mortgageTendencyList.push(item)
      }
      return mortgageTendencyList.reverse()
    }
    let getMortgageYearList = year => {
      let mortgageYearList = []
      for (let i = 1; i <= year; i++) {
        let item = {}
        item.value = `${i}年（${12 * i}期）`
        item.key = 12 * i
        mortgageYearList.push(item)
      }
      return mortgageYearList.reverse()
    }
    let getRateList = () => {
      return [{
        value: '基准利率',
        key: '1'
      }, {
        value: '7折',
        key: '0.7'
      }, {
        value: '85折',
        key: '0.85'
      }, {
        value: '88折',
        key: '0.88'
      }, {
        value: '9折',
        key: '0.9'
      }, {
        value: '95折',
        key: '0.95'
      }, {
        value: '1.05倍',
        key: '1.05'
      }, {
        value: '1.1倍',
        key: '1.1'
      }, {
        value: '1.2倍',
        key: '1.2'
      }, {
        value: '1.3倍',
        key: '1.3'
      }]
    }
    return {
      totalLoanAmount: '',
      loanCategory: 0,
      loanCategoryList: [{key: 0, value: '商业贷款'}, {key: 1, value: '公积金贷款'}, {key: 2, value: '组合型贷款'}],
      calculationMethod: 0,
      calculationMethodList: [{key: 0, value: '根据面积、单价计算'}, {key: 1, value: '根据贷款总额计算'}],
      mortgageTendency: getMortgageTendency(2, 8)[0].key, // 按揭成数
      mortgageTendencyList: getMortgageTendency(2, 8),
      mortgageYear: getMortgageYearList(25)[0].key, // 按揭年数
      mortgageYearList: getMortgageYearList(25),
      lendingRate: getRateList()[0].key, // 贷款利率
      lendingRateList: getRateList(),
      lendingRateIpt: 4.9,
      lendingBaseRate: 4.9,
      fundRate: getRateList()[0].key,
      fundRateList: getRateList(),
      fundRateIpt: 3.25,
      fundBaseRate: 3.25,
      roomPrice: '',
      roomArea: '',
      commercialLoanAmount: '',
      combinatorialShow: false,
      fundLoanAmount: '',
      repaymentType: 0,
      repaymentTypeList: [{key: 0, value: '等额本息'}, {key: 1, value: '等额本金'}],
      resetDisabled: true,
      calculationByTotal: false
    }
  },
  methods: {
    save () {
      let total
      let rate
      let month
      let tendency
      total = !this.combinatorialShow && this.calculationByTotal ? this.totalLoanAmount * 10000 : this.roomPrice * this.roomArea
      rate = (this.combinatorialShow || this.loanCategory === 0) ? this.lendingRateIpt * 0.01 : this.fundRateIpt * 0.01
      month = this.mortgageYear
      tendency = !this.combinatorialShow && this.calculationByTotal ? 1 : this.mortgageTendency
      let monthList = []
      let now = new Date()
      let nowYear = now.getFullYear()
      let nowMonth = now.getMonth()
      for (let i = 0; i < month; i++) {
        nowMonth++
        if (nowMonth > 12) {
          nowYear++
          nowMonth = 1
        }
        monthList.push([nowYear, nowMonth, '01'].join('/'))
      }

      let mainData = {}
      if (this.repaymentType === 0) { // 等额本息
        mainData = this.monthlyReturnA(total, rate, month, tendency)
      } else { // 等额本金
        mainData = this.monthlyReturnB(total, rate, month, tendency)
      }
      mainData.monthList = monthList
      this.$store.dispatch('setCalculationData', mainData)
      this.$router.push({path: '/roomInfo'})
    },
    // 等额本息还款
    // 计划月还款额 =（贷款本金 × 月利率 ×（1 + 月利率）^ 还款月数）÷（（1+月利率）^ 还款月数 － 1）
    monthlyReturnA (total, rate, month, tendency = 1) {
      let monthlyRate = rate / 12 // 月利率
      let firstPay = total * (1 - tendency)
      let loanSum = total - firstPay
      let monthlyPay = loanSum * monthlyRate * Math.pow((1 + monthlyRate), month) / (Math.pow((1 + monthlyRate), month) - 1)
      let allTotal = monthlyPay * month
      let totalInterest = allTotal - loanSum
      let monthReturnList = new Array(month).fill(Math.round(monthlyPay))

      return {
        month,
        firstPay: Math.round(firstPay), // 首付
        monthlyPay: Math.round(monthlyPay), // 每月月供
        allTotal: Math.round(allTotal), // 还款总额
        totalInterest: Math.round(totalInterest), // 支付总利息
        loanSum: Math.round(loanSum), // 贷款总额
        monthReturnList
      }
    },
    // 等额本金还款
    // 计划月还款额 =（贷款本金 ÷ 还款月数）+ （贷款本金 - 累计已还本金）× 月利率
    // 累计已还本金 = 已经归还贷款的月数 × 贷款本金 ÷ 还款月数
    // total: 贷款本金 rate：年利率 month：还款月数 tendency：按揭成数
    monthlyReturnB (total, rate, month, tendency = 1) {
      let monthlyRate = rate / 12 // 月利率
      let allTotalList = []
      let monthReturnList = [] // 月供数组
      let allTotal
      let totalInterest
      let firstPay = total * (1 - tendency)
      let firstMonthPay
      let loanSum = total - firstPay
      for (let i = 0; i < month; i++) {
        let hadReturn = i * loanSum / month
        allTotalList.push(Math.round((loanSum / month) + (loanSum - hadReturn) * monthlyRate))
        let item = {}
        item.monthlyReturn = (loanSum / month) + (loanSum - hadReturn) * monthlyRate
        item.month = i + 1
        monthReturnList.push(item)
      }
      allTotal = allTotalList.reduce((preVal, curVal) => {
        return preVal + curVal
      })
      totalInterest = allTotal - loanSum
      firstMonthPay = monthReturnList[0].monthlyReturn

      return {
        month,
        firstPay: Math.round(firstPay), // 首付
        firstMonthPay: Math.round(firstMonthPay), // 首月月供
        allTotal: Math.round(allTotal), // 还款总额
        totalInterest: Math.round(totalInterest), // 支付总利息
        loanSum: Math.round(loanSum), // 贷款总额
        monthReturnList: allTotalList
      }
    }
  },
  watch: {
    loanCategory (newVal, oldVal) {
      this.combinatorialShow = newVal === 2
    },
    calculationMethod (newVal, oldVal) {
      this.calculationByTotal = newVal === 1
    },
    lendingRate (newVal, oldVal) {
      this.lendingRateIpt = this.lendingBaseRate * newVal
    },
    fundRate (newVal, oldVal) {
      this.fundRateIpt = this.fundBaseRate * newVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.button-cls {
  width: 80%;
  margin: 10px auto;
}
.rate-tips {
  text-align: left;
  padding-left: 20px;
  margin-top: 4px;
}
</style>
