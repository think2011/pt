<template>
    <div class="pic-module">
        <file-upload name="anotherFile" action="upload.php"></file-upload>
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
    import fileUpload from 'vue-file-upload-component'

    export default{
        props: {
            componentValue: {
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
