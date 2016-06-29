<template>
  <header>
    <div class="title">T</div>
    <button @click="save">save</button>
  </header>

  <div class="container">
    <ul class="toolbar">
      <li v-for="item in modules">
        <button @click="add({type:item.type})">{{item.alias}}</button>
      </li>
    </ul>

    <div class="stage">
      <component
        @click="edit(item)"
        :module-instance="item"
        v-for="item in stage"
        track-by="$index"
        :is="item.component">
      </component>
    </div>

    <property-editor :module-instance="currentModule">
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
      box-shadow: 0 0 10px #ccc;
      display: flex;
      flex-flow: wrap;
      align-content: flex-start;
      text-align: center;
      padding: 20px 0 0 0;

      li {
        margin: 3px 0;
        flex: 0 0 33%;
      }
    }

    .stage {
      flex: 1;
      padding: 0 50px;
    }

    .properties {
      flex: 0 0 300px;
      box-shadow: 0 0 10px #ccc;
    }

  }
</style>

<script type="text/ecmascript-6">
  import modules from './modules'
  import propertyEditor from './components/property-editor.vue'

  let components = {}
  modules.forEach((item) => components[item.type] = item.module)

  export default {
    components: _.merge(components, {
      propertyEditor
    }),

    ready() {
      let mock = [{"type": "goods.poster", "data": {"time": 1467208634898}}, {
        "type": "goods.poster",
        "data": {"time": 1467208635221}
      }, {"type": "goods.poster", "data": {"time": 1467208635404}}, {
        "type": "goods.poster",
        "data": {"time": 1467208635580}
      }, {"type": "goods.poster", "data": {"time": 1467208635748}}, {
        "type": "goods.poster",
        "data": {"time": 1467208639951}
      }, {"type": "goods.poster", "data": {"time": 1467208640253}}, {
        "type": "goods.poster",
        "data": {"time": 11111111111}
      }, {"type": "goods.poster", "data": {"time": 11111111111}}, {
        "type": "goods.poster",
        "data": {"time": 11111111111}
      }, {"type": "goods.poster", "data": {"time": 11111111111}}]

      _.each(mock, this.add)
    },

    methods: {
      add({type, data = {}}) {
        let item = _.chain(this.modules).find({type}).cloneDeep().merge({data}).value()

        this.stage.push(item)
      },
      edit(item){
        this.currentModule = item.module
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
        stage        : [],
        modules      : modules,
        currentModule: ''
      }
    }
  }
</script>

