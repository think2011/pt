<template>
    <div class="goods-items">
        <div class="ph-empty dashed" v-if="!componentData.goods.value.length">
            双列宝贝
        </div>

        <div
                v-for="item in componentData.goods.value"
                track-by="$index"
                class="item">
            <a :href="item.url"
               :style="{'background-image': 'url('+ item.picUrl +'_360x360.jpg)'}"
               class="img"
            ></a>

            <div class="desc">

                <div class="actions">
                    <div>
                        <div class="promo-price">
                            <span class="p-1">狂欢价</span>:{{item.promoPrice}}
                            <span class="price"><span>原价:</span>{{item.price}}</span>
                        </div>
                    </div>

                    <a :href="item.url" class="btn btn-red">{{componentData.buttonTitle.value}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    /* !!因为移动端,必须使用 rem 单位!! */
    /* !!因为移动端,必须使用 rem 单位!! */
    /* !!因为移动端,必须使用 rem 单位!! */
    @import "../assets/lib/hotcss.scss";

    .goods-items {
        display: flex;
        flex-wrap: wrap;

        .item {
            width: px2rem(360);
            flex-direction: column;
            border-bottom: none;
            margin-left: px2rem(10);

            .img {
                width: px2rem(360);
                height: px2rem(360);
                flex: 0 0 px2rem(360);
            }

            .desc {
                margin: px2rem(20) 0;
            }

            h4, h5 {
            }

            .titles {
                h4 {
                }

                h5 {
                }
            }

            .actions {
                flex-direction: column;
                align-items: center;
                text-align: center;

                .promo-price {
                    margin-bottom: px2rem(10);
                    font-size: px2rem(26);

                    .p-1 {
                        font-size: px2rem(18);
                        color: #333;
                    }

                    .price {
                        margin-left: px2rem(5);
                        font-size: px2rem(18);
                    }
                }

                .sold {
                }

                .btn {
                    position: static;
                    font-size: px2rem(18);
                    width: px2rem(132);
                    height: px2rem(27);
                    line-height: px2rem(27);
                    border-radius: 0;
                }
            }

        }
    }


</style>

<script type="text/ecmascript-6">
    import {
            fetchGoods
    } from '../assets/tools'

    export default {
        props: ['componentData'],

        created() {
            if (_.isEmpty(this.componentData)) {
                this.componentData = {
                    buttonTitle: {
                        type   : 'text',
                        title  : '购买按钮',
                        value  : '点击抢购 ▶',
                        options: {}
                    },

                    goods: {
                        type   : 'goods',
                        title  : '选择宝贝',
                        value  : [],
                        options: {
                            labels: [
                                'price'
                            ],
                            minLen: 0,
                            maxLen: 6
                        }
                    }
                }

                fetchGoods(2)
                        .then((items) => {
                            this.componentData.goods.value = items
                        })
            }

        },

        components: {},

        data() {
            return {}
        }
    }
</script>
