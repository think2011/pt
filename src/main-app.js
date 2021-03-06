import './main'
import Vue from 'vue'
import App from './App'

import  './directives'
import 'animate.css/animate.css'
import 'keen-ui/dist/keen-ui.css'
import 'hint.css/hint.css'

Vue.use(require('keen-ui'))
Vue.use(require('vue-sortable'))

new Vue({
    el        : 'body',
    components: {App}
})

// 标记PC端
document.documentElement.classList.add('PC')