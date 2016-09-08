import Vue from 'vue'

Vue.filter('mealUrl', (value) => {
    return `http://meal.taobao.com/mealDetail.htm?&meal_id=${value}&seller_id=${window.USER_INFO.sellerId}`
})