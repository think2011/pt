<template>
    <div v-if="time.days && state !== 'end'" class="countdown" :class="[state]">
        <span class="state">距离{{stateMap[state]}} : </span>

        <div class="days">
            <span v-for="item in time.days" track-by="$index" class="num">{{item}}</span>
        </div>
        <div class="hours">
            <span v-for="item in time.hours" track-by="$index" class="num">{{item}}</span>
        </div>
        <div class="minutes">
            <span v-for="item in time.minutes" track-by="$index" class="num">{{item}}</span>
        </div>
        <div class="seconds">
            <span v-for="item in time.seconds" track-by="$index" class="num">{{item}}</span>
        </div>
        <div class="milliseconds">
            <span v-for="item in time.milliseconds" track-by="$index" class="num">{{item}}</span>
        </div>
    </div>

    <div class="state-end text-muted text-center" v-if="state === 'end'">
        活动{{stateMap[state]}}
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
</style>

<script type="text/ecmascript-6">
    import moment from 'moment'

    export default {
        props: {
            start: {
                default: new Date()
            },
            end  : {
                required: true
            },
            state: {}
        },

        created() {
            this._start = moment(this.start).valueOf()
            this._end   = moment(this.end).valueOf()
            let keys    = [
                'milliseconds',
                'seconds',
                'minutes',
                'hours',
                'days',
                'weeks',
                'months',
                'years'
            ]

            this.interval = setInterval(() => {
                let now   = Date.now()
                let state = this.state = this.getState()
                let countdownTime = null

                switch (state) {
                    case 'ready':
                        countdownTime = this._start - now
                        break;

                    case 'underway':
                        countdownTime = this._end - now
                        break;

                    default:
                        //
                }

                let duration = moment.duration(countdownTime)

                _.each(keys, (key) => {
                    let value = `${duration[key]()}`.substr(0, 2)
                    value     = +value < 10 ? `0${value}` : `${value}`

                    this.$set(`time.${key}`, value.split(''))
                })

                if (state === 'end') this.stop()
            }, 10)
        },

        destroyed() {
            this.stop()
        },

        methods: {
            getState() {
                let now    = Date.now()
                let start  = this._start
                let end    = this._end
                let result = null

                if (now < start) {
                    result = 'ready'
                } else if (now > start && now < end) {
                    result = 'underway'
                } else {
                    result = 'end'
                }

                return result
            },
            stop() {
                clearInterval(this.interval)
            }
        },

        data() {
            return {
                stateMap: {
                    ready   : '开始',
                    underway: '结束',
                    end     : '结束'
                },
                time    : {}
            }
        }
    }
</script>
