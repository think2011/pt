<template>
  <render-client></render-client>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  html, body {
    margin: 0;
    padding: 0;
  }
</style>

<script type="text/ecmascript-6">
  import store from './vuex/store'
  import renderClient from './components/render-client.vue'
  import {
    addRenderItem,
  } from './vuex/actions'

  export default {
    store,

    components: {
      renderClient
    },

    ready (){
      // TODO ZH 16/7/6
      this.addRenderItem('goods-singe')
    },

    vuex: {
      getters: {
        renderData: ({render}) => render.items
      },
      actions: {
        addRenderItem
      }
    }
  }
</script>
