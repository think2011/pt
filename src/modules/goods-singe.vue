<template>
  <div>
    <div
      v-for="item in componentData.goods.value"
      class="goods-item">
      <a :href="item.url"
         :style="{'background-image': 'url('+ item.picUrl +'_200x200.jpg)'}"
         class="a-img"
      ></a>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  /* !!因为移动端,必须使用 rem 单位!! */
  /* !!因为移动端,必须使用 rem 单位!! */
  /* !!因为移动端,必须使用 rem 单位!! */
  @import "../assets/lib/hotcss.scss";

  .a-img {
    width: px2rem(325);
    height: px2rem(325);
  }

</style>

<script type="text/ecmascript-6">
  import {
    goods
  } from '../assets/tools'

  export default {
    props: ['componentData'],

    created() {
      let defaults = {
        title: {
          type : 'text',
          title: '标题',
          value: '单列宝贝'
        },

        goods: {
          type : 'selectGoods',
          title: '选择宝贝',
          value: [goods]
        }
      }

      if (_.isEmpty(this.componentData)) this.componentData = defaults
    },

    components: {},

    data() {
      return {}
    }
  }
</script>
