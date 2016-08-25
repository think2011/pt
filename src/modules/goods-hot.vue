<template>
    <div class="module-container">
        <div class="goods-hot">
            <div class="ph-empty dashed" v-if="!data.goods.value.length">
                热卖单品
            </div>

            <div v-if="data.goods.value.length" class="data.goods.value[0]">
                <a :href="data.goods.value[0].url"
                   :style="{'background-image': 'url('+ data.goods.value[0].picUrl +'_640x640q50.jpg)'}"
                   class="img"
                ></a>
                <div class="desc">
                    <div class="titles">
                        <h4>
                            {{data.goods.value[0].title}}
                        </h4>
                    </div>

                    <div class="actions">
                        <div class="promo-price">
                            ￥{{data.goods.value[0].promoPrice}}
                        </div>
                        <div class="price-desc">
                            <div class="price">￥{{data.goods.value[0].price}}</div>
                            <div class="sold">
                                已售{{data.goods.value[0].soldQuantity}}件
                            </div>
                        </div>

                        <div class="countdown-container">
                            距离活动{{stateMap[state]}}:
                            <countdown
                                    :state.sync="state"
                                    :start="data.start.value"
                                    :end="data.end.value">
                            </countdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '../api'
    import countdown from '../components/countdown.vue'
    import {
            fetchGoods
    } from '../assets/tools'

    export default {
        props     : ['data'],
        components: {countdown},

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    goods: {
                        type   : 'goods',
                        title  : '选择宝贝',
                        value  : [],
                        options: {
                            minLen: 0,
                            maxLen: 1
                        }
                    },
                    start: {
                        type : 'time',
                        title: '开始时间',
                        value: Date.now(),
                    },
                    end  : {
                        type : 'time',
                        title: '结束时间',
                        value: Date.now() + 1000 * 60 * 60 * 2,
                    }
                }
                fetchGoods(1).then((items) => {
                    this.data.goods.value = items
                })
            }
        },

        data() {
            return {
                stateMap: {
                    ready   : '开始',
                    underway: '结束',
                    end     : '结束'
                },
                state   : null
            }
        }
    }
</script>