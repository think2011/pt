<template>
    <div class="select-goods">
        <ui-modal
                type="large goods"
                :show.sync="show"
                header="选择宝贝"
                transition="ui-modal-fade"
                :backdrop-dismissible="false"
        >
            <slot v-if="show">
                <ui-tabs>
                    <ui-tab header="宝贝列表">
                        <filter-bar @params-change="filterChange"></filter-bar>
                        <ul class="list">
                            <li :class="{checked:item.checked}"
                                @click="pick(item)"
                                v-for="item in data.items">
                                <div class="shade">
                                    <i class="material-icons">check_circle</i>
                                </div>
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
                                @on:done="pageDone"
                                :params="pagingParams"
                                v-ref:paging
                                :loading.sync="pagingLoading"
                                :data.sync="data">
                        </paging>
                    </ui-tab>

                    <ui-tab :header="'已选宝贝('+ checkedItems.length +')'">
                        <div class="ph-empty" v-if="!checkedItems.length">
                            未选择任何宝贝
                        </div>

                        <ul class="list">
                            <li :class="{checked:item.checked}"
                                @click="pick(item)"
                                v-for="item in checkedItems">
                                <div class="shade">
                                    <i class="material-icons" aria-hidden="true">check_circle</i>
                                </div>
                                <div class="img">
                                    <img :src="item.picUrl + '_120x120.jpg'" alt="">
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
                    </ui-tab>
                </ui-tabs>
            </slot>
            <div slot="footer">
                <ui-button
                        @click="ok"
                        color="primary">
                    确定 {{checkedItems.length}}/{{maxLen}}
                </ui-button>
            </div>
        </ui-modal>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .select-goods {
        .ui-modal-body {
            transition: .3s;
            min-height: 567px;

            .list {
                display: flex;
                flex-flow: row wrap;
                font-size: 13px;

                li {
                    border: 1px solid #ccc;

                    $gap: (800 - (122 * 6)) / (2 * 6 - 2) /  800 * 100%;

                    width: 122 / 800 * 100%;
                    /*border: 1px solid #ccc;*/
                    margin: 0 $gap 10px $gap;
                    cursor: pointer;
                    position: relative;

                    &:nth-child(6n) {
                        margin-right: 0;
                    }
                    &:nth-child(6n+1) {
                        margin-left: 0;
                    }

                    &.checked {
                        border-color: rgba(33, 150, 243, 0.4);

                        .shade {
                            display: flex;
                            justify-content: center;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: rgba(33, 150, 243, 0.4);

                            .material-icons {
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                margin: -45px 0 0 -22.5px;
                                color: #fff;
                                font-size: 45px;
                                opacity: .9;
                            }
                        }
                    }

                    .shade {
                        display: none;
                    }
                }

                .img {
                    width: 120px;
                    height: 120px;
                    text-align: center;
                    margin-bottom: 5px;

                    img {
                        height: 120px;
                    }
                }

                .desc {
                    .title {
                        width: 120px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        margin-bottom: 5px;
                    }

                    .price {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import api from '../api'
    import paging from './paging.vue'
    import filterBar from './filter-bar.vue'
    import {showToast} from '../vuex/actions'

    export default{
        components: {
            paging,
            filterBar
        },

        props: {
            show     : {
                type    : Boolean,
                required: true,
                twoWay  : true
            },
            maxLen   : {
                type: Number
            },
            minLen   : {
                type: Number
            },
            initItems: {
                type: Array,
                default() {
                    return []
                }
            }
        },

        vuex: {
            getters: {},
            actions: {
                showToast
            }
        },

        methods: {
            pageDone(data){
                // 每次初始化选中
                _.each(data.items, (item, index) => {
                    this.$set(`data.items[${index}].checked`, !!_.find(this.checkedItems, item))
                })
            },
            pick(item) {
                let checkedItemsLen = this.checkedItems.length

                if (item.checked) {
                    if (this.minLen && this.minLen > checkedItemsLen - 1) {
                        return this.showToast({
                            message : `至少需要选择${this.minLen}个宝贝`,
                            duration: 3000
                        })
                    }

                    item.checked = false
                    this.checkedItems.splice(_.findIndex(this.checkedItems, item), 1)
                } else {
                    if (this.maxLen && this.maxLen < checkedItemsLen + 1) {
                        return this.showToast({
                            message : `最多只能选择${this.maxLen}个宝贝`,
                            duration: 3000
                        })
                    }

                    item.checked = true
                    this.checkedItems.push(item)
                }
            },
            ok(){
                this.$dispatch('on:ok', _.values(this.checkedItems))
                this.show = false
            },
            filterChange(params) {
                _.merge(this.pagingParams, params)
                this.$refs.paging.doPage(1)
            }
        },

        watch: {
            show(newVal) {
                if (newVal) {
                    _.each(this.initItems, (item, index) => {
                        item.checked = true
                        this.checkedItems.push(item)
                    })
                } else {
                    this.checkedItems = []
                }
            }
        },

        data(){
            return {
                checkedItems : [],
                data         : {},
                pagingParams : {
                    type          : 'Keyword',
                    q             : '',
                    size          : 12,
                    showPromoPrice: true
                },
                showModal    : false,
                pagingLoading: false
            }
        }
    }
</script>