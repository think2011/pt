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
    height: 100vh;
    padding-top: 32px;
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

    ready() {
      let mock = [
        {"type": "goods-poster", "data": {"time": 1467208634898}}
      ]

      _.each(mock, this.add)
    },

    methods: {
      drag(item) {
        this.dragModule = item
      },

      add({type, data = {}}) {
        let item = _.chain(this.modules).find({type}).cloneDeep().merge({data}).value()

        this.stage.push(item)
      },

      setCurrentModule(module){
        this.currentModule = module
      },

      save() {
        let modules = _.cloneDeep(this.stage).map((item) => {
          return {type: item.type, data: item.module.$data}
        })

        console.log(modules)
        console.log(JSON.stringify(modules))
      }
    },

    data() {
      return {
        showDrag     : false,
        stage        : [],
        dragModule   : {},
        currentModule: ''
      }
    }
  }
</script>

