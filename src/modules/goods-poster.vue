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

<style>
  .my-swipe {
    height: 200px;
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

    components: {
      Swipe,
      SwipeItem
    },

    ready (){


      this.componentData = {
        time: 1000
      }

    },

    data() {
      return {
        time: Date.now()
      }
    }
  }
</script>
