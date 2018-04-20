<template>
  <div
    class="notice-bar"
    v-show="showNoticeBar"
    :style="barStyle">
    <div class="notice-bar__content-wrap" ref="contentWrap">
      <div>
        <slot>{{ text }}</slot>
      </div>
    </div>
    <x-icon type="ios-close" size="20" @click="showNoticeBar = false"></x-icon>
  </div>
</template>

<script>
export default {
  name: 'NoticeBar',
  props: {
    text: {
      type: String,
      default: '通告。。。'
    },
    color: String,
    background: String
  },
  data () {
    return {
      showNoticeBar: true
    }
  },
  computed: {
    barStyle () {
      return {
        color: this.color,
        background: this.background
      }
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.notice-bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  color: #f60;
  padding: 6px 15px;
  font-size: 12px;
  line-height: 1.5;
  position: relative;
  background-color: #fff7cc;
}
.vux-x-icon {
  position: absolute;
  right: 10px;
  fill: #f60;
}
</style>
