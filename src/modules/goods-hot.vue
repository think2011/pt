<template>
    <div class="module-container">
        <div class="goods-hot">
            <loading :show="data.goods.loading">
                <div class="ph-empty dashed" v-if="!data.goods.value.length">
                    热卖单品
                </div>

                <div v-if="data.goods.value.length" class="data.goods.value[0]">
                    <carousel :responsive="100" :indicators="true">
                        <carousel-item v-for="item in data.goods.value[0].itemImgs">
                            <a :href="data.goods.value[0].url"
                               :style="{'background-image': 'url('+ item.url +'_640x640q50.jpg)'}"
                               class="img"
                            ></a>
                        </carousel-item>
                    </carousel>

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
                            <span v-show="state !== 'end'">
                            <span class="state">
                                距离活动{{stateMap[state]}}:
                            </span>
                            <countdown
                                    :state.sync="state"
                                    :start="data.time.value.start"
                                    :end="data.time.value.end">
                            </countdown>
                            </span>
                                <span class="active-end color-default" v-show="state === 'end'">
                                活动已结束
                            </span>

                            </div>
                        </div>
                    </div>
                </div>
            </loading>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '../api'
    import countdown from '../components/countdown.vue'
    import {
            fetchGoods
    } from '../assets/tools'
    import components from '../components'

    export default {
        props     : ['data'],
        components: {
            countdown,
            Carousel: components.Carousel,
            CarouselItem: components.CarouselItem,
            loading: components.loading
        },

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    goods: {
                        type   : 'goods',
                        title  : '选择宝贝',
                        loading: true,
                        value  : [],
                        options: {
                            labels: [
                                'title',
                                'soldQuantity'
                            ],
                            minLen: 0,
                            maxLen: 1
                        }
                    },
                    time : {
                        type : 'time',
                        title: '倒计时',
                        value: {
                            start: Date.now(),
                            end  : Date.now() + 1000 * 60 * 60 * 2
                        }
                    }
                }
                fetchGoods(1).then((items) => {
                    this.data.goods.value = items
                })
            }

            this.$watch('data.goods.value[0]', (newVal) => {
                if (!newVal || newVal.itemImgs) return

                // 获取主图
                this.$set('data.goods.loading', true)
                api.goods.fetchMainPic([newVal.numIid])
                        .then((res) => {
                            this.data.goods.value = _.merge([], this.data.goods.value, res.items)
                        })
                        .catch(() => {
                        })
                        .then(() => {
                            this.$set('data.goods.loading', false)
                        })
            })
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