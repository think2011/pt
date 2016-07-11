<template>
  <component
    v-for="item in items"
    index="{{$index}}"
    :is="components[item.type]">
  </component>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/lib/hotcss";

  body {
    width: 16rem;
    margin: 0 auto;
  }
</style>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {components, modules} from '../modules'
  import '../assets/lib/hotcss'

  export default{
    components,

    created () {
      document.title = this.title
    },

    vuex: {
      getters: {
        title: ({render}) => render.title,
        items: ({render}) => render.items
      }
    },

    data: () => {
      return {
        modules,
        components
      }
    }
  }
</script>

