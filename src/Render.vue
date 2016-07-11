<template>
  <render-client :items="items"></render-client>
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

    init() {
      document.title = window.DATA.title
    },

    data: () => {
      return {
        items: window.DATA.items
      }
    }
  }
</script>
