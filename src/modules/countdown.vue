<template>
    <div class="module-container">
        <countdown
                :start="data.start.value"
                :end="data.end.value">
        </countdown>
    </div>
</template>

<script type="text/ecmascript-6">
    import countdown from '../components/countdown.vue'

    export default {
        props: ['data'],

        components: {countdown},

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    start: {
                        type : 'time',
                        title: '开始时间',
                        value: Date.now(),
                    },
                    end  : {
                        type : 'time',
                        title: '结束时间',
                        value: Date.now() + 1000 * 60 * 60 * 2,
                    }
                }
            }
        },
        data() {
            return {
                state: null
            }
        }
    }
</script>
