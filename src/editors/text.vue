<template>
    <div class="text-module">
        <label>
            <span class="label">{{componentValue.title}}</span>
            <input type="text" v-model="componentValue.value">
        </label>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .text-module label {
        margin: 10px 0;
        padding: 0 5px;
        display: flex;

        .label {
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
            componentValue: {
                type: Object
            }
        },

        data(){
            return {}
        }
    }
</script>
