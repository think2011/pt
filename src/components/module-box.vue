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

<style lang="scss" rel="stylesheet/scss" scoped>
  .module-box {
    flex: 0 0 300px;
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
    text-align: center;
    padding: 20px 0 0 0;
    background: #E9E9E9;
    border-right: 1px solid #B0B0B0;

    li {
      margin: 3px 0;
      flex: 0 0 33%;
    }
  }
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
