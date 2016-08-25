<template>
    <div class="module-container">
        <div class="goods-singe">
            <div class="ph-empty dashed" v-if="!data.goods.value.length">
                单列宝贝
            </div>

            <div v-for="item in data.goods.value"
                 track-by="$index"
                 class="item">
                <a :href="item.url"
                   :style="{'background-image': 'url('+ item.picUrl +'_300x300.jpg)'}"
                   class="img"
                ></a>

                <div class="desc">
                    <div class="titles">
                        <h4>
                            {{item.title}}
                        </h4>
                        <h5>
                            {{item.subTitle}}
                        </h5>
                    </div>

                    <div class="actions">
                        <a :href="item.url" class="btn btn-primary">{{data.btnTitle.value}}</a>

                        <div>
                            <div class="promo-price">￥{{item.promoPrice}}
                                <span class="price">￥{{item.price}} </span>
                            </div>
                            <div class="sold">
                                已售出{{item.soldQuantity}}件
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '../api'
    import {
            fetchGoods
    } from '../assets/tools'

    export default {
        props: ['data'],

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    goods   : {
                        type   : 'goods',
                        title  : '选择宝贝',
                        value  : [],
                        options: {
                            labels: [
                                'title',
                                'subTitle',
                                'soldQuantity'
                            ],
                            minLen: 0,
                            maxLen: 5
                        }
                    },
                    btnTitle: {
                        type : 'text',
                        title: '购买按钮',
                        value: '立即购买'
                    }
                }

                fetchGoods(1, {subTitle: '子标题子标题子标题'}).then((items) => {
                    this.data.goods.value = items
                })
            }
        },

        components: {},

        data() {
            return {}
        }
    }
</script>