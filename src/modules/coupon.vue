<template>
    <div class="module-container">
        <div class="coupons">
            <loading :show="data.coupon.loading">
                <div class="ph-empty dashed" v-if="!data.coupon.value.length">
                    优惠券
                </div>

                <div class="coupon"
                     v-if="data.coupon.value.length">
                    <a v-for="item in data.coupon.value"
                       track-by="$index"
                       class="item"
                       :href="item.activityUrl">
                        <div class="denominations">{{item._denominations}}</div>
                        <div class="desc">
                            <div class="condition">{{item._condition}}</div>
                            <button class="btn btn-sm">立即领取</button>
                        </div>
                    </a>
                </div>
            </loading>
        </div>
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
                        value  : [],
                    }
                }

                api.goods.fetchCoupons()
                        .then(({items}) => {
                            this.$set('data.coupon.value', _.take(items, 2))
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
