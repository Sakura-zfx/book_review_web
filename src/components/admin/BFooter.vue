<template>
  <div class="b__footer">
    <b-logo name="图书管理后台"></b-logo>
    <p class="intro">© 2018 code by sakura-zfx</p>
  </div>
</template>
<script>
import BLogo from './BLogo'
export default {
  name: 'b-footer',
  components: {
    BLogo
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  .b__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px 20px;
    .intro {
      margin-left: 30px;
    }
  }
</style>
