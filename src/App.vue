<template>
  <div id="app">
    <drawer
    width="200px;"
    :show.sync="drawerVisibility"
    show-mode="overlay"
    placement="left"
    :drawer-style="{'background-color':'#35495e', width: '150px'}">

      <!-- drawer content -->
      <div slot="drawer">
        <group class="group-wrap">
          <cell title="首页" link="/" @click.native="drawerVisibility = false">
          </cell>
          <cell title="房屋信息" link="/roomInfo" @click.native="drawerVisibility = false">
          </cell>
          <cell title="设置" link="/setting" @click.native="drawerVisibility = false">
          </cell>
        </group>
      </div>
      <view-box ref="viewBox">
        <x-header slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        :transition="headerTransition"
        @on-click-more="onClickMore">
          <span v-if="$route.path === '/' || $route.path === '/roomInfo' || $route.path === '/setting'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>
        <transition :name="transitionName">
          <keep-alive>
            <router-view class="child-view"></router-view>
          </keep-alive>
        </transition>
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Drawer, XHeader, Group, Cell, ViewBox } from 'vux'
export default {
  name: 'app',
  components: {
    Drawer,
    XHeader,
    Group,
    Cell,
    ViewBox
  },
  data () {
    return {
      showMenu: false,
      drawerVisibility: false,
      transitionName: 'slide-left',
      headerTransition: 'vux-header-fade-in-right'
    }
  },
  methods: {
    onClickMore () {
      this.showMenu = true
    }
  },
  computed: {
    leftOptions () {
      return {
        showBack: this.$route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    title () {
      if (this.$route.path === '/') return '首页'
      if (this.$route.path === '/roomInfo') return '房屋信息'
      if (this.$route.path === '/setting') return '设置'
    }
  },
  mounted () {
    // IOS绑定touchstart事件才能使元素的:active生效
    document.body.addEventListener('touchstart', function () {})
  },
  watch: {
    '$route' (to, from) {
      const list = ['', 'roomInfo', 'setting']
      const toDepth = to.path.split('/')
      const fromDepth = from.path.split('/')
      this.transitionName = list.indexOf(toDepth[1]) < list.indexOf(fromDepth[1]) ? 'slide-right' : 'slide-left'
      this.headerTransition = list.indexOf(toDepth[1]) < list.indexOf(fromDepth[1]) ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
</style>

<style lang="scss">
@import './assets/css/function.scss';
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #393939;
  .container {
		flex: 1;
		overflow: auto;
    overflow-x: hidden;
  }
  /* 上面是为了保证滑动的时候不出现抖动情况 */
  .child-view {
    position: absolute;
    left:0;
    top: px2rem(92px);
    width: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* 当child-view的内容过多时会撑开child-view使得内部能够滚动 */
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    // transition-delay: .5s;
    // -webkit-transition-delay: .5s;
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    // transition-delay: .5s;
    // -webkit-transition-delay: .5s;
  }
  .slide-enter-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }
  .slide-leave-active {
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .group-wrap {
    margin-top: px2rem(92px);
  }
  .menu-title {
    color: #888;
  }
}
</style>
