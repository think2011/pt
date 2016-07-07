<template>
  <div @click="blurRenderItem" class="render-container">
    <input type="text" v-model="render.title">

    <div>
      <div drag-tag="modules"
           :class="{active: activeModules}"
           class="body">
        <div
          transition="fadeIn"
          stagger="1000"
          class="animated item"
          :class="{'current': currentModule === item}"
          v-for="item in items">
          <div class="actions">
            <button @click="del(item)">x</button>
          </div>
          <component
            drag-tag="module-{{$index}}"
            @click="editRenderItem(item)"
            index="{{$index}}"
            class="component"
            :class="[{active: activeModule.dragTag === 'module-' + $index}, activeModule.position]"
            :component-data.sync="item.data"
            :is="components[item.type]">
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .render-container {
    overflow-y: auto;

    .body {
      width: 403px;
      min-height: 200px;
      background: #fff;
      margin: 20px auto 30px auto;
      user-select: none;

      &.active {
        outline: 2px solid seagreen;
      }

      .item {
        cursor: pointer;
        position: relative;
        animation-duration: .4s;

        &.current {
          outline: 2px solid seagreen;
          z-index: 999999;

          .actions {
            position: absolute;
            right: -30px;
            top: 0;
            display: block;
          }
        }

        .actions {
          display: none;
        }
      }

      .component {
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
  }
</style>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {components, modules} from '../modules'
  import {
    editRenderItem,
    blurRenderItem
  } from '../vuex/actions'

  Vue.transition('fadeIn', {
    enterClass: 'fadeInLeft',
    leaveClass: 'fadeOutLeft'
  })

  export default{
    components,

    ready () {
      // 模拟移动端rem大小环境
      setFontSize()
      window.addEventListener("resize", setFontSize)

      function setFontSize() {
        document.documentElement.style.fontSize = `${(document.querySelector('[drag-tag="modules"]').clientWidth - 28) * 20 / 320}px`
      }
    },

    vuex: {
      getters: {
        render       : ({render}) => render,
        items        : ({render}) => render.items,
        activeModules: ({render}) => render.dragInfo.dragTag === 'modules',
        activeModule : ({render}) => render.dragInfo,
        currentModule: ({render}) => render.current
      },

      actions: {
        editRenderItem: (store, item) => {
          window.event.preventDefault()
          window.event.stopPropagation()
          editRenderItem(store, item)
        },
        blurRenderItem
      }
    },

    methods: {
      del(item) {
        this.items.$remove(item)
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

