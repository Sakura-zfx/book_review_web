<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/normalize.scss';
@import './assets/scss/reset.scss';
@import './assets/scss/iconfont/iconfont.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 850px;
  .score {
    font-size: 20px;
    color: #FF6600;
    font-style: italic;
  }
}
</style>
