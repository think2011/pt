<template>
    <ui-modal
            type="large"
            :show.sync="show"
            header="添加宝贝"
            transition="ui-modal-fade"
    >
        <slot>
            <ul class="list">
                <li :class="{checked:item.checked}"
                    @click="pick(item)"
                    v-for="item in data.items">
                    <div class="img">
                        <img :src="item.picUrl + '_120x120.jpg'" alt="">
                    </div>
                    <div class="desc">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="price">{{item.promoPrice}}</div>
                    </div>
                </li>
            </ul>

            <paging url="/api/taobao/items"
                    @on:done="pageDone"
                    :params="pagingParams"
                    :data.sync="data">
            </paging>
        </slot>
        <div slot="footer">
            <ui-button
                    @click="ok"
                    color="primary">
                确定 {{checkedItemsLen}}/{{maxLen}}
            </ui-button>
        </div>
    </ui-modal>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .ui-modal-body {
        margin: 20px 0;
        overflow-y: auto;

        .list {
            display: flex;
            flex-flow: row wrap;
            font-size: 13px;

            li {
                $gap: (800 - (122 * 6)) / (2 * 6 - 2) /  800 * 100%;

                width: 122 / 800 * 100%;
                border: 1px solid #ccc;
                margin: 0 $gap 10px $gap;
                cursor: pointer;

                &:nth-child(6n) {
                    margin-right: 0;
                }
                &:nth-child(6n+1) {
                    margin-left: 0;
                }

                &.checked {
                    outline: 2px solid slateblue;
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
</style>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import api from '../api'
    import paging from './paging.vue'

    export default{
        components: {
            paging
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

        methods: {
            pageDone(data){
                // 每次初始化选中
                _.each(data.items, (item, index) => {
                    let isMath = this.checkedItemsMap[item.numIid]

                    this.$set(`data.items[${index}].checked`, !!isMath)
                    if (isMath) {
                        this.$set(`checkedItemsMap[${item.numIid}]`, item)
                    }
                })
            },
            pick(item) {
                let checkedItemsLen = this.checkedItemsLen

                if (item.checked) {
                    if (this.minLen && this.minLen > checkedItemsLen - 1) {
                        return this.$dispatch('ui-snackbar::create', {
                            message : `至少需要选择${this.maxLen}个宝贝`,
                            duration: 3000
                        })
                    }

                    delete this.$data.checkedItemsMap[item.numIid]
                    item.checked = false
                } else {
                    if (this.maxLen && this.maxLen < checkedItemsLen + 1) {
                        return this.$dispatch('ui-snackbar::create', {
                            message : `最多只能选择${this.maxLen}个宝贝`,
                            duration: 3000
                        })
                    }
                    this.$set(`checkedItemsMap[${item.numIid}]`, item)
                    item.checked = true
                }
                this.updateCheckedItemsLen()
            },
            ok(){
                this.$dispatch('on:ok', _.values(this.checkedItemsMap))
                this.show = false
            },
            updateCheckedItemsLen () {
                this.checkedItemsLen = _.size(this.checkedItemsMap)
            }
        },

        watch: {
            show(newVal) {
                if (newVal) {
                    _.each(this.initItems, (item) => this.$set(`checkedItemsMap[${item.numIid}]`, item))
                    this.updateCheckedItemsLen()
                } else {
                    this.$data.checkedItemsMap = {}
                }
            }

        },
        data(){
            return {
                checkedItemsMap: {},
                checkedItemsLen: 0,
                data           : {},
                pagingParams   : {
                    type: 'Keyword',
                    q   : '',
                    size: 18
                },
                showModal      : false
            }
        }
    }
</script>