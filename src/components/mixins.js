export let initModue = {
  props: ['moduleInstance'],
  ready() {
    this.moduleInstance.module = this
    _.merge(this.$data, this.moduleInstance.data)
  }
}
