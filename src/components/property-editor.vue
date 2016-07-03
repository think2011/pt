<template>
  <div class="properties">
    <div v-for="(key,value) in moduleData">
      <input type="text" v-model="moduleData[key]">
    </div>
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
    vuex: {
      getters: {
        moduleData: ({render}) => render.current.data
      }
    }
  }
</script>
