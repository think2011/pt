<template>
  <div>
    <div class="pic-container">
      <swipe class="swipe">
        <swipe-item
          v-for="item in componentData.goods.value.picUrl"
          track-by="$index"
          class="swipe-item">
          <a :href="componentData.goods.value.url"
             :style="{'background-image': 'url('+ item +'_300x300.jpg)'}"
             class="a-img"
          ></a>
        </swipe-item>
      </swipe>
    </div>
    <div class="price-container"></div>
    <div class="title-container"></div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  /* !!因为移动端,必须使用 rem 单位!! */
  /* !!因为移动端,必须使用 rem 单位!! */
  /* !!因为移动端,必须使用 rem 单位!! */
  @import "../assets/lib/hotcss.scss";

  .swipe {
    height: px2rem(300);
  }
</style>

<script type="text/ecmascript-6">
  import {Swipe, SwipeItem} from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'
  import {
    goods
  } from '../assets/tools'

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
          value: goods
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
