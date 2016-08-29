<template>
    <div class="editor-container">
        <div class="editor-pic">
            <ui-alert text="建议尺寸:750X300"></ui-alert>

            <div v-for="item in data.options.max" track-by="$index">
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
    import fileUpload from '../components/pic-upload.vue'

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
            let valueItems = _.isArray(this.data.value) ? _.clone(this.data.value) : [this.data.value]

            for (let i = 0; i < this.data.options.max; i++) {
                this.items.push(valueItems[i])
            }
        },
        watch     : {
            items: function (newVal) {
                this.data.value = _.isArray(this.data.value) ? _.filter(newVal) : newVal[0]
            }
        },
        data(){
            return {
                items: []
            }
        }
    }
</script>
