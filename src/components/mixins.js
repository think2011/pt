export let initModue = {
  props: {
    moduleInstance: {
      type   : Object,
      default: () => {
        return {}
      }
    }
  },
  ready() {
    this.moduleInstance.module = this
    _.merge(this.$data, this.moduleInstance.data)
  }
}
