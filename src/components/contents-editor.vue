<template>
  <div drag-tag="stage" class="stage">
    <component
      drag-tag="stage-item"
      @click="edit(item)"
      :module-instance="item"
      v-for="item in items"
      track-by="$index"
      :is="item.component">
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
  export default{
    props: ['items'],

    ready () {

    },

    methods: {
      edit(item){
        this.$dispatch('current-module', item.module)
      }
    }
  }
</script>
