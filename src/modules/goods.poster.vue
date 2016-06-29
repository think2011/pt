<template>
  <div>
    test!! {{time}}
  </div>
</template>

<style>
</style>

<script type="text/ecmascript-6">
  import {initModue} from '../components/mixins'

  export default {
    mixins: [initModue],

    data() {
      return {
        time: Date.now()
      }
    }
  }
</script>
