<template>
  <div
    class="notice-bar"
    :class="{'closed': !showNoticeBar}"
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
  // padding: 6px 15px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 1.5;
  position: relative;
  background-color: #fff7cc;
  overflow-y: hidden;
  max-height: 30px;
  line-height: 30px;
  transition-property: all;
	transition-duration: .5s;
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.closed {
  max-height: 0;
}
.vux-x-icon {
  position: absolute;
  right: 10px;
  top: 5px;
  fill: #f60;
}
</style>
