<template>
    <div class="module-container">
        <loading :show="data.coupon.loading">
            <div class="ph-empty dashed" v-if="!data.coupon.value.couponId">
                未创建优惠券
            </div>

            <!-- TODO ZH 16/9/8 优惠券 -->
            <div v-if="data.coupon.value.couponId">
                {{data.coupon.value | json}}
            </div>
        </loading>
    </div>
</template>

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
                    coupon: {
                        type   : 'coupon',
                        title  : '选择优惠券',
                        loading: true,
                        value  : {},
                    }
                }

                api.goods.fetchCoupons()
                        .then(({items}) => {
                            this.$set('data.coupon.value', items[0] || {})
                        })
                        .catch(() => {
                        })
                        .then(() => this.$set('data.coupon.loading', false))
            }
        },
        data() {
            return {}
        }
    }
</script>
