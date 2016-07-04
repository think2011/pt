<template>
  <ul class="module-box">
    <li
      @mousedown="drag(item)"
      v-for="item in modules">
      <button>{{item.alias}}</button>
    </li>
  </ul>

  <module-drag
    :drag-module.sync="dragModule">
  </module-drag>
</template>

<style lang="scss" rel="stylesheet/scss">

</style>

<script type="text/ecmascript-6">
  import {modules} from '../modules'
  import moduleDrag from './module-drag.vue'

  export default{
    components: {
      moduleDrag
    },

    methods: {
      drag(item) {
        this.dragModule = item
      }
    },

    data() {
      return {
        modules,
        dragModule: {}
      }
    }
  }
</script>
