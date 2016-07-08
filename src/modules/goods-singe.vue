<template>
  <div class="goods-items">
    <div
      v-for="item in componentData.goods.value"
      track-by="$index"
      class="item">
      <a :href="item.url"
         :style="{'background-image': 'url('+ item.picUrl +'_300x300.jpg)'}"
         class="img"
      ></a>

      <div class="desc">
        <div class="titles">
          <h4>
            {{item.title}}
          </h4>
          <h5>
            {{item.subTitle}}
          </h5>
        </div>

        <div class="actions">
          <div>
            <div class="promo-price">￥{{item.promoPrice}}
              <span class="price">￥{{item.price}} </span>
            </div>
            <div class="sold">
              已售出{{item.soldQuantity}}件
            </div>
          </div>

          <a :href="item.url" class="btn btn-red">马上抢 &gt;</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  /* !!因为移动端,必须使用 rem 单位!! */
  /* !!因为移动端,必须使用 rem 单位!! */
  /* !!因为移动端,必须使用 rem 单位!! */
  @import "../assets/lib/hotcss.scss";

</style>

<script type="text/ecmascript-6">
  import {
    goods
  } from '../assets/tools'

  export default {
    props: ['componentData'],

    created() {
      goods.subTitle = '4月20日发 ML正常售卖 包邮'

      let defaults = {
        goods: {
          type   : 'goods',
          title  : '选择宝贝',
          value  : [goods, goods],
          options: {
            labels: [
              'title',
              'subTitle',
              'promoPrice',
              'price',
              'soldQuantity'
            ]
          }
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
