<template>
  <div>
    <tabs>
      <tab head="宝贝">

      </tab>

      <tab head="属性">

      </tab>
    </tabs>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<script type="text/ecmascript-6">
  import tabs from '../components/tabs.vue'
  import tab from '../components/tab.vue'

  export default{
    props: ['componentData'],

    components: {
      tabs,
      tab
    },

    data(){
      return {}
    }
  }
</script>
