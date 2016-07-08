<template>
  <div>
    {{msg}} title {{componentData}}
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<script type="text/ecmascript-6">
  export default{
    props: ['componentData'],

    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
