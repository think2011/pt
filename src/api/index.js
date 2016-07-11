import Vue from 'vue'

export default {
  goods: require('./goods')(Vue.http)
}
