<template>
  <header>
    <div class="title">T</div>
    <button @click="save">save</button>
  </header>

  <div class="container">
    <module-box></module-box>

    <render></render>

    <property-editor></property-editor>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  header {
    width: 100%;
    color: #fff;
    background: #444;
    padding: 0 30px;
    position: absolute;
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 32px;
    }
  }

  .container {
    display: flex;
    height: 100%;
    padding-top: 38px;

    .module-box {
      flex: 0 0 240px;
      background: #959595;
      border-right: 1px solid #B0B0B0;

      li {
        margin: 30px;
      }
    }

    .render-container {
      min-width: 470px;
      flex: 1;
      background: #E5E5E5;
    }

    .properties {
      flex: 0 0 500px;
      background: #959595;
      border-left: 1px solid #B0B0B0;
    }
  }
</style>

<script type="text/ecmascript-6">
  import store from './vuex/store'
  import render from './components/render.vue'
  import moduleBox from './components/module-box.vue'
  import propertyEditor from './components/property-editor.vue'
  import {
    addRenderItem,
  } from './vuex/actions'

  export default {
    store,

    components: {
      propertyEditor,
      moduleBox,
      render
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
    },

    methods: {
      save() {
        console.log(JSON.stringify(this.renderData))
      }
    }
  }
</script>

