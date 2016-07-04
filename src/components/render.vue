<template>
  <div drag-tag="stage" class="stage">
    <!--  <component
        drag-tag="stage"
        index="{{$index}}"
        v-for="item in items"
        track-by="$index"
        :is="item.component">
      </component>-->

    {{modules}}
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .stage {
    flex: 1;
    padding: 0 50px;
  }
</style>

<script type="text/ecmascript-6">
  import modules from '../modules'

  //  let components = _.map(modules, (item) => ({[item.type]: item.component}))

  console.log(modules)

  export default{
    components,

    vuex: {
      getters: {
        modules: ({render}) => {
          console.log(render)
        }
      }
    }

  }
</script>
