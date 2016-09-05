<template>
    <div class="editor-container">
        <div class="editor-pic">
            <ui-alert>建议尺寸:750X150, 支持jpg、png、gif图片格式</ui-alert>

            <div class="form" :class="{'col-2': data.value.length > 1}" v-for="item in data.value" track-by="$index">

                <div class="form-group">
                    <file-upload
                            :value.sync="item.picUrl"
                            action="/api/wirelesspages/upload-image">
                    </file-upload>
                </div>
                <div class="form-group">
                    <label>链接</label>
                    <input class="form-control" v-model="item.url" type="text" placeholder="请输入跳转链接">
                </div>

                <div class="hr"></div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" rel="stylesheet/scss">
    .form {
        &.col-2 {
            width: 50%;
            display: inline-block;
            vertical-align: top;
        }
    }
</style>

<script type="text/ecmascript-6">
    import fileUpload from '../components/file-upload.vue'

    export default{
        props     : {
            data: {
                type: Object
            }
        },
        components: {
            fileUpload
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
        data(){
            return {}
        }
    }
</script>
