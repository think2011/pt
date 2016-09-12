<template>
    <div class="module-container">
        <div class="meals">
            <loading :show="data.meal.loading">
                <div class="ph-empty dashed" v-if="!data.meal.value.mealId">
                    未创建搭配套餐
                </div>

                <div v-if="data.meal.value.mealId"
                     class="meal"
                     :class="['meal-' + data.meal.value.itemList.length]">
                    <a :href="item.url" v-for="item in data.meal.value.itemList"
                       track-by="$index"
                       :style="{'background-image': 'url('+ item.picUrl +'_300x300.jpg)'}"
                       class="img">
                        <div class="desc">
                            <div class="title">{{item.title}}</div>
                            <div class="price">{{item.price}}</div>
                            <div class="promo-price">{{item.promoPrice}}</div>
                        </div>
                    </a>

                    <div class="actions">
                        <div class="sub-title">{{data.text.value.subTitle.value}}</div>
                        <div class="title">{{data.text.value.title.value}}</div>
                        <div class="origin-price">原价:{{data.meal.value.originalPrice}}元</div>
                        <div class="save-price">立省:{{data.meal.value._savePrice}}元</div>
                        <div class="meal-price">{{data.meal.value.mealPrice}}</div>
                        <div class="btn-container">
                            <a :href="data.meal.value._url"
                               class="btn btn-s1 btn-xs">
                                {{data.text.value.buy.value}}
                            </a>
                        </div>
                    </div>
                </div>
            </loading>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
</style>

<script type="text/ecmascript-6">
    import api from '../api'
    import components from '../components'
    import {
            fetchGoods,
            posterUrl
    } from '../assets/tools'

    export default {
        props: ['data'],

        components: {
            loading: components.loading
        },

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    meal: {
                        type   : 'meal',
                        title  : '选择套餐',
                        loading: true,
                        value  : {},
                    },
                    text: {
                        type : 'text',
                        value: {
                            title   : {
                                title: '主标题',
                                value: '超值搭配价'
                            },
                            subTitle: {
                                title: '副标题',
                                value: 'COLLOCATION'
                            },
                            buy     : {
                                title: '购买按钮',
                                value: '立即购买'
                            }
                        },
                    }
                }

                api.goods.fetchMeals()
                        .then(({items}) => {
                            this.$set('data.meal.value', items[0] || {})
                        })
                        .catch(() => {
                        })
                        .then(() => this.$set('data.meal.loading', false))
            }
        },

        data() {
            return {}
        }
    }
</script>
