import Vue from 'vue'
import './interceptors'

export default {
    goods: require('./goods')(Vue.http),
    pic: require('./pic')(Vue.http),
    base : require('./base')(Vue.http)
}
