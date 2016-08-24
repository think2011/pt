<template>
    <div class="text-module">
        <label>
            <span class="label">{{data.title}}</span>
            <input type="text" v-model="data.value">
        </label>
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
