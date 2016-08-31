<template>
    <div class="editor-container">
        <div class="editor-pic">
            <ui-alert text="建议尺寸:750X300"></ui-alert>

            <div v-for="item in max" track-by="$index">
                <file-upload
                        :value.sync="items[$index]"
                        action="/api/wirelesspages/upload-image">
                </file-upload>
            </div>
        </div>
    </div>

</template>

<style lang="scss" rel="stylesheet/scss" scoped>
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
            this.max = _.get(this.data, 'options.max', 1)

            for (let i = 0; i < this.max; i++) {
                this.items.push(this.data.value[i])
            }
        },
        watch     : {
            items: function (newVal) {
                this.data.value = _.filter(newVal)
            }
        },
        data(){
            return {
                max  : 1,
                items: []
            }
        }
    }
</script>
