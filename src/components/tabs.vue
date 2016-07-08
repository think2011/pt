<template>
  <div>
    <ul class="nav">
      <li
        v-for="r in renderData"
        :class="{current: ($index === current)}"
        @click.prevent="handleTabListClick($index, r)">
        <a href="javascript:">
          {{{r.head}}}
        </a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  ul {
    display: flex;

    li {
      margin-right: 15px;
    }
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props  : {
      current: {
        type   : Number,
        default: 0
      }
    },
    data() {
      return {
        renderData: []
      }
    },
    methods: {
      handleTabListClick(index, el) {
        this.current = index
      }
    }
  }
</script>
