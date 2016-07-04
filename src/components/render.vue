<template>
  <div drag-tag="modules" class="render-container">
    <component
      drag-tag="module-{{$index}}"
      @click="editRenderItem(item)"
      index="{{$index}}"
      v-for="item in items"
      track-by="$index"
      :component-data.sync="item.data"
      :is="components[item.type]">
    </component>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/lib/hotcss";
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
