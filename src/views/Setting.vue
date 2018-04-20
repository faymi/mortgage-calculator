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
      <span>贷款利率已经更新至2018年1月1日</span>
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
        let item = `${i}成`
        mortgageTendencyList.push(item)
      }
      return mortgageTendencyList.reverse()
    }
    let getMortgageYearList = year => {
      let mortgageYearList = []
      for (let i = 1; i <= year; i++) {
        let item = `${i}年（${12 * i}期）`
        mortgageYearList.push(item)
      }
      return mortgageYearList.reverse()
    }
    return {
      totalLoanAmount: '',
      loanCategory: 0,
      loanCategoryList: [{key: 0, value: '商业贷款'}, {key: 1, value: '公积金贷款'}, {key: 2, value: '组合型贷款'}],
      calculationMethod: 0,
      calculationMethodList: [{key: 0, value: '根据面积、单价计算'}, {key: 1, value: '根据贷款总额计算'}],
      mortgageTendency: getMortgageTendency(2, 8)[0], // 按揭成数
      mortgageTendencyList: getMortgageTendency(2, 8),
      mortgageYear: getMortgageYearList(25)[0], // 按揭年数
      mortgageYearList: getMortgageYearList(25),
      lendingRate: '基准利率', // 贷款利率
      lendingRateList: ['基准利率', '7折', '85折', '88折', '9折', '95折', '1.05倍', '1.1倍', '1.2倍', '1.3倍'],
      lendingRateIpt: 4.9,
      fundRate: '基准利率',
      fundRateList: ['基准利率', '7折', '85折', '88折', '9折', '95折', '1.05倍', '1.1倍', '1.2倍', '1.3倍'],
      fundRateIpt: 3.29,
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
      console.log(this.monthlyReturnB(3000000, 0.0747, 240, 0.8))
    },
    // 等额本息还款
    // 计划月还款额 =（贷款本金 × 月利率 ×（1 + 月利率）^ 还款月数）÷（（1+月利率）^ 还款月数 － 1）
    monthlyReturnA (total, rate, month) {
      let monthlyRate = rate / 12 // 月利率
      return total * monthlyRate * Math.pow((1 + monthlyRate), month) / (Math.pow((1 + monthlyRate), month) - 1)
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
      let interestRate
      let firstPay = total * (1 - tendency)
      let firstMonthPay
      let loanSum = total - firstPay
      for (let i = 0; i < month; i++) {
        let hadReturn = i * loanSum / month
        allTotalList.push((loanSum / month) + (loanSum - hadReturn) * monthlyRate)
        let item = {}
        item.monthlyReturn = (loanSum / month) + (loanSum - hadReturn) * monthlyRate
        item.month = i + 1
        monthReturnList.push(item)
      }
      allTotal = allTotalList.reduce((preVal, curVal) => {
        return preVal + curVal
      })
      interestRate = allTotal - loanSum
      firstMonthPay = monthReturnList[0].monthlyReturn

      return {
        firstPay, // 首付
        firstMonthPay, // 首月月供
        allTotal, // 还款总额
        interestRate, // 支付总利息
        loanSum, // 贷款总额
        monthReturnList
      }
    }
  },
  watch: {
    loanCategory (newVal, oldVal) {
      this.combinatorialShow = newVal === 2
    },
    calculationMethod (newVal, oldVal) {
      this.calculationByTotal = newVal === 1
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
