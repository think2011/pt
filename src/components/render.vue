<template>
  <div drag-tag="modules" class="render-container">

    <div class="phone">
      <div class="head"></div>
      <div class="body">
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
      <div class="footer"></div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/lib/hotcss";

  .render-container {
    overflow-y: auto;
    .phone {
      width: 363px;
      margin:20px auto;

      .head {
        height: 78px;
        background: url("../assets/img/phone-head.png") no-repeat 0 0;
      }

      .body {
        min-height: 667px;
        padding: 0 14px;
        background: url("../assets/img/phone-middle.png") repeat-y;
      }

      .footer {
        height: 86px;
        background: url("../assets/img/phone-footer.png") no-repeat 0 0;
      }
    }

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
