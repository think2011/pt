<template>
  <div class="properties">
    <input type="text" v-model="moduleInstance.time">
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<script type="text/ecmascript-6">
  export default{
    props: [
      'moduleInstance'
    ],

    data(){
      return {}
    }
  }
</script>
