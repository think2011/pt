<template>
    <div class="editor-container">
        <div class="editor-pic">
            <div v-for="item in items" track-by="$index">
                <file-upload
                        :value.sync="item"
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
        props: {
            data: {
                type: Object
            }
        },

        components: {
            fileUpload
        },

        created() {
            this.items = _.isArray(this.data.value) ? _.clone(this.data.value) : [this.data.value]
        },

        watch: {
            items: function (newVal) {
                this.data.value = _.isArray(this.data.value) ? newVal : newVal[0]
            }
        },

        data(){
            return {
                items: []
            }
        }
    }
</script>
