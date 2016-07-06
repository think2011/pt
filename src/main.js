import Vue from 'vue'
import App from './App'
import _ from 'lodash'

// import './assets/lib/hotcss'

import 'font-awesome/css/font-awesome.css'
import 'animate.css/animate.css'
import './assets/css/styles.scss'

Vue.use(require('vue-resource'))

new Vue({
  el        : 'body',
  components: {App}
})
