<template>
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            添加宝贝
          </slot>
        </div>

        <div class="modal-body">
          <ul class="list">
            <li v-for="item in data.items">
              <div class="img">
                <img :src="item.picUrl + '_120x120.jpg'" alt="">
              </div>
              <div class="desc">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="price">{{item.promoPrice}}</div>
              </div>
            </li>
          </ul>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button"
                    @click="show = false">
              确定
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 1000px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
    max-height: 500px;
    overflow-y: auto;

    .list {
      display: flex;
      flex-flow: row wrap;
      font-size: 13px;

      li {
        $gap: (940 - (122 * 7)) / (2 * 7 - 2) + px;

        border: 1px solid #ccc;
        margin: 0 $gap 10px $gap;

        &:nth-child(7n) {
          margin-right: 0;
        }
        &:nth-child(7n+1) {
          margin-left: 0;
        }
      }

      .img {
        width: 120px;
        height: 120px;
        text-align: center;
        margin-bottom: 5px;

        img {
          height: 120px;
        }
      }

      .desc {
        .title {
          width: 120px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 5px;
        }

        .price {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
    }
  }

  .modal-default-button {
    float: right;
  }

  /*
   * the following styles are auto-applied to elements with
   * v-transition="modal" when their visiblity is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter, .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>

<script type="text/ecmascript-6">
  import api from '../api'

  export default{
    props: {
      show: {
        type    : Boolean,
        required: true,
        twoWay  : true
      }
    },

    watch: {
      show: function (newVal) {
        if (newVal) {
          this.fetch()
        }
      }
    },

    methods: {
      fetch(params){
        api.goods
          .list(params)
          .then((data) => {
            this.data = data
          })
      }
    },

    data(){
      return {
        data     : [],
        showModal: false
      }
    }
  }
</script>
