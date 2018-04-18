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

    <br>
  </div>
</template>
<script>
import { Divider, Card } from 'vux'

export default {
  components: {
    Card,
    Divider
  },
  data () {
    return {

    }
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
    padding: 4px 20px;
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
</style>