import Vue from 'vue'
import './interceptors'

export default {
    goods: require('./goods')(Vue.http),
    base : require('./base')(Vue.http)
}
