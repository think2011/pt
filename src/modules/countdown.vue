<template>
    <div class="module-container">
        <countdown
                :start="data.time.value.start"
                :end="data.time.value.end">
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
                    time: {
                        type : 'time',
                        title: '倒计时',
                        value: {
                            start: Date.now(),
                            end  : Date.now() + 1000 * 60 * 60 * 2
                        }
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
