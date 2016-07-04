<template>
  <div>
    test!! {{componentData.time}}

    <swipe class="my-swipe">
      <swipe-item class="slide1">123</swipe-item>
      <swipe-item class="slide2">{{componentData.time}}</swipe-item>
      <swipe-item class="slide3">444</swipe-item>
    </swipe>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/lib/hotcss.scss";

  .my-swipe {
    height: px2rem(200);
    color: #fff;
    font-size: 30px;
    text-align: center;
  }

  .slide1 {
    background-color: #0089dc;
    color: #fff;
  }

  .slide2 {
    background-color: #ffd705;
    color: #000;
  }

  .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }
</style>

<script type="text/ecmascript-6">
  import {Swipe, SwipeItem} from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'

  export default {
    props: ['componentData'],

    created() {
      let defaults = {
        color: {
          type   : 'color',
          title  : '颜色',
          value  : '#FF5A50',
          options: [
            '#FF5A50',
            '#44B791',
            '#F39F23'
          ]
        },

        goods: {
          type : 'selectGoods',
          title: '选择宝贝',
          value: null
        },

        countdown: {
          type : 'countdown',
          title: '活动时间',
          value: {
            start: '2016-07-04 15:47:45',
            end  : '2016-07-05 15:47:45'
          }
        }
      }

      if (_.isEmpty(this.componentData)) this.componentData = defaults
    },

    components: {
      Swipe,
      SwipeItem
    },

    data() {
      return {}
    }
  }
</script>
