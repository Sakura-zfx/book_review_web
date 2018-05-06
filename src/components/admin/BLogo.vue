<template>
  <div class="logo">
    <router-link to="/admin">
      <slot name="logo__img"></slot>
      <h3 class="link">{{name}}</h3>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'b-logo',
  props: ['name'],
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .link {
    color: #3080fe;
  }
</style>
