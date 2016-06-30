<template>
  <div class="properties">
    <input type="text" v-model="moduleInstance.time">
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .properties {
    flex: 0 0 300px;
    background: #E3E3E3;
    border-left: 1px solid #B0B0B0;
  }
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
