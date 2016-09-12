<template>
    <div class="select-pic">
        <ui-modal
                type="large goods"
                :show.sync="show"
                header="选择图片"
                :hide-footer="true"
                transition="ui-modal-fade"
                :backdrop-dismissible="false"
        >
            <slot v-if="show">
                <div class="body-contents">
                    <div class="list-container">
                        <filter-bar type="pic" :params.sync="filterBarParams"
                                    @params-change="filterChange"></filter-bar>

                        <div class="upload">
                            <div v-show="uploadData.state !== 'uploading'">
                                <ui-button @click="upload"
                                           hide-ripple-lnk="true"
                                           icon="cloud_upload"
                                           color="primary">
                                    上传图片到当前分类
                                </ui-button>
                            </div>

                            <div v-show="uploadData.state === 'uploading'">
                                <ui-button type="flat"
                                           hide-ripple-lnk="true"
                                           icon="cloud_upload"
                                           color="warning">
                                    正在上传 {{uploadData.percent}}%
                                </ui-button>

                            </div>

                            <file-upload
                                    v-el:file-upload
                                    :state.sync="uploadData.state"
                                    :percent.sync="uploadData.percent"
                                    :value.sync="uploadData.value"
                                    :action="'/api/wirelesspages/upload-image' + (filterBarParams.pictureCategoryId ? '?cid=' + filterBarParams.pictureCategoryId : '')">
                            </file-upload>
                        </div>

                        <ul class="list">
                            <li :class="{checked:item.checked}"
                                @click="pick(item)"
                                v-for="item in data.items">
                                <div class="shade">
                                    <i class="material-icons">check_circle</i>
                                </div>
                                <div class="img">
                                    <img draggable="false" :src="item.picturePath + '_140x140.jpg'" alt="">
                                </div>
                                <p class="text-center">
                                    {{item.pixel}}
                                </p>
                            </li>
                        </ul>

                        <paging url="/api/taobao/pictures"
                                :params="pagingParams"
                                :cache="false"
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
        .ui-modal-container {
            height: 560px;
        }

        .ui-modal-footer {
            display: none;
        }

        .list-container {
            position: relative;

            .upload {
                position: absolute;
                transform: translate(0, 0);
                top: -10px;
                right: 0;
                overflow: hidden;

                button {
                    white-space: nowrap;
                }

                .file-upload {
                    width: 100%;
                    height: 100px;
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    visibility: hidden;
                }
            }

            .list {
                .img {
                    width: 160px;
                    height: 160px;
                    display: table-cell;
                    vertical-align: middle;

                    & + p {
                        margin: 0;
                        padding: 5px 0;
                        background: #eee;
                        border-top: 1px solid #ccc;
                    }

                    img {
                        max-width: 100%;
                        max-height: 100%;
                        width: auto !important;
                        height: auto !important;
                        margin: 0;
                        vertical-align: middle;
                        display: inline-block;
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
    import fileUpload from '../components/file-upload.vue'

    export default{
        components: {
            paging,
            filterBar,
            fileUpload
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
                this.$dispatch('on:ok', item)
                this.show = false
            },
            upload() {
                this.$els.fileUpload.querySelector('input').click()
            },
            filterChange(params) {
                _.merge(this.pagingParams, params)
                this.$refs.paging.doPage(1)
            }
        },

        watch: {},


        events: {
            'onAllFilesUploaded'() {
                this.$refs.paging.doPage(1)
            }
        },

        data(){
            return {
                data           : {},
                pagingParams   : {
                    clientType       : 'All',
                    orderBy          : null,
                    pictureCategoryId: null,
                    q                : null,
                    size             : 12,
                    type             : 'PicTitle',
                },
                showModal      : false,
                pagingLoading  : false,
                filterBarParams: {},
                uploadData     : {}
            }
        }
    }
</script>