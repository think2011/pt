<template>
  <div v-show="dragModule" class="drag-module">
    <component :is="dragModule.type"></component>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  .drag-module {
    width: 329px;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    cursor: pointer;
    opacity: 0.7;
    margin-top: 15px;
    background: #F1F1F2;
    transform-origin: top;
    transform: scale(0.5);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.50);
  }
</style>

<script type="text/ecmascript-6">
  import {components, modules} from '../modules'
  import {
    addRenderItem,
    activeRenderItem,
    dropRenderItem
  } from '../vuex/actions'

  export default{
    props: {
      dragModule: {
        type    : Object,
        required: true,
        twoWay  : true
      }
    },

    components: components,

    vuex: {
      actions: {
        addRenderItem,
        activeRenderItem,
        dropRenderItem
      }
    },

    ready() {
      this.$watch('dragModule', (newVal) => {
        _.isEmpty(this.dragModule) || this.startDrag()
      })
    },

    methods: {
      startDrag () {
        let that = this

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', function upEvent(event) {
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('mouseup', upEvent)
          that.stopDrag(event)
        })

        onMove()
        function onMove(event) {
          let el = that.$el
          event  = event || window.event

          that.activeRenderItem(event)

          el.style.left = `${event.clientX - el.clientWidth / 2}px`
          el.style.top  = `${event.clientY}px`
        }
      },

      stopDrag (event) {
        setTimeout(() => {
          this.dropRenderItem(event, this.dragModule)
          this.dragModule = {}
        })
      }
    }
  }
</script>
