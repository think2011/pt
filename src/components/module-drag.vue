<template>
  <div v-show="dragModule" class="drag-module">
    <component :is="dragModule.type"></component>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  .drag-module {
    width: 200px;
    background: seagreen;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    cursor: pointer;
    opacity: 0.5;
  }
</style>

<script type="text/ecmascript-6">
  import {components, modules} from '../modules'

  export default{
    props: {
      dragModule: {
        type    : Object,
        required: true,
        twoWay  : true
      }
    },

    components: components,

    ready() {
      this.$watch('dragModule', (newVal) => {
        this.startDrag()
      })
    },

    methods: {
      startDrag () {
        let that = this
        let el   = this.$el

        moveEvent()
        window.addEventListener('mousemove', moveEvent)
        window.addEventListener('mouseup', function upEvent() {
          window.removeEventListener('mousemove', moveEvent)
          window.removeEventListener('mouseup', upEvent)
          that.stopDrag()
        })

        function moveEvent(event) {
          event = event || window.event

          el.style.left = `${event.clientX - el.clientWidth / 2}px`
          el.style.top  = `${event.clientY - el.clientHeight / 2}px`
        }
      },
      stopDrag () {
        this.dragModule = {}
      }
    }
  }
</script>
