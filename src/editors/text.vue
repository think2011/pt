<template>
    <div class="editor-container">
        <div class="editor-text">
            <ui-textbox :value.sync="data.value"
                        :label="data.title"
                        :placeholder="data.title"
                        :name="data.title"
                        type="text"
            ></ui-textbox>
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
    export default{
        props: {
            data: {
                type: Object
            }
        },

        data(){
            return {}
        }
    }
</script>
