<template>
  <header>
    <div class="title">T</div>
    <button @click="save">save</button>
  </header>
  <div class="container">
    <ul class="toolbar">
      <li
        @mousedown="drag(item)"
        v-for="item in modules">
        <button>{{item.alias}}</button>
      </li>
    </ul>

    <drag-module
      :drag-module.sync="dragModule"></drag-module>

    <contents-editor
      :items="stage"
      @current-module="setCurrentModule">
    </contents-editor>

    <property-editor
      :module-instance="currentModule">
    </property-editor>
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
    padding-top: 38px;

    .toolbar {
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
  }
</style>

<script type="text/ecmascript-6">
  import {components, modules} from './modules'
  import contentsEditor from './components/contents-editor.vue'
  import propertyEditor from './components/property-editor.vue'
  import dragModule from './components/module-drag.vue'

  export default {
    components: _.merge(components, {
      propertyEditor,
      contentsEditor,
      dragModule
    }),

    ready() {
      let mock = [{"type": "goods-poster", "data": {"time": 1467208634898}}]

      _.each(mock, this.add)
    },

    methods: {
      drag(item) {
        this.dragModule = item
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
        modules      : modules,
        dragModule   : {},
        currentModule: ''
      }
    }
  }
</script>

