<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-on:click="toHelloWorld" class="click-me">返回</div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      msg: 'Welcome to Your mobile-base-project App'
    }
  },
  methods: {
    toHelloWorld () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
h1, h2 {
  font-weight: normal;
}
.click-me {
  width: px2rem(120px);
  height: 30px;
  background-color: yellowgreen;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
</style>
