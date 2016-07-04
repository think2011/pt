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
    font-size: 23.4375px; // 相当于iphone6 375的尺寸
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
      flex: 1;
      background: #E5E5E5;
    }

    .properties {
      flex: 0 0 520px;
      background: #959595;
      border-left: 1px solid #B0B0B0;
    }
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

