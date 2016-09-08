<template>
    <div class="editor-container">
        <div class="editor-pic">
            <ui-alert>建议尺寸:750X150, 支持jpg、png、gif图片格式</ui-alert>

            <div class="form"
                 v-for="item in data.value"
                 track-by="$index">

                <div class="form-group">
                    <div v-if="item.picUrl" class="img has-del">
                        <div class="middle">
                            <img :src="item.picUrl" alt="">
                            <button @click="item.picUrl = null" class="del"><i class="material-icons">clear</i>
                            </button>
                        </div>
                    </div>

                    <div v-if="!item.picUrl"
                         @click="showSelectPic(item)"
                         class="upload-container">
                        <a href="javascript:">
                            {{errorMsg}} <i class="ui-icon material-icons">add_circle</i>
                        </a>
                    </div>
                </div>
                <div class="form-group">
                    <label>链接</label>
          <!--          <popover position="top right">
                        <div slot="contents">
                            <ui-tabs type="text">
                                <ui-tab header="Books">
                                    My books

                                    <a href="https://google.com" target="_blank" rel="noopener">Hey</a>
                                </ui-tab>

                                <ui-tab header="Authors">
                                    Authors
                                </ui-tab>

                                <ui-tab header="Collections">
                                    My collections
                                </ui-tab>

                                <ui-tab header="Favourites">
                                    My favourites
                                </ui-tab>
                            </ui-tabs>
                        </div>
                        <input class="form-control" v-model="item.url" type="text" placeholder="请输入跳转链接">
                    </popover>-->

                    <input class="form-control" v-model="item.url" type="text" placeholder="请输入跳转链接">
                </div>

                <div class="hr"></div>
            </div>
        </div>

        <select-pic
                @on:ok="selectOk"
                :max-len="data.options.max"
                :show.sync="isShowSelectPic">
        </select-pic>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">

</style>

<script type="text/ecmascript-6">
    import fileUpload from '../components/file-upload.vue'
    import selectPic from '../components/select-pic.vue'
    import popover from '../components/popover.vue'

    export default{
        props     : {
            data: {
                type: Object
            }
        },
        components: {
            fileUpload,
            selectPic,
            popover
        },
        created() {
            let diff = this.data.options.max - this.data.value.length

            if (diff > 0) {
                while (diff--) {
                    this.data.value.push({
                        url   : null,
                        picUrl: null
                    })
                }
            }
        },

        methods: {
            showSelectPic(item) {
                this.currentItem     = item
                this.isShowSelectPic = true
            },

            selectOk({picturePath}) {
                this.currentItem.picUrl = picturePath
            }
        },

        data(){
            return {
                currentItem    : null,
                isShowSelectPic: false
            }
        }
    }
</script>
