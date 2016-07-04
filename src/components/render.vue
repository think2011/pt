<template>
  <div drag-tag="stage" class="stage">
    <component
      drag-tag="stage"
      @click="editRenderItem(item)"
      index="{{$index}}"
      v-for="item in items"
      track-by="$index"
      :component-data.sync="item.data"
      :is="components[item.type]">
    </component>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .stage {
    flex: 1;
    padding: 0 50px;
  }
</style>

<script type="text/ecmascript-6">
  import {components, modules} from '../modules'
  import {editRenderItem} from '../vuex/actions'

  export default{
    components,

    vuex: {
      getters: {
        items: ({render}) => {
          return render.items
        }
      },

      actions: {
        editRenderItem
      }
    },

    data: () => {
      return {
        modules,
        components
      }
    }
  }
</script>
