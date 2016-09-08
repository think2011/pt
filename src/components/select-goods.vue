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
                <div class="body-contents">
                    <div class="list-container">
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
                                :cache="true"
                                v-ref:paging
                                :loading.sync="pagingLoading"
                                :data.sync="data">
                        </paging>
                    </div>

                    <div class="selected-container">
                        <p class="text-center">
                            已选 {{checkedItems.length}}/{{maxLen}}
                        </p>

                        <ul>
                            <li :class="{checked:item.checked}"
                                class="has-del"
                                v-for="item in checkedItems">
                                <img :src="item.picUrl + '_120x120.jpg'" alt="">
                                <button @click="pick(item)" class="del"><i class="material-icons">clear</i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
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

<style lang="scss" rel="stylesheet/scss">
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
                    showPromoPrice: true,
                    sellerCids    : '',
                    itemState     : 'OnSale',
                    orderBy       : 'list_time:desc'
                },
                showModal    : false,
                pagingLoading: false
            }
        }
    }
</script>