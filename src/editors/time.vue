<template>
    <div class="editor-container">
        <form class="form editor-time">
            <div class="form-group">
                <label>开始时间</label>
                <date-picker :time.sync="start" :option="option"></date-picker>
            </div>
            <div class="form-group">
                <label>结束时间</label>
                <date-picker :time.sync="end" :option="option"></date-picker>
            </div>
        </form>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>

<script type="text/ecmascript-6">
    import datePicker from 'vue-datepicker'
    import moment from 'moment'

    export default{
        props     : {
            data: {
                type: Object
            }
        },
        components: {
            datePicker
        },

        computed: {
            start: {
                get: function () {
                    return moment(this.data.value.start).format('YYYY-MM-DD HH:mm')
                },
                set: function (value) {
                    this.data.value.start = moment(value).valueOf()
                }
            },
            end  : {
                get: function () {
                    return moment(this.data.value.end).format('YYYY-MM-DD HH:mm')
                },
                set: function (value) {
                    this.data.value.end = moment(value).valueOf()
                }
            },
        },

        data(){
            return {
                option: {
                    type       : 'min',
                    week       : ['一', '二', '三', '四', '五', '六', '日'],
                    month      : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format     : 'YYYY-MM-DD HH:mm',
                    placeholder: '请选择时间',
                    buttons    : {
                        ok    : '确定',
                        cancel: '关闭'
                    }
                }
            }
        }
    }
</script>
