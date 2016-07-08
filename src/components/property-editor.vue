<template>
  <div class="properties">
    <h2>{{current.alias}}</h2>
    <div v-for="(key,value) in current.data">
      <component
        index="{{$index}}"
        :component-data.sync="value"
        :is="value.type">
      </component>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
</style>

<script type="text/ecmascript-6">
  import components from '../editors'

  console.log(components)

  export default{
    components,

    vuex: {
      getters: {
        current: ({render}) => render.current
      }
    },

    data: () => {
      return {
        components
      }
    }
  }
</script>
