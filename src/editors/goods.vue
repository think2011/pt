<template>
  <div>
    <tabs>
      <tab head="宝贝">
        <ul>
          <li
            class="item"
            track-by="$index"
            v-for="item in componentData.value">
            <a
              href="javascript:"
              :style="{'background-image': 'url('+ item.picUrl +'_sum.jpg)'}"
              class="img"
            ></a>

            <div class="desc">
              <div class="price">￥{{item.promoPrice}}</div>
              <div class="title">{{item.title}}</div>
            </div>
          </li>
        </ul>
      </tab>

      <tab head="属性">

      </tab>
    </tabs>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .item {
    display: flex;
    margin: 10px 0;

    .img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      background-size: contain;
      background: no-repeat center;
    }

    .desc {
      flex: 1;

      .price {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .title {
        font-size: 14px;
      }
    }
  }

</style>

<script type="text/ecmascript-6">
  import api from '../api'
  import tabs from '../components/tabs.vue'
  import tab from '../components/tab.vue'

  export default{
    props: ['componentData'],

    components: {
      tabs,
      tab
    },

    ready() {
    },

    data(){
      return {}
    }
  }
</script>
