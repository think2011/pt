<template>
    <div class="pic-module">
        <div v-for="item in items" track-by="$index">
            <file-upload
                    id="{{$index}}"
                    :value.sync="item"
                    action="/api/wirelesspages/upload-image">
            </file-upload>
        </div>

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

        computed: {
            items: {
                get: function () {
                    return _.isArray(this.data.value) ? this.data.value : [this.data.value]
                }
            }
        },

        data(){
            return {}
        }
    }
</script>
