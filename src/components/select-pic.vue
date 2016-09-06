<template>
    <div class="select-pic">
        <ui-modal
                type="large goods"
                :show.sync="show"
                header="选择图片"
                transition="ui-modal-fade"
                :backdrop-dismissible="false"
        >
            <slot v-if="show">
                <div class="body-contents">
                    <div class="list-container">
                        <filter-bar type="pic" @params-change="filterChange"></filter-bar>
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

                        <paging url="/api/taobao/pictures"
                                :params="pagingParams"
                                v-ref:paging
                                :loading.sync="pagingLoading"
                                :data.sync="data">
                        </paging>
                    </div>
                </div>
            </slot>
        </ui-modal>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .select-pic {
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
            show  : {
                type    : Boolean,
                required: true,
                twoWay  : true
            },
            maxLen: {
                type: Number
            },
            minLen: {
                type: Number
            }
        },

        vuex: {
            getters: {},
            actions: {
                showToast
            }
        },

        methods: {
            pick(item) {
                this.$dispatch('on:ok', _.values(this.checkedItems))
                this.show = false
            },
            filterChange(params) {
                _.merge(this.pagingParams, params)
                this.$refs.paging.doPage(1)
            }
        },

        watch: {},

        data(){
            return {
                data         : {},
                pagingParams : {
                    clientType       : 'All',
                    orderBy          : null,
                    pictureCategoryId: null,
                    q                : null,
                    size             : 10,
                    type             : 'PicTitle',
                },
                showModal    : false,
                pagingLoading: false
            }
        }
    }
</script>