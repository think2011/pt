<template>
  <div class="properties">
    <div v-for="(key,value) in moduleData">
      <input type="text" v-model="moduleData[key]">
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
</style>

<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {
        moduleData: ({render}) => render.current.data
      }
    }
  }
</script>
