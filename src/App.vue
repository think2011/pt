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
    min-height: 100vh;
    padding-top: 38px;
  }
</style>

<script type="text/ecmascript-6">
  import store from './vuex/store'
  import moduleBox from './components/Module-box.vue'
  import render from './components/Render.vue'
  import propertyEditor from './components/Property-editor.vue'

  export default {
    store,

    components: {
      propertyEditor,
      moduleBox,
      render
    },

    vuex: {
      getters: {
        renderData: ({render}) => render.items
      }
    },

    methods: {
      save() {
        console.log(JSON.stringify(this.renderData))
      }
    }
  }
</script>

