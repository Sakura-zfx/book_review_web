export default {
  data () {
    return {
      userId: +this.$Cookie.get('userId') || 0,
      userName: this.$Cookie.get('userName') || '',
      userRole: +this.$Cookie.get('userRole')
    }
  }
}