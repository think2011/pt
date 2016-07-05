<template>
  <div class="render-container">

    <div
      class="phone">
      <div class="head"></div>
      <div drag-tag="modules"
           :class="{active: activeModules}"
           class="body">
        <div
          transition="zoom"
          stagger="1000"
          class="animated"
          v-for="item in items">
          <component
            drag-tag="module-{{$index}}"
            @click="editRenderItem(item)"
            index="{{$index}}"
            class="component"
            :class="[
          {
           active: activeModule.dragTag === 'module-' + $index,
           'is-current': currentModule === item
          },
           activeModule.position
          ]"
            :component-data.sync="item.data"
            :is="components[item.type]">
          </component>
        </div>
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
      margin: 20px auto;
      .head {
        height: 78px;
        background: url("../assets/img/phone-head.png") no-repeat 0 0;
      }

      .body {
        &.active {
          outline: 2px solid seagreen;
        }

        min-height: 667px;
        padding: 0 14px;
        background: url("../assets/img/phone-middle.png") repeat-y;

        .component {
          transition: .3s;

          &.active.top {
            &:before {
              width: 98%;
              height: 20px;
              margin: 0 auto;
              font-size: 14px;
              text-align: center;
              display: block;
              content: '放在这';
              border: 2px dashed #b5b5b5;
            }
          }
          &.active.bottom {
            &:after {
              @extend .component.active.top:before
            }
          }
        }
      }

      .footer {
        height: 86px;
        background: url("../assets/img/phone-footer.png") no-repeat 0 0;
      }
    }

  }
</style>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {components, modules} from '../modules'
  import {editRenderItem} from '../vuex/actions'

  Vue.transition('zoom', {
    enterClass: 'bounceIn',
    leaveClass: 'fadeOutDown'
  })

  export default{
    components,

    vuex: {
      getters: {
        items        : ({render}) => {
          return render.items
        },
        activeModules: ({render}) => {
          return render.dragInfo.dragTag === 'modules'
        },
        activeModule : ({render}) => {
          return render.dragInfo
        },
        currentModule: ({render}) => render.current
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
