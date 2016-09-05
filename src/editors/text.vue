<template>
    <div class="editor-container">
        <div class="editor-text form">
            <div class="form-group">
                <label>{{data.title}}</label>
                <input type="text" v-model="data.value">
            </div>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>

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
