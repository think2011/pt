<template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      head: {
        type: String
      }
    },

    created() {
      this.$parent.renderData.push({
        head: this.head
      })
    },

    ready() {
      _.each(this.$parent.$children, (item, index) => {
        if (item.$el === this.$el) this.index = index
      })
    },

    computed: {
      show() {
        return this.$parent.current === this.index
      }
    },

    data(){
      return {
        index: null
      }
    }
  }
</script>
