<template>
  <div>
    <tabs>
      <tab head="宝贝">
        <ul class="goods-items">
          <li
            class="item"
            track-by="$index"
            v-for="item in componentValue.value">
            <button @click="del(item)">x</button>

            <a href="javascript:"
               :style="{'background-image': 'url('+ item.picUrl +'_sum.jpg)'}"
               class="img"
            ></a>

            <div class="desc">
              <div class="titles">
                <h4>
                  {{item.title}}
                </h4>
              </div>

              <div class="actions">
                <div>
                  <div class="promo-price">￥{{item.promoPrice}}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </tab>

      <tab head="属性">
        <ul class="goods-items">
          <li
            class="item"
            track-by="$index"
            v-for="item in componentValue.value">
            <a href="javascript:"
               :style="{'background-image': 'url('+ item.picUrl +'_sum.jpg)'}"
               class="img"
            ></a>

            <div class="desc">
              <form>
                <label v-for="labelItem in componentValue.options.labels">
                  <span class="label">{{labelMap[labelItem]}}</span>
                  <input type="text" v-model="item[labelItem]">
                </label>
              </form>
            </div>
          </li>
        </ul>
      </tab>
    </tabs>

    <button>添加宝贝 {{componentValue.value.length}}/{{componentValue.options.maxLen}}</button>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .goods-items {
    .item {
      margin: 0 0 15px 0;
      border: none;

      .img {
        width: 80px;
        height: 80px;
        flex: 0 0 80px;
        margin-right: 15px;
      }

      .desc {
        flex: 1;
        margin: 0;

        form {
          display: flex;
          flex-direction: column;

          label {
            font-size: 14px;

            .label {
              width: 60px;
              display: inline-block;
            }
          }
        }
      }

      .titles {

        h4 {
        }

        h5 {
        }
      }

      .actions {
        .promo-price {
          .price {
          }
        }

        .sold {
        }

        .btn {
        }
      }

    }
  }

</style>

<script type="text/ecmascript-6">
  import api from '../api'
  import tabs from '../components/tabs.vue'
  import tab from '../components/tab.vue'

  export default{
    props: ['componentValue'],

    components: {
      tabs,
      tab
    },

    methods: {
      del: function (item) {
        if (this.componentValue.value.length <= this.componentValue.options.minLen) {
          return alert(`至少要留${this.componentValue.options.minLen}个宝贝`)
        }

        this.componentValue.value.$remove(item)
      }
    },

    data(){
      return {
        labelMap: {
          title       : '标题',
          subTitle    : '子标题',
          soldQuantity: '销量'
        }
      }
    }
  }
</script>
