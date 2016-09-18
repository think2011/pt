<template>
    <popover position="left left">
        <div class="shortcut-url"
             slot="contents"
             style="width: 400px">
            <ui-tabs type="text" fullwidth>
                <ui-tab header="常用">
                    <ul class="common">
                        <li v-for="item in common">
                            <a @click="setUrl(item.url)" href="javascript:">{{item.title}}</a>
                        </li>
                    </ul>
                </ui-tab>

                <ui-tab @selected="selectGoods" header="宝贝">
                    <ul class="goods-list">
                        <li v-for="item in pagingData.items">
                            <div class="img">
                                <img draggable="false" :src="item.picUrl + '_120x120.jpg'" alt="">
                            </div>
                            <div class="desc">
                                <div :title="item.title"
                                     class="title">
                                    {{item.title}}
                                </div>
                                <div class="price">{{item.promoPrice}}</div>
                            </div>
                        </li>
                    </ul>

                    <paging url="/api/taobao/items"
                            :cache="true"
                            v-ref:paging
                            :params="pagingParams"
                            :loading.sync="pagingLoading"
                            :data.sync="pagingData">
                    </paging>
                </ui-tab>

                <ui-tab header="套餐">
                    My collections
                </ui-tab>
                <ui-tab header="优惠券">
                    My collections
                </ui-tab>
            </ui-tabs>
        </div>

        <slot></slot>
    </popover>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .shortcut-url {
        .common {
            display: flex;
            justify-content: space-around;
        }

        .goods-list {
            display: flex;
            flex-flow: column nowrap;

            li {
                display: flex;

                .img {
                    width: 50px;
                    height: 50px;
                }

                .desc {

                }
            }
        }
    }
</style>

<script>
    import components from './index'

    export default {
        props: {
            url: {
                type : String,
                toWay: true
            }
        },

        components: {
            popover    : components.popover,
            paging     : components.paging,
            shortcutUrl: components.shortcutUrl
        },

        created() {
            const {sellerId} = USER_INFO
            const {shopId} = SHOP_INFO

            this.common = [
                {
                    title: '店铺首页',
                    url  : `https://shop${shopId}.taobao.com`
                },
                {
                    title: '店铺收藏',
                    url  : `https://favorite.taobao.com/popup/add_collection.htm?id=${shopId}&itemid=${shopId}&itemtype=0&sellerid=${sellerId}&scjjc=2`
                }
            ]
        },

        watch: {},

        methods: {
            setUrl(url) {
                this.url = url
            },

            selectGoods() {
                this.$refs.paging.doPage(1)
            }
        },

        data() {
            return {
                pagingParams : {
                    type          : 'Keyword',
                    q             : '',
                    size          : 3,
                    showPromoPrice: false,
                    sellerCids    : '',
                    itemState     : '',
                    orderBy       : 'list_time:desc'
                },
                pagingLoading: false,
                pagingData   : {}
            }
        }
    }
</script>
