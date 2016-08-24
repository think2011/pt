<template>
    <div class="pic-module">
        <file-upload
                :value.sync="data.value"
                name="anotherFile"
                action="/api/wirelesspages/upload-image">
        </file-upload>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .text-module label {
        margin: 10px 0;
        padding: 0 5px;
        display: flex;

        .label {
            width: 70px;
            margin-right: 20px;
            line-height: 28px;
        }

        input {
            flex: 1;
        }
    }
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

        data(){
            return {}
        }
    }
</script>
