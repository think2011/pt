<template>
    <div class="module-container">
        <loading :show="data.meal.loading">
            <div class="ph-empty dashed" v-if="!data.meal.value.mealId">
                未创建搭配套餐
            </div>

            <!-- TODO ZH 16/9/8 搭配套餐模板 -->
            <div v-if="data.meal.value.mealId">
                {{data.meal.value | json}}
            </div>
        </loading>
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
