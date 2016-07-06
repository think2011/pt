<template>
  <div class="properties">
    <h2>{{current.alias}}</h2>
    <div v-for="(key,value) in current.data">
      {{value.title}}<input type="text" v-model="value.value">
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
</style>

<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {
        current: ({render}) => render.current
      }
    }
  }
</script>
