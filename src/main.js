import Vue from 'vue'
import App from './App'
import _ from 'lodash'

Vue.use(require('vue-resource'))

import './assets/css/styles.scss'

/* eslint-disable no-new */
new Vue({
  el        : 'body',
  components: {App}
})
